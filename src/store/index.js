import { createStore } from 'vuex'
import { getData } from '@/API/API.js'
import router from '@/router'

const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";

const apiModule = {
    namespaced: true,
    state: {
        books: [],
        authors: [],
        currentAuthor: {}
    },
    mutations: {
        assignBooks(state, payload) {
            Object.assign(state.books, payload)
        },
        assignAuthors(state, payload) {
            Object.assign(state.authors, payload)
        }
    },
    getters: {
        authorDetail: (state) => id => {
            let result = [...state.authors];
            result = result.filter((author) => author.id == route.params.id);
            if (!result.length) router.push("/404");
            Object.assign(state.currentAuthor, result[0]);
        },
        authorsBooks: (state) => (id) => {
            return [...state.books].filter((b) => b.author.authorID == id)
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
        },
        assignCurrentAuthor({ state, commit, getters }, payload) {

        }
    }
}

const store = createStore({
    modules: {
        a: apiModule
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