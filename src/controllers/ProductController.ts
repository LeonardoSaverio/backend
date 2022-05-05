import { Request, Response } from 'express';
import { getManager, getRepository, Equal } from 'typeorm';
import { validate } from 'class-validator';
import productView from '../views/product-view';

import Address from '../models/Address';
import Product, { StatusAd } from '../models/Product';

class ProductController {

  async create(request: Request, response: Response) {
    const user = request.user.user_id;

    const { name, brand, type, price, description, phone, uf, statusAd, adType, city, street, number, lat, long } = request.body;
    await getManager().transaction(async transactionalEntityManager => {

      const productRepository = transactionalEntityManager.getRepository(Product);
      const requestImages = request.files as Express.Multer.File[];

      const images = requestImages.map((image) => {
        return image.filename;
      });

      const product = productRepository.create({ name, brand, type, price, description, images, phone, statusAd, adType, user });

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
    const { name, brand, type, price, description, phone, statusAd, adType, uf, city, street, number, lat, long } = request.body;
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
      product.statusAd = statusAd ? statusAd : product.statusAd
      product.adType = adType ? adType : product.adType
      product.images = images.length > 0 ? images : product.images

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
    let products = [] as Product[];

    const uf = request.query.uf;
    const city = request.query.city;
    if (uf || city) {

      products = await productRepository.find({
        relations: ['address'], where: [
          { address: { uf }, statusAd: StatusAd.ANNOUNCED },
          { address: { city }, statusAd: StatusAd.ANNOUNCED }
        ]
      });
    } else {
      products = await productRepository.find({ relations: ['address'], where: { statusAd: StatusAd.ANNOUNCED } });
    }

    return response.status(200).json(productView.renderMany(products));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(id, { relations: ['address'] });
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