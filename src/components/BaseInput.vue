<template>
  <label class="w-full">
    <span class="whitespace-nowrap font-bold">{{ label }}</span>
    <input
      class="w-full shadow-lg"
      :type="type"
      :value="modelValue"
      v-bind="$attrs"
      @input="emits('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  type: String,
});
const emits = defineEmits(["update:modelValue"]);
function onTyping(event) {
  emits("update:modelValue", event.target.value);
}
</script>
