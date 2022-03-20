import Address from "../models/Address";

export default {
  render(address: Address) {
    return {
      id: address.id,
      uf: address.uf,  
      city: address.city,
      street: address.street,
      number: address.number,
      lat: address.lat,
      long: address.long,
    }
  },

  renderMany(addresses: Address[]) {
    return addresses.map(address => this.render(address));
  }
}