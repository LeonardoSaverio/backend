import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import User from '../models/User';
import { validate } from 'class-validator';
class UserController {

    async create(request: Request, response: Response) {

        const { id, name, email, photo } = request.body;

        await getManager().transaction(async transactionalEntityManager => {

            const userRepository = transactionalEntityManager.getRepository(User)
            const user = userRepository.create({ id, name, email, photo });

            const userErrors = await validate(user)
            if (userErrors.length > 0) {
                return response.status(400).json(userErrors.map(err => err.constraints));
            }

            const userExists = await userRepository.findOne({ where: { email } });

            if (userExists) {
                return response.sendStatus(409);
            }

            await userRepository.save(user);

            return response.json(user)

        });
    }

}

export default new UserController();