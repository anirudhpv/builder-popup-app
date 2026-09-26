import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { rootRoute, indexRoute, menuRoute, checkinRoute, loungeRoute } from './routes';
import './index.css';

const routeTree = rootRoute.addChildren([
  indexRoute,
  menuRoute,
  checkinRoute,
  loungeRoute,
]);

const router = createRouter({
  routeTree,
  basepath: '/builder-popup-app',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
