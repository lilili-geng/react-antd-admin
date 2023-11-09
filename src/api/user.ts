import { LoginAPI, ServiceLogin } from '@/types/login';
import { ServiceUserInfo } from '@/types/user';
import fetcher from '@/utils/fetcher';


export const fetchLogin = (data: LoginAPI): Promise<ServiceLogin> => {
  return fetcher.post('/s/user/login', data);
};


export const fetchLUserInfo = (): Promise<ServiceUserInfo> => {
  return fetcher.post('/s/user/login');
};

export const fetchLUserLogout = () => fetcher.post('/s/user/getUserInfo');
