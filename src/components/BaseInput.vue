<template>
  <label class="w-full block py-2">
    <span class="whitespace-nowrap font-bold text-black-800">{{ label }}</span>
    <input
      class="w-full shadow-lg py-2 border border-cornflower-blue-400 rounded"
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
</script>
