import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import LoginView from '@/views/auth/LoginView.vue';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import DispatchView from '@/views/dispatch/DispatchView.vue';
import FleetView from '@/views/fleet/FleetView.vue';
import DriversView from '@/views/drivers/DriversView.vue';
import FinanceView from '@/views/finance/FinanceView.vue';
import AnalyticsView from '@/views/analytics/AnalyticsView.vue';
import NotificationsView from '@/views/notifications/NotificationsView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';
import AccountView from '@/views/account/AccountView.vue';
import ImportExportView from '@/views/importExport/ImportExportView.vue';
import MobileAppView from '@/views/dashboard/MobileAppView.vue';
import { useAuthStore } from '@/store/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: { guestOnly: true }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
      { path: 'dispatch', name: 'dispatch', component: DispatchView, meta: { title: 'Dispatch' } },
      { path: 'drivers', name: 'drivers', component: DriversView, meta: { title: 'Drivers' } },
      { path: 'fleet', name: 'fleet', component: FleetView, meta: { title: 'Fleet' } },
      { path: 'finance', name: 'finance', component: FinanceView, meta: { title: 'Finance' } },
      { path: 'analytics', name: 'analytics', component: AnalyticsView, meta: { title: 'Analytics' } },
      {
        path: 'notifications',
        name: 'notifications',
        component: NotificationsView,
        meta: { title: 'Notifications' }
      },
      { path: 'settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
      { path: 'account', name: 'account', component: AccountView, meta: { title: 'Account' } },
      {
        path: 'import-export',
        name: 'import-export',
        component: ImportExportView,
        meta: { title: 'Import / Export' }
      },
      { path: 'mobile-app', name: 'mobile-app', component: MobileAppView, meta: { title: 'Mobile App' } }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    next({ name: 'dashboard' });
    return;
  }
  next();
});

export default router;
