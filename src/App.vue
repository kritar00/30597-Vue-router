<template>
  <header class="z-50 fixed shadow-lg w-full bg-cornflower-blue-400">
    <button
      class="absolute -translate-y-1/2 left-3 top-1/2"
      @click="toggleSidebar"
    >
      <i class="text-white text-4xl uil uil-bars"></i>
    </button>
    <router-link to="/" class="block w-fit m-auto p-4 text-4xl text-white"
      >Some Books</router-link
    >
    <button
      @click="toggleEditing"
      class="absolute -translate-y-1/2 right-3 top-1/2"
    >
      <i :class="editIconCompute" class="text-white text-4xl"></i>
    </button>
  </header>
  <Transition name="slide-fade">
    <Sidebar
      class="z-50"
      v-if="isOpenSidebar"
      @toggleSidebar="toggleSidebar"
      :authors="authors"
    />
  </Transition>
  <HomeView />
  <BookView />
  <AuthorView />
  <router-view
    :data="books"
    @deleteRequest="deleteBookFromApi"
    :isAdding="isAdding"
    @adding="toggleAdding"
    @postRequest="postBookToApi"
    @putRequest="putAuthorToApi"
    :isEditing="isEditing"
    :authors="authors"
  />
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import AuthorView from "./views/AuthorView.vue";
import BookView from "./views/BookView.vue";
import HomeView from "./views/HomeView.vue";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const books = ref([]);
const authors = ref([]);
const isOpenSidebar = ref(false);
const isEditing = ref(false);
const isAdding = ref(false);
const router = useRouter();
async function getData(URL, data) {
  const response = await axios.get(URL);
  data.value = response.data;
}
async function deleteData(URL, value) {
  await axios.delete(`${URL}/${value}`);
  getData(bookURL, books);
  getData(authorURL, authors);
}
async function postData(URL, value) {
  await axios.post(URL, value);
  getData(bookURL, books);
  getData(authorURL, authors);
}
async function putData(URL, value) {
  await axios.put(`${URL}/${value.id}`, value);
  getData(bookURL, books);
  getData(authorURL, authors);
}
function deleteBookFromApi(value) {
  deleteData(bookURL, value);
}
function postBookToApi(data) {
  postData(bookURL, data);
}
function putAuthorToApi(data) {
  putData(authorURL, data.value);
  toggleEditing();
}
function toggleSidebar() {
  isOpenSidebar.value = !isOpenSidebar.value;
}
function toggleEditing() {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) isAdding.value = false;
}
function toggleAdding() {
  isAdding.value = !isAdding.value;
}
const editIconCompute = computed(() => {
  return isEditing.value ? "uil uil-times" : "uil uil-edit";
});
router.beforeEach((to, from, next) => {
  if (isEditing.value) isEditing.value = !isEditing.value;
  next();
});
onMounted(() => {
  getData(bookURL, books);
  getData(authorURL, authors);
});
</script>
