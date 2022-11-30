import { createStore } from 'vuex'
import { getData } from '@/API/API.js'

const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const apiModule = {
    namespaced: true,
    state: {
        books: [],
        authors: []
    },
    mutations: {
        assignBooks(state, payload) {
            state.books = payload
        },
        assignAuthors(state, payload) {
            state.authors = payload
        }
    },
    getters: {
        authorDetail: (state) => (id) => {
            return state.authors.filter((author) => author.id == id);
        },
        bookDetail: (state) => (slug) => {
            return state.books.filter((book) => book.slug == slug)
        },
        authorsBooks: (state) => (id) => {
            return state.books.filter((b) => b.author.authorID == id)
        }
    },
    actions: {
        assignBooks({ state, commit }) {
            getData(bookURL).then((response) => {
                commit('assignBooks', response.data)
            }).catch((error) => {
                console.log(error);
            });
        },
        assignAuthors({ state, commit }) {
            getData(authorURL).then((response) => {
                commit('assignAuthors', response.data)
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}

const store = createStore({
    modules: {
        api: apiModule
    },
    state: {
        validators: {
            isEditing: false,
            isAdding: false,
            isOpenSidebar: false
        }
    },
    mutations: {
        toggleSidebar(state) {
            state.validators.isOpenSidebar = !state.validators.isOpenSidebar
        },
        toggleEditing(state) {
            state.validators.isEditing = !state.validators.isEditing;
            if (!state.validators.isEditing) state.validators.isAdding = false;
        },
        toggleAdding(state) {
            state.validators.isAdding = !state.validators.isAdding;
        }
    },
    getters: {

    },
    actions: {
    }
})

export default store