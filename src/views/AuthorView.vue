<template>
  <div class="p-24">
    <div class="flex gap-8">
      <span class="aspect-square shrink-0"
        ><img
          class="object-cover aspect-square"
          :src="prevAuthor.image"
          @error="replaceByDefault"
          alt="Picture of author"
          width="384"
          height="384"
        />
      </span>
      <form class="flex flex-col w-full">
        <input
          :class="classNameCompute"
          :disabled="!store.state.validators.isEditing"
          class="py-2 text-3xl"
          v-model="prevAuthor.authorName"
        />
        <label class="py-2"
          >Date of birth:
          <input
            :class="classNameCompute"
            :disabled="!store.state.validators.isEditing"
            type="date"
            class="py-2"
            v-model="prevAuthor.dob"
          />
        </label>
        <label class="py-2"
          >Gender:
          <span v-if="!store.state.validators.isEditing">{{
            prevAuthor.sex ? "Male" : "Female"
          }}</span>
          <select
            id="gender"
            v-model="prevAuthor.sex"
            v-if="store.state.validators.isEditing"
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
            :disabled="!store.state.validators.isEditing"
            v-model="prevAuthor.bio"
            class="py-2 w-full h-36"
          ></textarea>
        </label>
        <BaseInput
          label="Author's image link:"
          v-if="store.state.validators.isEditing"
          v-model="prevAuthor.image"
          type="text"
        />
        <button
          v-if="store.state.validators.isEditing"
          :disabled="!prevAuthor.authorName"
          @click.prevent="onClickSave"
          class="btn bg-black-800 w-fit text-white"
        >
          Save
        </button>
        <p
          v-if="store.state.validators.isEditing"
          class="italic text-black-400"
        >
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
          :isEditing="store.state.validators.isEditing"
          :key="`authorsBook:${index}`"
          @delete="deleteFromApi"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { putData, deleteData } from "@/API/API.js";
import { reactive, computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import defaultImg from "../assets/defaultUser.png";
import BaseInput from "../components/BaseInput.vue";
const route = useRoute();
const emits = defineEmits(["saved"]);
const authorURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/author";
const bookURL = "https://636db3bc91576e19e32daf8a.mockapi.io/nttp/books";
const store = useStore();
const saving = ref(false);
const prevAuthor = reactive({});
const authorsBooks = computed(() => {
  return store.getters["api/authorsBooks"](route.params.id);
});
const authorDetail = computed(() => {
  let result = store.getters["api/authorDetail"](route.params.id);
  return result;
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
  store.dispatch("api/assignBooks");
};
const onClickSave = async () => {
  await putData(authorURL, prevAuthor);
  store.dispatch("api/assignAuthors");
  saving.value = true;
  emits("saved");
};
watch(
  () => [store.state.validators.isEditing],
  (newState, oldState) => {
    console.log(newState[0]);
    if (!newState[0] && !saving.value) {
      console.log(authorDetail.value);
      Object.assign(prevAuthor, authorDetail.value);
    } else saving.value = false;
  }
);
onMounted(() => {
  Object.assign(
    prevAuthor,
    store.state.api.authors.find((author) => author.id == route.params.id)
  );
});
</script>
