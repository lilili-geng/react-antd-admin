import { DeleteUserById, GetByUserListRequest, LoginRequest, LoginResponse, SpecificApiResponse, UserById, User, fetchGetByUser } from '@/types/user';
import fetcher from '@/utils/fetcher';


export const fetchLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return fetcher.post('/login', data);
};

export const fetchRegister = (data: LoginRequest): Promise<UserById> => {
  return fetcher.post('/register', data);
};

export const fetchGetByUserList = (data: GetByUserListRequest): Promise<SpecificApiResponse> => {
  return fetcher.get('/user/getByUserList', { params: data });
};

export const fetchGetByUserId = (id: number): Promise<fetchGetByUser> => {
  return fetcher.get(`/user/getByUserId?id=${id}`);
};

export const fetchUpdateByUser = (data: User): Promise<UserById> => {
  return fetcher.post('/user/updateUser', data);
};

export const fetchDeleteByUserId = (ids: number[]): Promise<DeleteUserById> => {
  return fetcher.delete(`/user/deleteUserById?userId=${ids}`);
};


