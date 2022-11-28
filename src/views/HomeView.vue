<template>
  <div class="p-24 auto-rows-fr grid gap-x-2 gap-y-8 grid-cols-4">
    <BookCard
      class="bg-slate-200"
      v-for="(item, index) in books"
      :item="item"
      :key="`book:${index}`"
      :isEditing="isEditing"
      @delete="deleteFromApi"
    />
    <BookCard @add="toggleAdd" v-if="isEditing" />
    <transition name="fade">
      <form
        @submit.prevent="postToApi"
        v-if="isAdding && isEditing"
        class="w-full top-0 left-0 fixed bg-black-800/50 h-full"
      >
        <AddMore
          @cancel="toggleAdd"
          @add="getDataFromComponent"
          :data="authors"
        />
      </form>
    </transition>
  </div>
</template>

<script setup>
import { getData, postData, deleteData } from "@/API/API.js";
import AddMore from "../components/AddMore.vue";
import BookCard from "../components/BookCard.vue";
import { ref, reactive, onMounted } from "vue";
const props = defineProps(["isEditing", "isAdding"]);
const emits = defineEmits(["adding"]);
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const newBookData = reactive({});
const books = ref([]);
const authors = ref([]);

function toggleAdd() {
  emits("adding");
}
async function deleteFromApi(value) {
  await deleteData(bookURL, value);
  getData(bookURL).then((response) => {
    books.value = response.data;
  });
}
function getDataFromComponent(value) {
  Object.assign(newBookData, value);
}
async function postToApi() {
  await postData(bookURL, newBookData);
  getData(bookURL).then((response) => {
    books.value = response.data;
    toggleAdd();
  });
}

onMounted(() => {
  getData(bookURL).then((response) => {
    books.value = response.data;
  });
  getData(authorURL).then((response) => {
    authors.value = response.data;
  });
});
</script>
