<template>
  <div class="p-24">
    <div class="flex gap-8">
      <span class="w-96 aspect-square shrink-0"
        ><img
          class="object-cover aspect-square"
          :src="authorDetail.image"
          @error="replaceByDefault"
          alt=""
        />
      </span>
      <form class="flex flex-col w-full">
        <input
          :class="classNameCompute"
          :disabled="!isEditing"
          class="py-2 text-3xl"
          v-model="authorDetail.authorName"
        />
        <label class="py-2"
          >Date of birth:
          <input
            :class="classNameCompute"
            :disabled="!isEditing"
            type="date"
            class="py-2"
            v-model="authorDetail.dob"
          />
        </label>
        <label class="py-2"
          >Gender:
          <span v-if="!isEditing">{{
            authorDetail.sex ? "Male" : "Female"
          }}</span>
          <select
            id="gender"
            v-model="authorDetail.sex"
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
            v-model="authorDetail.bio"
            class="py-2 w-full h-36"
          ></textarea>
        </label>
        <BaseInput
          label="Author's image link:"
          v-if="isEditing"
          v-model="authorDetail.image"
          type="text"
        />
        <button
          v-if="isEditing"
          :disabled="!authorDetail.authorName"
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
import { ref, reactive, computed, onMounted, watch, onBeforeMount } from "vue";
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

const authorDetail = computed(() => {
  return store.getters["a/authorDetail"](route.params.id)[0];
});
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
  store.dispatch("a/assignBooks");
};
const onClickSave = async () => {
  await putData(authorURL, authorDetail);
  emits("saved");
};
const validateRoute = (params) => {
  return [...store.state.a.authors].filter((item) => item.id == params).length
    ? true
    : false;
};
// const storeCurrentAuthor = computed(() => {
//   return store.state.a.currentAuthor;
// });

onMounted(() => {
  // store.dispatch("a/assignCurrentAuthor", route.params.id);
});
</script>
