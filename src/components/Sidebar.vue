<template>
  <div class="fixed top-0 left-0 w-2/6 h-full bg-black-900 text-white">
    <h2 class="text-center text-3xl pt-4">List of Authors</h2>
    <button @click="onClickClose" class="absolute p-3 top-0 right-0">
      <img :src="closeIcon" alt="Close icon" />
    </button>
    <ul class="pt-8">
      <li
        class="py-3 px-2 font-bold border-b border-white"
        v-for="(item, index) in storeApiData.authors"
        :key="`author-${index}`"
      >
        <router-link @click="onClickClose" :to="`/author/${item.id}`">
          {{ item.authorName }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
import closeIcon from "../assets/closeIcon.svg";
const props = defineProps(["storeApiData"]);
const emits = defineEmits(["toggleSidebar"]);
function onClickClose() {
  emits("toggleSidebar");
}
</script>
