import API from '../api/axios';

class ProductService {

  constructor() {}

  async getAllProducts(params) {
    try {
      const response = await API.get('products/search',  { params});
      if (response) {
        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProductDetailsById(id) {
    try {
      const response = await API.get(`products/${id}`);
      if (response) {
        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ProductService;
