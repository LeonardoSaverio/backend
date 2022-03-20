import Product from "../models/Product";
import addressView from "./address-view";

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      type: product.type,
      price: product.price,
      description: product.description,
      phone: product.phone,
      images: product.images.map(image => `http://localhost:3333/images/${image}`),
      status: product.status,
      addres: addressView.render(product.address),
    }
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product));
  }
}