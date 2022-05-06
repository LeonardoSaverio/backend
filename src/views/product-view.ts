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
      images: product.images.map(image => `http://${process.env.IMAGE_ADDRESS}/images/${image}`),
      statusAd: product.statusAd,
      adType: product.adType,
      address: addressView.render(product.address),
    }
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product));
  }
}