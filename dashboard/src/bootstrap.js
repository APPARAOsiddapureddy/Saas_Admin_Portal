import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const mount = (el) => {
  const app = createApp(App);
  app.use(router);
  app.mount(el);
};

// If we are in development and running in isolation
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container and should export the mount function
export { mount };
