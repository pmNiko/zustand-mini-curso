import { AxiosError } from 'axios';
import tesloApi from '../api/teslo.api';

export interface LoginResp {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}



export class AuthService {

  static login = async(email:string, password:string):Promise<LoginResp> => {
    try {
      const {data} = await tesloApi.post<LoginResp>('/auth/login', {email, password});

      console.log(data);
      return data;
      
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data);
      }
      
      console.error(error);
      throw new Error("Unable to login!");
      
    }
  }


  static checkStatus = async():Promise<LoginResp> => {
    try {
      const {data} = await tesloApi.get('/auth/check-status');
      return data;

    } catch (error) {
      console.error(error);      
      throw new Error("Unable to check status!");
      
    }

  }

}

