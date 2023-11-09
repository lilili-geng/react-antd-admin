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
  path: '/test',
  layout: BaseLayout,
  element: lazy(() => import('@/views/test/index')),
  icon: <FilePdfOutlined />,
  title: '基础资料',
  children: [
    {
      path: '',
      layout: null,
      element: lazy(() => import('@/views/test/ceshi/index')),
      title: '测试1',
    },
    {
      path: 'ceshitest',
      layout: null,
      element: lazy(() => import('@/views/test/ceshitest/index')),
      title: '测试2',
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
