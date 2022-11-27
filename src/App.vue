<script setup lang="ts">
import { isClient } from "@renovamen/utils";

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "Kazi Hossain",
  meta: [
    { name: "description", content: "" },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#1c1c1c" : "#f7e9c3"))
    }
  ]
});

// Scroll to top after route change
const route = useRoute();

watch(
  () => route.path,
  () => isClient && window.scrollTo({ top: 0 })
);
</script>

<template>
  <RouterView />
</template>
