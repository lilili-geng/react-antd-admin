export interface LayoutContextValue {
  showSidersWarp: boolean;
  fullscreen: boolean;
  clickSiderWarp: (type: boolean) => void;
  toggleFullscreen: () => void;
}