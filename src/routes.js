import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Logout = React.lazy(() => import('./views/Logout'));
const Wall = React.lazy(() => import('./views/Wall'));
const Documents = React.lazy(() => import('./views/Documents'));
const Reservations = React.lazy(() => import('./views/Reservations'));
const Warnings = React.lazy(() => import('./views/Warnings'));
const FoundAndLost = React.lazy(() => import('./views/FoundAndLost'));
const Users = React.lazy(() => import('./views/Users'));
const Units = React.lazy(() => import('./views/Units'));
const CommonAreas = React.lazy(() => import('./views/CommonAreas'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/wall', name: 'Wall', component: Wall },
  { path: '/documents', name: 'Documents', component: Documents },
  { path: '/reservations', name: 'Reservations', component: Reservations },
  { path: '/warnings', name: 'Warnings', component: Warnings },
  { path: '/foundandlost', name: 'FoundAndLost', component: FoundAndLost },
  { path: '/users', name: 'Users', component: Users },
  { path: '/units', name: 'Units', component: Units },
  { path: '/commonareas', name: 'CommonAreas', component: CommonAreas },
];

export default routes;
