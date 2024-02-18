
import { GetByRoleListRequest, Role, RoleById, SpecificRoleApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';


export const fetchGetByRoleList = (data: GetByRoleListRequest): Promise<SpecificRoleApiResponse> => {
  return fetcher.get('/admin/getRoleList', { params: data });
};

export const fetchUpdateByRole = (data: Role): Promise<RoleById> => {
  return fetcher.post('/admin/updateRole', data);
};
