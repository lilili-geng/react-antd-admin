export interface LayoutContextValue {
  showSidersWarp: boolean;
  fullscreen: boolean;
  currentMode: string;
  clickSiderWarp: (type: boolean) => void;
  clickCurrentMode: (type: string) => void;
  toggleFullscreen: () => void;
}