// 公共接口
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
export interface User {
  id: number;
  userName: string;
  passWord: string;
  phone: string;
  avatar: string;
  email: string;
  salt: string;
  loginTime: Date | null;
  loginOutTime: Date | null;
  isLogOut: boolean;
  roleID?: number
}


export interface LoginRequest {
  username: string,
  password: string
}

export interface LoginResponse {
  code: number,
  message: string
  data: {
    token: string,
    refreshToken: string
  }
}


// getByUserList
export interface GetByUserListRequest {
  page: number;
  pageSize: number;
  userName: string;
  email: string;
}



export interface GetByUserListResponse {
  page: number;
  pageSize: number;
  total: number;
  list: User[];
}



export type SpecificUserApiResponse = ApiResponse<GetByUserListResponse>;

export type DeleteUserById = ApiResponse<{}>;

export type UserById = ApiResponse<{}>;



// userListFormModal
export interface UserListFormModalProps {
  onCancel: () => void;
  onOk: (values: any) => void;
}

// fetchGetByUserId
export type fetchGetByUser = ApiResponse<User>;
