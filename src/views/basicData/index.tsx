
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const BasicData = () => (
  <Suspense fallback={<Spin size="large" />}>
    <Outlet />
  </Suspense>
);

export default BasicData;
