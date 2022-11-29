<template>
  <div class="p-24 auto-rows-fr grid gap-x-2 gap-y-8 grid-cols-4">
    <BookCard
      class="bg-slate-200"
      v-for="(item, index) in storeData.books"
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
          :data="storeData.authors"
        />
      </form>
    </transition>
  </div>
</template>

<script setup>
import { getData, postData, deleteData } from "@/API/API.js";
import AddMore from "../components/AddMore.vue";
import BookCard from "../components/BookCard.vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
const props = defineProps(["isEditing", "isAdding"]);
const emits = defineEmits(["adding"]);
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const newBookData = reactive({});
const books = ref([]);
const authors = ref([]);
const store = useStore();
const asyncGetData = () => {
  store.dispatch("a/assignAuthors");
  store.dispatch("a/assignBooks");
};
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
  toggleAdd();
  asyncGetData();
}
const storeData = computed(() => {
  let data = store.state.a;
  return data;
});
onMounted(() => {});
</script>
