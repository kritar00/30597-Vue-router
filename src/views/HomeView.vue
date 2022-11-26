<template>
  <div class="p-24 auto-rows-fr grid gap-x-2 gap-y-8 grid-cols-4">
    <BookCard
      class="bg-slate-200"
      v-for="(item, index) in data"
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
import AddMore from "../components/AddMore.vue";
import BookCard from "../components/BookCard.vue";
import { reactive } from "vue";
const props = defineProps(["data", "authors", "isEditing", "isAdding"]);
const emits = defineEmits(["deleteRequest", "adding", "postRequest"]);
const bookData = reactive({});
function toggleAdd() {
  emits("adding");
}
function deleteFromApi(value) {
  emits("deleteRequest", value);
}
function getDataFromComponent(value) {
  Object.assign(bookData, value);
}
function postToApi() {
  emits("postRequest", bookData);
  toggleAdd();
}
</script>
