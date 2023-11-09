
enum LoginType {
  UserNameLogin = 1,
  MobileLogin = 2
}

export interface LoginParams {
  username: string
  password: string
  type: LoginType
  showPwd: boolean // 是否显示密码
}


export interface LoginAPI {
  username: string,
  password: string
}


export interface ServiceLogin {
  code: number;
  msg: string;
  data: ServiceLoginReply
}


export interface ServiceLoginReply {
  id: number
  username: string
  accessToken: string
  accessExpire: number
  refreshAfter: number
}
