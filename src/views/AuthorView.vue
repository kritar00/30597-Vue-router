<template>
  <div class="p-24" v-for="item in authorDetail">
    <div class="flex gap-8">
      <span class="w-96 aspect-square shrink-0"
        ><img :src="item.image" @error="replaceByDefault" alt="" />
      </span>
      <div>
        <p class="py-2 text-3xl">{{ item.firstName }} {{ item.lastName }}</p>
        <p class="py-2">Date of Birth: {{ item.dob }}</p>
        <p class="py-2">
          Gender: <span v-if="item.sex">Male</span> <span v-else>Female</span>
        </p>
        <p class="py-2">Bio: {{ item.bio }}</p>
      </div>
    </div>
    <section>
      <h2 class="text-3xl">More from this author</h2>
      <div class="pt-5 grid grid-cols-4">
        <BookCard
          v-for="(item, index) in authorsBooksCompute"
          :item="item"
          :key="`authorsBook:${index}`"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import defaultImg from "../assets/defaultUser.png";
const route = useRoute();
const router = useRouter();
const props = defineProps(["data", "authors", "isEditing"]);
const authorDetail = computed(() => {
  let result = [...props.authors];
  result = result.filter((author) => author.id == route.params.id);
  return result.length ? result : router.push("/404");
});
const authorsBooksCompute = computed(() => {
  let result = [...props.data];
  result = result.filter((b) => b.authorID == route.params.id);
  return result;
});

function replaceByDefault(e) {
  e.target.src = defaultImg;
}
</script>
