import { LayoutContextValue } from "@/types/providerType/layout";
import { createContext, useContext, useMemo, useState } from "react";

const layoutContext = createContext<LayoutContextValue>({
  showSidersWarp: false,
  clickSiderWarp: (type: boolean) => {
    throw new Error("clickSiderWarp not implemented");
  },
});

export function LayoutProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [showSidersWarp, setShowSidersWarp] = useState<boolean>(false);

  const clickSiderWarp = (type: boolean) => {
    setShowSidersWarp(type);
  };

  const value = useMemo<LayoutContextValue>(
    () => ({
      showSidersWarp,
      clickSiderWarp,
    }),
    [showSidersWarp, clickSiderWarp]
  );

  return <layoutContext.Provider value={value}>{children}</layoutContext.Provider>;
}

export const useLayoutProvider = () => useContext(layoutContext);