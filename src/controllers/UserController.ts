import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { validate } from 'class-validator';
class UserController {

    async create(request: Request, response: Response) {
        const authRepository = getRepository(User);
        const { id, name, email, emailVerified } = request.body;

        if(emailVerified === false ){
            return response.json({ emailInvalid: 'E-mail não verificado' })
        }
        const user = await authRepository.findOne({ where: { email } });

        if (!user) {
            const createUser = authRepository.create({ id, name, email })
            await authRepository.save(createUser);
            return response.json({ created: 'user created' })
        }


        return response.json({
            userExists: 'user exists',
        });

    }

}

export default new UserController();