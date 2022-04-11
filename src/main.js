import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'

/* 
   Global util css style sheet
*/
import '../src/assets/styles/util.css';

const app = createApp(App)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

/* 
   Config global
*/
app.config.globalProperties.$theme = 0
app.config.globalProperties.window = window
