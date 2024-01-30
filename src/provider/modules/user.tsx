import { fetchLogin } from "@/api/index";
import { LoginRequest, LoginResponse } from "@/types/user";
import { UserContextValue } from "@/types/providerType/user";
import { createContext, useContext, useMemo, useState } from "react";

const userContext = createContext<UserContextValue>({
  logout: async () => {
    throw new Error("logout not implemented");
  },
  handleLogin: async (data: LoginRequest) => {
    throw new Error("handleLogin not implemented");
  },
});

export function UserProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [token, setToken] = useState<string>(localStorage.getItem('_accessToken') || '');

  const handleLogin = (data: LoginRequest): Promise<LoginResponse> => {
    return new Promise<LoginResponse>(async (resolve, reject) => {
      const res = await fetchLogin(data);
      console.log(1231231);
      if (res.code === 200) {
        setToken(res.data.token);
        localStorage.setItem('_accessToken', res.data.token);
        resolve(res);
      } else {
        reject(res);
      }
    });
  };

  // const fetchUser = async () => {
  //   const res = await fetchLUserInfo();
  //   setUserInfo(res.data);
  // };

  const logout = async () => {
    // await fetchLUserLogout();
    localStorage.clear();
  };

  const value = useMemo<UserContextValue>(
    () => ({
      handleLogin,
      logout,
    }),
    [logout]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export const useUserProvider = () => useContext(userContext);