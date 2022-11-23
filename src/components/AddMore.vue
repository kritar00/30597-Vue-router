<template>
  <div
    class="fixed z-50 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-1/2 bg-white border"
  >
    <BaseInput label="Book title" type="text" />
    <select name="Author" id="author">
      <option v-for="item in data" :value="item.id">
        {{ item.firstName }} {{ item.lastName }}
      </option>
    </select>
    <BaseInput label="Image link" type="URL" />
    <BaseInput label="Price ($)" type="text" />
  </div>
</template>

<script setup>
import BaseInput from "./BaseInput.vue";

const props = defineProps(["data"]);
const emits = defineEmits(["test"]);
function test() {
  emits("test");
}
</script>
<script>
export default {
  inheritAttrs: false,
  components: { BaseInput },
};
</script>
