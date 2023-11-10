import "./index.less"
import { HomeOutlined, RightOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router';
import { useLayout } from "../hooks/index";
import { IRouterConfig } from "@/types";
import { useEffect, useState } from "react";
import iconDart from "@/assets/layout/icon-dart.png"
import iconLight from "@/assets/layout/icon-light.png"

export const Siders = () => {

  const navigate = useNavigate();

  const { active, showSidersWarp, menuList, setActive, setMenuListItem, _showRightStateTrue, _showRightStateFalse } = useLayout()

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleIconClick = (route: IRouterConfig) => {
    setActive(route.path);
    setMenuListItem(route.children);
    _showRightStateTrue();
    navigate(route?.path);
    localStorage.setItem('menuListItem', JSON.stringify(route.children));
    localStorage.setItem('menuListTitlte', route.title);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    localStorage.setItem('active', active);
  }, [active]);

  return (
    <div className="li-slide no-drawer">
      <div className="w-[100%] h-[100%] flex flex-col justify-between items-center">
        {
          (!showSidersWarp && active !== '/') && <div className="slide-icons mb-[20px]">
            <div className="iconButton"  >
              <RightOutlined onClick={_showRightStateTrue} />
            </div>
          </div>
        }
        {menuList.map((route, index) => (
          <div
            key={index}
            className={`slide-icons`}
          >
            <HomeOutlined
              className={`mb-[10px] ${active === '/' ? 'active' : ''}`}
              onClick={() => { navigate('/'); setActive('/'); _showRightStateFalse() }}
            />
            <div className={`${route.path == active ? 'active' : ''}`} onClick={() => handleIconClick(route)}>
              {route.icon}
            </div>
          </div>
        ))}
        <div className="theme-icons">
          {
            isDarkMode ? <img
              width="15"
              height="15"
              src={iconDart}
              alt="dart"
              onClick={() => { toggleTheme() }}
            /> : <img
              width="15"
              height="15"
              src={iconLight}
              alt="light"
              onClick={() => { toggleTheme() }}
            />
          }
        </div>
      </div>
    </div >
  )
}
