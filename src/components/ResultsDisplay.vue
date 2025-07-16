<template>
  <div class="mt-6 w-full max-w-xl mx-auto text-center px-4 sm:px-6">
    <!-- Lien Google Maps -->
    <div
      v-if="url"
      class="bg-green-50 border border-green-300 text-green-800 p-4 sm:p-5 rounded shadow text-sm sm:text-base break-words"
    >
      <p class="mb-2 font-semibold">Coordonnées GPS trouvées :</p>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="underline text-blue-600 hover:text-blue-800 transition break-all"
      >
        Ouvrir dans Google Maps 🌍
      </a>
    </div>

    <!-- Message d'erreur -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-300 text-red-700 p-4 sm:p-5 rounded shadow text-sm sm:text-base"
    >
      <p class="font-semibold">Erreur :</p>
      <p class="break-words">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  url: String,
  error: String,
});
</script>
