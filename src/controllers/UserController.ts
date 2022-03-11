import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import User from '../models/User';
import { validate } from 'class-validator';
import Address from '../models/Address';

class UserController {

  async store(request: Request, response: Response) {

    const { name, email, phone, password, uf, city, number, lat, long } = request.body;

    await getManager().transaction(async transactionalEntityManager => {

      const userRepository = transactionalEntityManager.getRepository(User)
      const user = userRepository.create({ name, email, phone, password })

      const userErrors = await validate(user)
      if (userErrors.length > 0) {
        return response.status(400).json(userErrors.map(err => err.constraints))
      }

      const userExists = await userRepository.findOne({ where: { email } });

      if (userExists) {
        return response.sendStatus(409);
      }

      await userRepository.save(user);

      const addressRepository = transactionalEntityManager.getRepository(Address)
      const address = addressRepository.create({ uf, city, number, lat, long, user });
      const addressErrors = await validate(address)

      if (addressErrors.length > 0) {
        return response.status(400).json(addressErrors.map(err => err.constraints)).end(() => {
          throw new Error(`Error ${addressErrors.map(e => JSON.stringify(e.constraints))}`);
        })
      }

      await addressRepository.save(address)

      return response.sendStatus(200);

    });
  }
}

export default new UserController();