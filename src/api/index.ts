import { GetByUserListRequest, LoginRequest, LoginResponse, SpecificApiResponse } from '@/types/user';
import fetcher from '@/utils/fetcher';


export const fetchLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return fetcher.post('/login', data);
};

export const fetchGetByUserList = (data: GetByUserListRequest): Promise<SpecificApiResponse> => {
  return fetcher.get('/getByUserList', { params: data });
};
