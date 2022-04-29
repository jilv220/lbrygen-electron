import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('../components/HomeView.vue')
const Search = () => import('../components/SearchView.vue')
const Stream = () => import('../components/StreamView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: route => ({ 
      searchContent: route.query.q,
      queryType: route.query.qt,
      streamType: route.query.st
    })
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
