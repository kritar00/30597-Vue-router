<template>
  <div class="p-24">
    <div class="flex gap-8">
      <span class="shrink-0">
        <img
          class="aspect-[9/14] w-96 object-cover"
          :src="bookCompute.image"
          @error="replaceByDefault"
          alt=""
        />
      </span>
      <div>
        <p class="py-2">{{ bookCompute.title }}</p>
        <router-link
          v-if="bookCompute.author"
          :to="`/author/${bookCompute.author.authorID}`"
          class="block py-2"
          >Author: {{ bookCompute.author.authorName }}</router-link
        >
        <p class="py-2">Price: ${{ bookCompute.price }}</p>
        <p class="py-2">Manufacture date: {{ bookCompute.manufactureDate }}</p>
        <p class="py-2">
          Summary: <span class="italic">{{ bookCompute.summary }}</span>
        </p>
      </div>
    </div>
    <router-link
      v-if="bookCompute.author"
      :to="`/author/${bookCompute.author.authorID}`"
      class="float-right py-4"
      >More info about this author<i class="uil uil-angle-right-b"></i
    ></router-link>
  </div>
</template>

<script setup>
import { getData } from "@/API/API.js";
import { ref, onMounted, reactive, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import defaultImg from "../assets/defaultImage.jpg";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const route = useRoute();
const store = useStore();
const bookCompute = computed(() => {
  return store.state.a.books.filter(
    (book) => book.slug == route.params.slug
  )[0];
});

function replaceByDefault(e) {
  e.target.src = defaultImg;
}
</script>
