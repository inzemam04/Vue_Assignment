import API from '../api/axios';

class AuthService {

  constructor() {}

  async login(details) {
    try {
      const response = await API.post('auth/login', { ...details });
      if (response) {
        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signUp(details) {
    try {
      const response = await API.post('users/add', { ...details });
      if (response) {
        return response;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AuthService;
