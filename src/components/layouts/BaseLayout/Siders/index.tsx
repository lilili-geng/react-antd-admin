import "./index.less"
import { HomeOutlined, RightOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router';
import { useLayout } from "../hooks/index";
import { IRouterConfig } from "@/types";
import { useEffect } from "react";

export const Siders = () => {

  const navigate = useNavigate();

  const { active, layoutState, menuList, setActive, setMenuListItem, _showRightStateTrue, _showRightStateFalse } = useLayout()

  const handleIconClick = (route: IRouterConfig) => {
    setActive(route.path);
    setMenuListItem(route.children);
    _showRightStateTrue();
    navigate(route?.path);
    localStorage.setItem('menuListItem', JSON.stringify(route.children));
    localStorage.setItem('menuListTitlte', route.title);
  };


  useEffect(() => {
    localStorage.setItem('active', active);
  }, [active]);

  return (
    <div className="li-slide no-drawer">
      {
        (!layoutState && active !== '/') && <div className="slide-icons mb-[20px]">
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

    </div >
  )
}
