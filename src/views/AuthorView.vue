<template>
  <div class="p-24">
    <div class="flex gap-8">
      <span class="w-96 aspect-square shrink-0"
        ><img
          class="object-cover aspect-square"
          :src="author.image"
          @error="replaceByDefault"
          alt=""
        />
      </span>
      <form class="flex flex-col w-full">
        <input
          :disabled="!isEditing"
          class="py-2 text-3xl"
          v-model="author.authorName"
        />
        <label
          >Date of birth:
          <input
            :disabled="!isEditing"
            type="date"
            class="py-2"
            v-model="author.dob"
          />
        </label>
        <label
          >Gender:
          <span v-if="!isEditing">{{ author.sex ? "Male" : "Female" }}</span>
          <select id="gender" v-if="isEditing" class="py-2">
            <option :value="true">Male</option>
            <option :value="false">Female</option>
          </select>
        </label>

        <label
          >Bio:
          <textarea
            :disabled="!isEditing"
            v-model="author.bio"
            class="py-2 w-full h-36"
          ></textarea>
        </label>
        <BaseInput
          label="Author's image link:"
          v-if="isEditing"
          v-model="author.image"
          type="text"
        />
        <button
          v-if="isEditing"
          :disabled="!author.authorName"
          @click.prevent="onClickSave"
          class="btn bg-black-800 w-fit text-white"
        >
          Save
        </button>
        <p v-if="isEditing" class="italic text-black-400">
          *All changes will lost if you're not saving
        </p>
      </form>
    </div>
    <section>
      <h2 class="text-3xl">More from this author</h2>
      <div class="pt-5 grid grid-cols-4">
        <BookCard
          v-for="(item, index) in books"
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
import { getData, putData } from "@/API/API.js";
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import defaultImg from "../assets/defaultUser.png";
import BaseInput from "../components/BaseInput.vue";
const route = useRoute();
const router = useRouter();
const props = defineProps(["isEditing"]);
const emits = defineEmits(["adding"]);
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const author = reactive({});
const books = reactive({});
function authorDetail(data) {
  let result = [...data];
  console.log(result);
  result = result.filter((author) => author.id == route.params.id);
  if (!result.length) router.push("/404");
  Object.assign(author, result[0]);
}
const authorsBooks = (data) => {
  Object.assign(
    books,
    [...data].filter((b) => b.author.authorID == route.params.id)
  );
};
function replaceByDefault(e) {
  e.target.src = defaultImg;
}
const deleteFromApi = (value) => {
  emits("deleteRequest", value);
};
const onClickSave = () => {
  emits("putRequest", author);
};
onMounted(() => {
  getData(authorURL).then((response) => {
    authorDetail(response.data);
  });
  getData(bookURL).then((response) => {
    authorsBooks(response.data);
  });
});
</script>
