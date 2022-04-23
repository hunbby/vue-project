import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AppLayout from '../layout/app-layout.vue'
import AuthLayout from '../layout/auth-layout.vue'
import Dashboard from '../pages/admin/dashboard/Dashboard.vue'
import DataTables from '../pages/admin/tables/data-tables/DataTables.vue'
import MarkupTables from '../pages/admin/tables/markup-tables/MarkupTables.vue'
import UIRoute from '../pages/admin/ui/route'
import RouteViewComponent from './route-view.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'login' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      // {
      //   name: 'dashboard',
      //   path: 'dashboard',
      //   component: Dashboard,
      // },
      // {
      //   name: 'statistics',
      //   path: 'statistics',
      //   component: RouteViewComponent,
      //   children: [
      //     {
      //       name: 'charts',
      //       path: 'charts',
      //       component: () => import('@/pages/admin/statistics/charts/Charts.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Charts',
      //       },
      //     },
      //     {
      //       name: 'progress-bars',
      //       path: 'progress-bars',
      //       component: () => import('@/pages/admin/statistics/progress-bars/ProgressBars.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
      //       },
      //     },
      //   ],
      // },
      // {
      //   name: 'forms',
      //   path: 'forms',
      //   component: RouteViewComponent,
      //   children: [
      //     {
      //       name: 'form-elements',
      //       path: 'form-elements',
      //       component: () => import('@/pages/admin/forms/form-elements/FormElements.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/inputs',
      //       },
      //     },
      //     {
      //       name: 'medium-editor',
      //       path: 'medium-editor',
      //       component: () => import('@/pages/admin/forms/medium-editor/MediumEditor.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Medium-Editor',
      //       },
      //     },
      //   ],
      // },
      // {
      //   name: 'maps',
      //   path: 'maps',
      //   component: RouteViewComponent,
      //   children: [
      //     {
      //       name: 'google-maps',
      //       path: 'google-maps',
      //       component: () => import('@/pages/admin/maps/google-maps/GoogleMapsPage.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
      //       },
      //     },
      //     {
      //       name: 'yandex-maps',
      //       path: 'yandex-maps',
      //       component: () => import('@/pages/admin/maps/yandex-maps/YandexMapsPage.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
      //       },
      //     },
      //     {
      //       name: 'leaflet-maps',
      //       path: 'leaflet-maps',
      //       component: () => import('@/pages/admin/maps/leaflet-maps/LeafletMapsPage.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
      //       },
      //     },
      //     {
      //       name: 'bubble-maps',
      //       path: 'bubble-maps',
      //       component: () => import('@/pages/admin/maps/bubble-maps/BubbleMapsPage.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
      //       },
      //     },
      //     {
      //       name: 'line-maps',
      //       path: 'line-maps',
      //       component: () => import('@/pages/admin/maps/line-maps/LineMapsPage.vue'),
      //       meta: {
      //         wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
      //       },
      //     },
      //   ],
      // },
      {
        name: 'markup',
        path: 'markup',
        component: MarkupTables,
        // component: RouteViewComponent,
        // children: [
        //   {
        //     name: 'markup',
        //     path: 'markup',
        //     component: MarkupTables,
        //     meta: {
        //       wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
        //     },
        //   },
        //   {
        //     name: 'data',
        //     path: 'data',
        //     component: DataTables,
        //     meta: {
        //       wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
        //     },
        //   },
        // ],
      },
      {
        name: 'pages',
        path: 'pages',
        component: RouteViewComponent,
        children: [
          {
            name: '404-pages',
            path: '404-pages',
            component: () => import('@/pages/admin/pages/404PagesPage.vue'),
          },
          {
            name: 'faq',
            path: 'faq',
            component: () => import('@/pages/admin/pages/FaqPage.vue'),
          },
        ],
      },
      UIRoute,
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('@/pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('@/pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, _form, next) => {
//   const publicPages = ['/login', '/signup', '/home']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')
//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
