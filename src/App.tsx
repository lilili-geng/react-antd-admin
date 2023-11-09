import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RenderRouters } from './router';
import {
  RecoilRoot,
} from 'recoil';
export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback="loading.....">
          <RenderRouters />
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
}
