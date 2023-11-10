import { LoginAPI, ServiceLogin } from "../login";
import { GetServiceUserInfoReply } from "../user";

export interface UserContextValue {
  userInfo: GetServiceUserInfoReply | undefined;
  fetchUser: () => Promise<void>;
  handleLogin: (data: LoginAPI) => Promise<ServiceLogin>;
  logout: () => Promise<void>;
}