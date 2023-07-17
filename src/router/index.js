import { createRouter, createWebHistory } from 'vue-router';
import GetAllVisitors from '../components/GetAllVisitors.vue';
import GetOneVisitor from '../components/GetOneVisitor.vue';
import AddVisitor from '../components/AddVisitor.vue';
import UpdateVisitor from '../components/UpdateVisitor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/visitor/:id',
      name: 'get-one-visitor',
      component: GetOneVisitor,
      props: true,
    },
    {
      path: '/',
      name: 'get-all-visitors',
      component: GetAllVisitors
    },
    {
      path: '/addVisitor',
      name: 'add-visitor',
      component: AddVisitor
    },
    {
      path: '/updateVisitor/:id',
      name: 'update-visitor',
      component: UpdateVisitor,
      props: true,
    },
  ]
})

export default router
