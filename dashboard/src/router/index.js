import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import UserManagementWrapper from '../components/UserManagementWrapper.vue';
import BillingDashboard from '../components/BillingDashboard.vue';
const routes = [
  { path: '/', component: Dashboard },
  { path: '/dashboard', component: Dashboard },
  { path: '/user-management', component: UserManagementWrapper },
  {path:'/billing-dashboard',component:BillingDashboard}
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
