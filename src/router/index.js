import { createRouter, createWebHistory } from 'vue-router'
import { Store } from 'vuex'
import { getData } from '@/API/API.js'
const HomeView = () => import('../views/HomeView.vue')
const BookView = () => import('../views/BookView.vue')
const AuthorView = () => import('../views/AuthorView.vue')
const PageNotFound = () => import('../views/PageNotFound.vue')

const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/book/:slug',
            name: 'book',
            component: BookView,
            beforeEnter: (to, from, next) => {
                function isValid(param) {
                    // check if param is valid
                    getData(bookURL).then((response) => {
                        const found = response.data.some(element => element.slug === param)
                        if (!found) {
                            next({ name: 'not-found' });
                        }

                        else next();
                    })
                }
                isValid(to.params.slug)
            }
        },
        {
            path: '/author/:id',
            name: 'author',
            component: AuthorView,
            beforeEnter: (to, from, next) => {
                function isValid(param) {
                    // check if param is valid
                    getData(authorURL).then((response) => {
                        const found = response.data.some(element => element.id === param)
                        if (!found) {
                            next({ name: 'not-found' });
                        }

                        else next();
                    })
                }
                isValid(to.params.id)
            }
        },
        { path: '/404', name: 'not-found', component: PageNotFound },
        { path: '/:pathMatch(.*)*', redirect: '/404' }
    ]
})

export default router
