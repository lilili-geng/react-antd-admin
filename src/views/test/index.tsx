
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const Test = () => (
  <Suspense fallback={<Spin size="large" />}>
    <Outlet />
  </Suspense>
);

export default Test;
