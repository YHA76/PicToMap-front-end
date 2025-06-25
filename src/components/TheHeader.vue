<template>
  <header
    class="bg-gray-100 text-gray-600 dark:bg-primary-900 dark:text-gray-100 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img
          src="@/assets/images/logo.png"
          alt="Logo PicToMap"
          class="h-14 w-auto dark:invert transition duration-500 ease-in-out"
        />
        <span class="text-xl font-bold text-primary-500 dark:text-accent-100">PicToMap</span>
      </div>

      <!-- Titre -->
      <div
        class="hidden sm:block text-lg font-semibold text-text-100 dark:text-text-900 min-w-[250px] text-center"
      >
        Trouvez l'origine de vos photos
      </div>

      <!-- Switch -->
      <div class="ml-4 flex items-center space-x-2">
        <span class="text-xl">☀️</span>

        <label class="relative inline-flex items-center cursor-pointer w-14 h-8">
          <input type="checkbox" class="sr-only peer" :checked="isDark" @change="toggleDarkMode" />
          <div
            class="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-primary-100 dark:peer-checked:bg-accent-900 transition-colors duration-300"
          ></div>
          <div
            class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-6"
          ></div>
        </label>

        <span class="text-xl">🌙</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
};

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});
</script>
