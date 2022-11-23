<template>
  <div class="p-24 grid gap-x-2 gap-y-8 grid-cols-4">
    <BookCard
      class="bg-slate-200"
      v-for="(item, index) in data"
      :item="item"
      :key="`book: ${index}`"
      :isEditing="isEditing"
      @delete="deleteFromApi"
    />
    <BookCard @click.native="toggleAdd" v-if="isEditing" />
    <form v-if="isAdding" class="w-full top-0 left-0 fixed bg-black/50 h-full">
      <AddMore @adding="toggleAdd" :data="authors" />
    </form>
  </div>
</template>

<script setup>
import AddMore from "../components/AddMore.vue";
import BookCard from "../components/BookCard.vue";
import { ref } from "vue";
const isAdding = ref(false);
const props = defineProps(["data", "authors", "isEditing"]);
const emits = defineEmits(["deleteRequest"]);
function testFunction() {
  console.log("clicked");
}
function toggleAdd() {
  isAdding.value = !isAdding.value;
}
function deleteFromApi(value) {
  console.log(value);
  emits("deleteRequest", value);
}
</script>
