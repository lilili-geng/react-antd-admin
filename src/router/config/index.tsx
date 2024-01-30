import { lazy } from 'react';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { FilePdfOutlined } from '@ant-design/icons';
import { IRouterConfig } from '@/types';


export const routersConfig: IRouterConfig[] = [{
  path: '/',
  layout: BaseLayout,
  element: lazy(() => import('@/views/home')),
  icon: '',
  title: ''
},
{
  path: '/basicData',
  layout: BaseLayout,
  element: lazy(() => import('@/views/user/index')),
  icon: <FilePdfOutlined />,
  title: '基础资料',
  children: [
    {
      path: '',
      layout: null,
      element: lazy(() => import('@/views/user/list/index')),
      title: '用户管理',
    },
  ],
},
{
  path: '/login',
  layout: null,
  element: lazy(() => import('@/views/login/index')),
  icon: '',
  title: '登陆',
},
];
