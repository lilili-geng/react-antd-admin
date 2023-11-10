import { LeftOutlined } from "@ant-design/icons"
import "./index.less"
import { useLayout } from "../hooks/index"
import { useNavigate } from "react-router";
import { StoredMenuItem } from "@/types/layout";
import { IRouterConfig } from "@/types";
import { useEffect } from "react";

export const SidersWarp = () => {

  const navigate = useNavigate();

  const { activeSidersWarp, setActiveSidersWarp, _showRightStateFalse, showSidersWarp, menuListItem, menuListTitlte } = useLayout()

  const storedMenuListItem = localStorage.getItem('menuListItem');

  const parsedMenuListItem: StoredMenuItem[] = storedMenuListItem ? JSON.parse(storedMenuListItem) : [];

  const routerNative = (router: StoredMenuItem | IRouterConfig) => {
    console.log(router);
    console.log(router.path);
    navigate(router.path)
    setActiveSidersWarp(router.path);
  };

  useEffect(() => {
    localStorage.setItem('activeSidersWarp', activeSidersWarp);
  }, [activeSidersWarp]);

  const slideWarpClassName = showSidersWarp ? 'li-slide-warp no-drawer ' : 'li-slide-warp no-drawer sidebar-open-warp ';

  return (
    <div className={`bg-li-bg border-r-1 border-li-border-color ${slideWarpClassName}`}>
      <div className="warp-box">
        <div className="text-li-color font-bold">{menuListTitlte || localStorage.getItem("menuListTitlte")}</div>

        <span className="icon-box bg-li-iconLeftBg " onClick={() => { _showRightStateFalse(); }}>
          <LeftOutlined className="text-li-textIconText" />
        </span>
      </div>

      <div className="warp-menu">
        {
          menuListItem
            ? menuListItem.map((router, index) => (
              <div key={index} className={`menu ${router.path == activeSidersWarp ? 'active' : ''}`} onClick={() => { routerNative(router) }}>
                <span className="dot">●</span>
                <span className="title">{router.title}</span>
              </div>
            ))
            : parsedMenuListItem.map((router, index) => (
              <div key={index} className={`menu ${router.path == activeSidersWarp ? 'active' : ''}`} onClick={() => { routerNative(router) }}>
                <span className="dot">●</span>
                <span className="title">{router.title}</span>
              </div>
            ))
        }
      </div>
    </div>
  );
}