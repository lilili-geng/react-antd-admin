import { ComponentType, LazyExoticComponent, ReactNode } from "react";

interface routeInterface {
  path: string,
  component: any,
  routes?: Array<any>
}

export type RouteInterface = routeInterface

export interface IRouterConfig {
  path: string;
  layout: ComponentType<any> | null;
  element: LazyExoticComponent<ComponentType<any>>;
  icon?: ReactNode,
  title: string
  children?: IRouterConfig[];
}



export interface IProps {
  children: ReactNode;
  route?: any;
}


export interface IConfigItem {
  element: JSX.Element;
  layout?: React.ComponentType<any> | null;
  cutomFallBack?: React.ReactNode;
  [key: string]: any;
}


