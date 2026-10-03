import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './commerce/cart';
import { UIProvider } from './components/layout/uiState';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/commerce.css';
import './styles/home.css';
import './styles/pages.css';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
