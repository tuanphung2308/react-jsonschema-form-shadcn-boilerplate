import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Providers from '@/components/theme-provider.tsx';
import { DirectionProviderWrapper } from '@/components/direction-provider.tsx';
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <DirectionProviderWrapper>
        <Toaster />
        <App />
      </DirectionProviderWrapper>
    </Providers>
  </StrictMode>
);
