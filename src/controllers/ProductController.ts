import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { v4 } from 'uuid';
import productView from '../views/product-view';

import admin from '../config/firebase-config';
import Address from '../models/Address';
import Product from '../models/Product';

class ProductController {

  async create(request: Request, response: Response) {
    //todo adicionar upload de imagem e integrar com firebase
    //pegar id do user pelo request
    // const user = request.user.id
    const { name, brand, type, price, description, phone, user, uf, city, street, number, lat, long } = request.body;
    await getManager().transaction(async transactionalEntityManager => {

      const productRepository = transactionalEntityManager.getRepository(Product);
      const requestImages = request.files as Express.Multer.File[];

      const images = requestImages.map((image) => {
        return image.filename;
      });
  
      const product = productRepository.create({ name, brand, type, price, description, images, phone, user });

      const productErrors = await validate(product)
      if (productErrors.length > 0) {
        return response.status(400).json(productErrors.map(err => err.constraints));
      }

      await productRepository.save(product);

      const addressRepository = transactionalEntityManager.getRepository(Address)
      const address = addressRepository.create({ uf, city, street, number, lat, long, product });
      const addressErrors = await validate(address);

      if (addressErrors.length > 0) {
        return response.status(400).json(addressErrors.map(err => err.constraints)).end(() => {
          throw new Error(`Error ${addressErrors.map(e => JSON.stringify(e.constraints))}`);
        })
      }

      await addressRepository.save(address);

      return response.sendStatus(200);

    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, brand, type, price, description, phone, status, uf, city, street, number, lat, long } = request.body;
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return image.filename;
    });

    await getManager().transaction(async transactionalEntityManager => {
      const productRepository = transactionalEntityManager.getRepository(Product);

      const product = await productRepository.findOne(id);

      if (!product) {
        return response.sendStatus(404);
      }

      product.name = name ? name : product.name
      product.brand = brand ? brand : product.brand
      product.type = type ? type : product.type
      product.price = price ? price : product.price
      product.description = description ? description : product.description
      product.phone = phone ? phone : product.phone
      product.status = status
      product.images = images ? images : product.images

      const productErrors = await validate(product)
      if (productErrors.length > 0) {
        return response.status(400).json(productErrors.map(err => err.constraints));
      }

      await productRepository.save(product);

      const addressRepository = transactionalEntityManager.getRepository(Address);

      const address = await addressRepository.findOne({ where: { product: product } });

      if (!address) {
        return response.sendStatus(404).end(() => { throw new Error("Addrres not found") });
      }

      address.uf = uf ? uf : address.uf
      address.city = city ? city : address.city
      address.street = street ? street : address.city
      address.number = number ? number : address.number
      address.lat = lat ? lat : address.lat
      address.long = long ? long : address.long

      const addressErrors = await validate(address);
      if (addressErrors.length > 0) {
        return response.status(400).json(addressErrors.map(err => err.constraints)).end(() => {
          throw new Error(`Error ${addressErrors.map(e => JSON.stringify(e.constraints))}`);
        })
      }

      await addressRepository.save(address);
      return response.status(200).json(product);
    });

  }

  async index(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({relations: ['address']});
    return response.status(200).json(productView.renderMany(products));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(id, { relations: ['address']});
    if (!product) {
      return response.sendStatus(404);
    }
    return response.status(200).json(productView.render(product));
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const productRepository = getRepository(Product);
    try {
      const productExists = await productRepository.findOne(id);
      if (!productExists) {
        return response.sendStatus(404);
      }

      await productRepository.delete(id);

      return response.sendStatus(204);

    } catch (err) {
      console.error(err);
      return response.sendStatus(404);
    }
  }

}

export default new ProductController();