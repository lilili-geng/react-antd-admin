
import { fetchLogin, fetchLUserInfo, fetchLUserLogout } from "@/api/user"
import { GetServiceUserInfoReply } from "@/types/user"
import { LoginAPI, ServiceLogin } from "@/types/login"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useRecoilState } from "recoil";
import Store from "@/store";

export const useLoginHooks = () => {

  const [token, setToken] = useState<string>(localStorage.getItem('_accessToken') || '')
  const [userInfo, setUserInfo] = useState<GetServiceUserInfoReply>()

  const [userState, setUserState] = useRecoilState(Store.UserState);

  const navigate = useNavigate();

  // 用户登陆
  const login = (data: LoginAPI): Promise<ServiceLogin> => {
    return new Promise<ServiceLogin>(async (resolve, reject) => {
      const res = await fetchLogin(data);
      if (res.code == 200) {
        setToken(res.data.accessToken);
        localStorage.setItem('_accessToken', res.data.accessToken);
        await getUserInfo();
        resolve(res);
      } else {
        reject(res.msg);
      }
    });
  };


  // 用户个人信息
  const getUserInfo = async () => {
    const res = await fetchLUserInfo()
    setUserInfo(res.data)
    setUserState(res.data)
  }


  // 用户退出
  const logout = async () => {
    // await fetchLUserLogout(); 有接口后放开
    localStorage.clear();
    navigate("/login")
  };

  return {
    userInfo,
    login,
    getUserInfo,
    logout
  }
}