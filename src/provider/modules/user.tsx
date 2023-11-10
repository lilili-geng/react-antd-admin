import { fetchLUserInfo, fetchLUserLogout, fetchLogin } from "@/api/user";
import { LoginAPI, ServiceLogin } from "@/types/login";
import { UserContextValue } from "@/types/providerType/user";
import { GetServiceUserInfoReply } from "@/types/user";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const userContext = createContext<UserContextValue>({
  userInfo: undefined,
  fetchUser: async () => { },
  handleLogin: async (data: LoginAPI) => {
    throw new Error("handleLogin not implemented");
  },
  logout: async () => {
    throw new Error("logout not implemented");
  },
});

export function UserProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [userInfo, setUserInfo] = useState<GetServiceUserInfoReply | undefined>();

  const [token, setToken] = useState<string>(localStorage.getItem('_accessToken') || '');


  const handleLogin = (data: LoginAPI): Promise<ServiceLogin> => {
    return new Promise<ServiceLogin>(async (resolve, reject) => {
      const res = await fetchLogin(data);
      if (res.code === 200) {
        setToken(res.data.accessToken);
        localStorage.setItem('_accessToken', res.data.accessToken);
        await fetchUser();
        resolve(res);
      } else {
        reject(res.msg);
      }
    });
  };

  const fetchUser = async () => {
    const res = await fetchLUserInfo();
    setUserInfo(res.data);
  };

  const logout = async () => {
    await fetchLUserLogout();
    localStorage.clear();
  };

  const value = useMemo<UserContextValue>(
    () => ({
      userInfo,
      fetchUser,
      handleLogin,
      logout,
    }),
    [userInfo, logout]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export const useUserProvider = () => useContext(userContext);