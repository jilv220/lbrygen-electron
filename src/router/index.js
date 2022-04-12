import { createRouter, createWebHashHistory } from 'vue-router';

const Search = () => import('../components/SearchView.vue')
const Stream = () => import('../components/StreamView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Search
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
    props: route => ({ streamUrl: route.query.url })
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
