import axios, { AxiosResponse } from 'axios';
import AuthService from '../router/auth-service';

export interface UserContact {
  id: string;
  name: string;
  email: string;
}

const origin = 'https://localhost:5001';

class UserService {
  public async getContacts(): Promise<AxiosResponse<UserContact[]>>{
    const token = await AuthService.getAccessToken();
    return axios({
      method: 'GET',
      url: `${origin}/api/user/contacts`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default new UserService();
