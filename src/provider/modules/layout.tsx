import { LayoutContextValue } from "@/types/providerType/layout";
import { createContext, useContext, useMemo, useState } from "react";

const layoutContext = createContext<LayoutContextValue>({
  showSidersWarp: false,
  fullscreen: false,
  clickSiderWarp: (type: boolean) => {
    throw new Error("clickSiderWarp not implemented");
  },
  toggleFullscreen: () => {
    throw new Error("toggleFullscreen not implemented");
  },
});

export function LayoutProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [showSidersWarp, setShowSidersWarp] = useState<boolean>(false);

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const clickSiderWarp = (type: boolean) => {
    setShowSidersWarp(type);
  };


  // 全屏
  const toggleFullscreen = () => {
    const rootElement = document.documentElement;
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setFullscreen(true)
      } else {
        setFullscreen(false)
      }
    };
    if (rootElement.requestFullscreen) {
      if (!document.fullscreenElement) {
        rootElement.requestFullscreen().then(() => {
          document.addEventListener('fullscreenchange', handleFullscreenChange);
        }).catch((error) => {
          console.error('进入全屏失败:', error);
          setFullscreen(false)
        });
      } else {
        document.exitFullscreen().then(() => {
          document.addEventListener('fullscreenchange', handleFullscreenChange);
        }).catch((error) => {
          console.error('退出全屏失败:', error);
          setFullscreen(false)
        });
      }
    } else {
      console.error('Fullscreen API is not supported in this browser.');
    }
  };



  const value = useMemo<LayoutContextValue>(
    () => ({
      fullscreen,
      showSidersWarp,
      clickSiderWarp,
      toggleFullscreen
    }),
    [fullscreen, showSidersWarp, clickSiderWarp, toggleFullscreen]
  );

  return <layoutContext.Provider value={value}>{children}</layoutContext.Provider>;
}

export const useLayoutProvider = () => useContext(layoutContext);