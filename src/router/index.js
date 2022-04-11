import Search from '../components/SearchView.vue'
import Stream from '../components/StreamView.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Search
  },
  {
    path: '/stream',
    component: Stream,
    props: route => ({ stream: route.query.st })
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
