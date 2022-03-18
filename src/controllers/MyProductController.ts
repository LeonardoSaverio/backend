import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';

class MyPartyController {

  async index(request: Request, response: Response) {
    const user_id = request.user.id;
    const productRepository = getRepository(Product);

    const products = await productRepository
      .createQueryBuilder('product')
      .where('product.user_id =:user_id', { user_id })
      .getMany();
    return response.status(200).json(products);
  }


}

export default new MyPartyController();