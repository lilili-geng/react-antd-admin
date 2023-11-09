import { useRecoilState } from "recoil";
import Store from "@/store";
import { IRouterConfig } from '@/types';
import { routersConfig } from '@/router/config';
import { useEffect, useState } from "react";

export const useLayout = () => {

  const [layoutState, setLayoutState] = useRecoilState(Store.LayoutState);
  const [menuList, setMenuList] = useState<IRouterConfig[]>([])

  const [menuListItem, setMenuListItem] = useState<IRouterConfig[] | undefined>([]);

  const [menuListTitlte, setMenuListTitlte] = useState<string>('');

  const [active, setActive] = useState<string>(() => {
    const storedActive = localStorage.getItem('active');
    return storedActive || '/';
  });

  const [activeSidersWarp, setActiveSidersWarp] = useState<string>(() => {
    const storedActive = localStorage.getItem('activeSidersWarp');
    return storedActive || '';
  });

  useEffect(() => {
    const storedLayoutState = localStorage.getItem('layoutState');
    if (storedLayoutState) {
      setLayoutState(storedLayoutState === 'true');
    } else {
      localStorage.setItem('layoutState', layoutState.toString());
    }
  }, [setLayoutState, layoutState]);

  const _showRightStateTrue = () => {
    setLayoutState(true);
    localStorage.setItem('layoutState', 'true');
  };

  const _showRightStateFalse = () => {
    setLayoutState(false);
    localStorage.setItem('layoutState', 'false');
  };


  useEffect(() => {
    const foundRoute = menuList.find((router) => router.path === active);
    if (foundRoute) {
      setMenuListItem(foundRoute.children);
      setMenuListTitlte(foundRoute.title);
      localStorage.setItem('menuListItem', JSON.stringify(menuListItem));
      localStorage.setItem('menuListTitlte', foundRoute.title);
    }
  }, [active]);


  useEffect(() => {
    const storedMenuListItem = JSON.parse(localStorage.getItem('menuListItem') || '[]');
    setMenuListItem(storedMenuListItem);
    const storedMenuListTitlte = localStorage.getItem('menuListTitlte') || '';
    setMenuListTitlte(storedMenuListTitlte);
  }, [localStorage.getItem('menuListTitlte'), localStorage.getItem('menuListTitlte')]);

  useEffect(() => {
    const filteredMenuList = routersConfig.filter(route => route.path !== '/' && route.path !== '/login');
    setMenuList(filteredMenuList);
  }, [])

  return {
    active,
    setActive,
    activeSidersWarp,
    setActiveSidersWarp,
    layoutState,
    menuList,
    menuListItem,
    menuListTitlte,
    setMenuListItem,
    _showRightStateTrue,
    _showRightStateFalse,
  }
}