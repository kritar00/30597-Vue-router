import { createRouter, createWebHashHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const BookView = () => import('../views/BookView.vue')
const AuthorView = () => import('../views/AuthorView.vue')
const PageNotFound = () => import('../views/PageNotFound.vue')
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/book/:slug',
            name: 'book',
            component: BookView
        },
        {
            path: '/author/:id',
            name: 'author',
            component: AuthorView
        },
        { path: '/404', component: PageNotFound },
        { path: '/:pathMatch(.*)*', redirect: '/404' }
    ]
})

export default router
