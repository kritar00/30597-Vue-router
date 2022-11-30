<template>
  <div v-if="item" class="relative">
    <img
      class="m-auto object-cover"
      :src="item.image"
      @error="replaceByDefault"
      alt="Book card image"
      width="144"
      height="224"
    />
    <router-link
      class="whitespace-nowrap overflow-hidden py-3 block"
      :to="`/book/${item.slug}`"
      >{{ item.title }}</router-link
    >
    <router-link
      class="whitespace-nowrap overflow-hidden block"
      :to="`/author/${item.author.authorID}`"
    >
      Author: {{ item.author.authorName }}
    </router-link>
    <p class="font-bold">Price: ${{ item.price }}</p>
    <button
      v-if="isEditing"
      @click="onClickDelete"
      class="absolute -top-2 right-0 bg-white border border-black rounded-full"
    >
      <i class="p-1 uil uil-times"></i>
    </button>
  </div>
  <div
    v-else
    @click="onClickOpenAdd"
    class="flex cursor-pointer flex-col justify-center items-center border-4 border-dashed"
  >
    <h2 class="text-2xl text-slate-300">ADD</h2>
    <i class="text-slate-300 text-2xl uil uil-focus-add"></i>
  </div>
</template>

<script setup>
import defaultImg from "../assets/defaultImage.jpg";
const props = defineProps({ item: Object, isEditing: Boolean });
const emits = defineEmits(["delete", "add"]);
const replaceByDefault = (e) => {
  e.target.src = defaultImg;
};
function onClickDelete() {
  emits("delete", props.item.id);
}
function onClickOpenAdd() {
  emits("add");
}
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
