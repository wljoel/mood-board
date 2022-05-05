import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AppRoutes from './App.routes';
import Header from './layout/header/Header.layout';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <main className="mx-10">
        <AppRoutes />
      </main>
    </BrowserRouter>
  </Provider>
);

if (process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      root.render(app);
    });
} else {
  root.render(app);
}
