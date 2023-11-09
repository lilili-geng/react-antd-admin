import { Navigate, useLocation, useRoutes } from 'react-router';
import * as reactIs from 'react-is';
import React, { ReactNode, FC } from 'react';
import { routersConfig } from './config';
import { IConfigItem, IProps, IRouterConfig } from '@/types';


const getLayoutComponent = (item: IConfigItem) => {
  const { layout: Layout } = item;
  if (reactIs.isValidElementType(Layout)) return Layout;
  return ({ children }: { children: ReactNode }) => <>{children}</>;
};

const wrapper = (configItem: IConfigItem) => {
  const { element, cutonFallBack } = configItem;
  const Layout = getLayoutComponent(configItem);
  if (reactIs.isElement(element)) {
    return <Layout>{element}</Layout>;
  }
  if (reactIs.isValidElementType(element)) {
    const Child = element as React.ComponentType<any>;
    return (<Layout><Child /></Layout>);
  }
  return (
    <React.Suspense fallback={cutonFallBack || <>...</>}>
      <Layout>
        {element}
      </Layout>
    </React.Suspense>

  );
};

// route的any也是要替换成实际使用类型
// TODO 路由守卫 有的token了 直接放开就行
const RouterBeforeEach = (props: { children: React.ReactNode; route: any; }) => {
  const { children, route } = props;
  // const location = useLocation();
  // const { pathname } = location;
  // const access_token = localStorage.getItem('_accessToken');
  // const accessLogin = [
  //   '/login',
  // ].find((path) => pathname.startsWith(path));
  // if (route.meta?.title !== undefined) {
  //   document.title = route.meta.title;
  // }
  // if (!accessLogin && !access_token) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
}


const eachHandleRoute = (routes: IRouterConfig[] = []): IConfigItem[] => routes.map((item: IRouterConfig) => ({
  ...item,
  element: <RouterBeforeEach route={item}>{wrapper(item as any)}</RouterBeforeEach>,
  children: item.children && eachHandleRoute(item.children),
}));

const config = eachHandleRoute(routersConfig);

export const RenderRouters = () => useRoutes(config);
