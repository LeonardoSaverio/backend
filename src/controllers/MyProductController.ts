import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';
import productView from '../views/product-view';
class MyPartyController {

  async index(request: Request, response: Response) {
    const user_id = request.user.user_id;
    if (!user_id) {
      return response.json({ error: 'User ID is required' })
    }
    const productRepository = getRepository(Product);
    const products = await productRepository.find({ where: { user: user_id }, relations: ['address'] });

    return response.status(200).json(productView.renderMany(products));
  }

}

export default new MyPartyController();