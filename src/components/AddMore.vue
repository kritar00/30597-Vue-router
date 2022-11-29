<template>
  <div
    class="fixed z-50 px-2 py-12 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-2/5 bg-white border rounded"
  >
    <h2 class="text-4xl font-semibold pb-8 text-black-800">New book</h2>
    <div class="flex gap-3">
      <BaseInput
        class=""
        label="Book title"
        type="text"
        placeholder="Book title..."
        v-model.trim="book.title"
      />
      <label for="author" class="font-bold py-2"
        >Author
        <select
          class="py-2 border border-cornflower-blue-400 rounded"
          name="Author"
          id="author"
          v-model="book.author"
        >
          <option
            v-for="(item, index) in data"
            :key="`option:${index}`"
            :value="{
              authorID: item.id,
              authorName: `${item.authorName}`,
            }"
          >
            {{ item.authorName }}
          </option>
        </select></label
      >
    </div>
    <BaseInput
      class=""
      label="Book cover link"
      placeholder="Cover here..."
      type="URL"
      v-model.trim="book.image"
    />
    <BaseInput
      class=""
      label="Price ($)"
      placeholder="Price here..."
      type="text"
      v-model.trim="book.price"
    />
    <BaseInput
      class=""
      label="Date of manufacture"
      placeholder="Date of manufacture here..."
      type="date"
      v-model="book.manufactureDate"
    />
    <label class="py-2 block"
      >The book's link will be:
      <input
        class="w-full shadow-lg py-2 border border-black-400 bg-black-100 rounded"
        type="text"
        :value="stringToSlug(book.title)"
        disabled
      />
    </label>
    <label for="summary">Summary (Optional)</label>
    <textarea
      name="summary"
      v-model="book.summary"
      id="summary"
      class="w-full h-28"
    ></textarea>
    <div class="pt-6">
      <button
        :disabled="!book.title || !book.author || !book.manufactureDate"
        type="submit"
        @click="onClickAdd"
        class="btn mx-[1px] bg-black-800 text-white"
      >
        Complete adding
      </button>
      <button
        type="button"
        b
        @click="onClickCancel"
        class="btn mx-[1px] underline"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import BaseInput from "./BaseInput.vue";
const props = defineProps(["data"]);
const emits = defineEmits(["cancel", "add"]);
const book = reactive({
  id: "",
  title: "",
  author: {},
  price: null,
  image: "",
  manufactureDate: "",
  slug: "",
  summary: "",
});
function onClickCancel() {
  emits("cancel");
}
function onClickAdd() {
  emits("add", book);
}
function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  book.slug = str;
  return str;
}
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
