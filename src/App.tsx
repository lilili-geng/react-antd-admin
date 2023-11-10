import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RenderRouters } from './router';
import { Providers } from "@/provider"
import '@/i18n'

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Suspense fallback="loading.....">
          <RenderRouters />
        </Suspense>
      </BrowserRouter>
    </Providers>
  );
}
