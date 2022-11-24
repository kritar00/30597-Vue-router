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
      />
      <label for="author" class="font-bold py-2"
        >Author
        <select
          class="py-2 border border-cornflower-blue-400 rounded"
          name="Author"
          id="author"
        >
          <option
            v-for="item in data"
            :value="{ id: item.id, name: `${item.firstName} ${item.lastName}` }"
          >
            {{ item.firstName }} {{ item.lastName }}
          </option>
        </select></label
      >
    </div>
    <BaseInput
      class=""
      label="Book cover link"
      placeholder="Cover here..."
      type="URL"
    />
    <BaseInput
      class=""
      label="Price ($)"
      placeholder="Price here..."
      type="text"
    />
    <BaseInput
      class=""
      label="Date of manufacture"
      placeholder="Date of manufacture here..."
      type="date"
    />
    <div class="pt-12">
      <button
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
const obj = reactive({
  id: "",
  title: "",
  author: {
    id: null,
    name: "",
  },
  price: null,
  image: "",
  manufactureDate: "",
  slug: "",
});
function onClickCancel() {
  emits("cancel");
}
function onClickAdd() {
  emits("add");
}
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
