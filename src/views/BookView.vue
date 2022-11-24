<template>
  <div class="p-24" v-for="item in books">
    <div class="flex gap-8">
      <span class="shrink-0">
        <img
          @error="replaceByDefault"
          class="aspect-[9/14] w-96 object-cover"
          :src="item.image"
          alt=""
        />
      </span>
      <div>
        <p class="py-2">{{ item.title }}</p>
        <router-link :to="`/author/${item.author.authorID}`" class="block py-2"
          >Author: {{ item.author.authorName }}</router-link
        >
        <p class="py-2">Price: ${{ item.price }}</p>
        <p class="py-2">Manufacture date: {{ item.manufactureDate }}</p>
        <p class="py-2">
          Summary: <span class="italic">{{ item.summary }}</span>
        </p>
      </div>
    </div>
    <router-link :to="`/author/${item.authorID}`" class="float-right py-4"
      >More info about this author<i class="uil uil-angle-right-b"></i
    ></router-link>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import defaultImg from "../assets/defaultImage.jpg";
const route = useRoute();
const router = useRouter();
const props = defineProps(["data", "authors"]);
const emits = defineEmits("deleteRequest", "adding");
const books = computed(() => {
  let result = [...props.data];
  result = result.filter((b) => b.slug == route.params.slug);
  return result.length ? result : router.push("/404");
});
function replaceByDefault(e) {
  e.target.src = defaultImg;
}
</script>
