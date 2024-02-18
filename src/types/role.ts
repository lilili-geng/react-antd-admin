import { ApiResponse } from ".";

export interface Role {
  id: number;
  roleName: string;
  sort: number;
  roleStatus: string;
  remark: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt?: string | null;
}


export interface GetByRoleListRequest {
  page: number;
  pageSize: number;
  roleName?: string;
  roleStatus?: string;
}

export interface GetByRoleResponse {
  page: number;
  pageSize: number;
  total: number;
  list: Role[];
}

export type SpecificRoleApiResponse = ApiResponse<GetByRoleResponse>;


export type RoleById = ApiResponse<{}>;