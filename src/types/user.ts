export interface User {
  name: String,
  age: number,
  phone: number,
  email: String,
  password: String
}

export interface ServiceUserInfo {
  code: number;
  msg: string;
  data: GetServiceUserInfoReply
}

export interface GetServiceUserInfoReply {
  id: number // 用户名id
  serviceProviderId: number // 服务商id
  username: string // 用户名
  nickname: string // 昵称
  phoneNumber: string // 手机号
  email: string // 邮箱
  name: string // 姓名
  avatarUrl: string // 头像
  isEnabled: number // 启用状态，默认开启
  menuList: any
  permissionList: any // 权限列表
}