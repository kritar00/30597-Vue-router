<template>
  <header class="z-50 fixed shadow-lg w-full bg-cornflower-blue-400">
    <button
      class="absolute -translate-y-1/2 left-3 top-1/2"
      @click="toggleSidebar"
    >
      <i class="text-white text-4xl uil uil-bars"></i>
    </button>
    <router-link to="/" class="block w-fit m-auto p-4 text-4xl text-white"
      >Some Books</router-link
    >
    <button
      @click="toggleEditing"
      class="absolute -translate-y-1/2 right-3 top-1/2"
    >
      <i :class="editIconCompute" class="text-white text-4xl"></i>
    </button>
  </header>
  <Transition name="slide-fade">
    <Sidebar
      class="z-50"
      v-if="storeRootData.isOpenSidebar"
      @toggleSidebar="toggleSidebar"
      :storeApiData="storeApiData"
    />
  </Transition>
  <router-view
    :isEditing="storeRootData.isEditing"
    :isAdding="storeRootData.isAdding"
    @adding="toggleAdding"
    @saved="toggleEditing"
  />
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const toggleSidebar = () => {
  store.commit("toggleSidebar");
};
const toggleEditing = () => {
  store.commit("toggleEditing");
};
const toggleAdding = () => {
  store.commit("toggleAdding");
};
const editIconCompute = computed(() => {
  return store.state.validators.isEditing ? "uil uil-times" : "uil uil-edit";
});
router.beforeEach((to, from, next) => {
  if (store.state.validators.isEditing) toggleEditing();
  next();
});
const storeApiData = computed(() => {
  return store.state.a;
});
const storeRootData = computed(() => {
  return store.state.validators;
});
const asyncGetData = () => {
  store.dispatch("a/assignAuthors");
  store.dispatch("a/assignBooks");
};

onMounted(() => {
  asyncGetData();
});
</script>
