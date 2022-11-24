<template>
  <div class="p-24" v-for="item in authorDetail">
    <div class="flex gap-8">
      <span class="w-96 aspect-square shrink-0"
        ><img :src="item.image" @error="replaceByDefault" alt="" />
      </span>
      <form class="flex flex-col w-full">
        <input
          :disabled="!isEditing"
          class="py-2 text-3xl"
          :value="`${item.firstName} ${item.lastName}`"
        />
        <label
          >Date of birth:
          <input :disabled="!isEditing" class="py-2" :value="`${item.dob}`" />
        </label>
        <label
          >Gender:
          <input
            :disabled="!isEditing"
            class="py-2"
            :value="`${item.sex ? `Male` : `Female`}`"
        /></label>
        <label
          >Bio:
          <textarea :disabled="!isEditing" class="py-2 w-full h-36">{{
            item.bio
          }}</textarea>
        </label>
        <BaseInput
          label="Book cover link:"
          v-if="isEditing"
          :value="item.image"
          type="text"
        />
        <button v-if="isEditing" class="btn bg-black-800 w-fit text-white">
          Save
        </button>
      </form>
    </div>
    <section>
      <h2 class="text-3xl">More from this author</h2>
      <div class="pt-5 grid grid-cols-4">
        <BookCard
          v-for="(item, index) in authorsBooksCompute"
          :item="item"
          :isEditing="isEditing"
          :key="`authorsBook:${index}`"
          @delete="deleteFromApi"
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
import BaseInput from "../components/BaseInput.vue";
const route = useRoute();
const router = useRouter();
const props = defineProps(["data", "authors", "isEditing", "isAdding"]);
const emits = defineEmits(["deleteRequest", "adding"]);
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
function deleteFromApi(value) {
  console.log(value);
  emits("deleteRequest", value);
}
</script>
