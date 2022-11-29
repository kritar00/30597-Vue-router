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
          :class="classNameCompute"
          :disabled="!isEditing"
          class="py-2 text-3xl"
          v-model="author.authorName"
        />
        <label class="py-2"
          >Date of birth:
          <input
            :class="classNameCompute"
            :disabled="!isEditing"
            type="date"
            class="py-2"
            v-model="author.dob"
          />
        </label>
        <label class="py-2"
          >Gender:
          <span v-if="!isEditing">{{ author.sex ? "Male" : "Female" }}</span>
          <select
            id="gender"
            v-model="author.sex"
            v-if="isEditing"
            class="py-2"
            :class="classNameCompute"
          >
            <option :value="true">Male</option>
            <option :value="false">Female</option>
          </select>
        </label>

        <label class="py-2"
          >Bio:
          <textarea
            :class="classNameCompute"
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
          *All changes will be lost if you're not saving
        </p>
      </form>
    </div>
    <section>
      <h2 class="text-3xl">More from this author</h2>
      <div class="pt-5 grid grid-cols-4">
        <BookCard
          v-for="(item, index) in authorsBooks"
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
import { getData, putData, deleteData } from "@/API/API.js";
import { reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import defaultImg from "../assets/defaultUser.png";
import BaseInput from "../components/BaseInput.vue";
const route = useRoute();
const router = useRouter();
const props = defineProps(["isEditing"]);
const emits = defineEmits(["saved"]);
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const store = useStore();
const author = reactive({});
const authorsBooks = computed(() => {
  // Object.assign(
  //   books,
  //   [...data].filter((b) => b.author.authorID == route.params.id)
  // );
  return store.getters["a/authorsBooks"](route.params.id);
});

const storeData = computed(() => {
  let data = store.state.a;
  return data;
});
const authorDetail = (data) => {
  // return store.getters["a/authorDetail"](route.params.id);
  let result = [...data];
  result = result.filter((author) => author.id == route.params.id);
  Object.assign(author, result[0]);
  if (!result.length) router.push("/404");
};
const classNameCompute = computed(() => {
  return store.state.validators.isEditing
    ? "border border-cornflower-blue-400 rounded"
    : "bg-transparent";
});
const replaceByDefault = (e) => {
  e.target.src = defaultImg;
};
const deleteFromApi = async (value) => {
  await deleteData(bookURL, value);
  getData(bookURL).then((response) => {
    authorsBooks(response.data);
  });
};
const onClickSave = async () => {
  await putData(authorURL, author);
  emits("saved");
  getData(authorURL).then((response) => {
    authorDetail(response.data);
  });
};
// watch(
//   route,
//   (to, from) => {
//     getData(authorURL)
//       .then((response) => {
//         authorDetail(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   },
//   { flush: "pre", immediate: true, deep: true }
// );
onMounted(async () => {
  await authorDetail(storeData);
});
</script>
