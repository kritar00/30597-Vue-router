<template>
  <div class="p-24">
    <div class="flex gap-8">
      <span class="shrink-0">
        <defaultImg
          class="aspect-[9/14] w-96 object-cover"
          :src="book.image"
          @error="replaceByDefault"
          alt=""
        />
      </span>
      <div>
        <p class="py-2">{{ book.title }}</p>
        <router-link :to="`/author/${book.author.authorID}`" class="block py-2"
          >Author: {{ book.author.authorName }}</router-link
        >
        <p class="py-2">Price: ${{ book.price }}</p>
        <p class="py-2">Manufacture date: {{ book.manufactureDate }}</p>
        <p class="py-2">
          Summary: <span class="italic">{{ book.summary }}</span>
        </p>
      </div>
    </div>
    <router-link
      :to="`/author/${book.author.authorID}`"
      class="float-right py-4"
      >More info about this author<i class="uil uil-angle-right-b"></i
    ></router-link>
  </div>
</template>

<script setup>
import { getData } from "@/API/API.js";
import { ref, onMounted, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import defaultImg from "../assets/defaultImage.jpg";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const route = useRoute();
const router = useRouter();
const book = reactive({});
const bookDetail = (data) => {
  let result = [...data];
  console.log(result);
  result = result.filter((b) => b.slug == route.params.slug);
  Object.assign(book, result[0]);
  if (!result.length) router.push("/404");
};
function replaceByDefault(e) {
  e.target.src = defaultImg;
}
onMounted(() => {
  getData(bookURL).then((response) => {
    bookDetail(response.data);
  });
});
</script>
