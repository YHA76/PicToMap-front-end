<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <!-- En-tête -->
    <TheHeader />

    <!-- Corps principal -->
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-8 space-y-8">
      <h1 class="text-2xl md:text-3xl font-bold text-center">📍 Trouvez l'origine d'une photo</h1>

      <!-- Zone de dépôt -->
      <ImageDropzone @coordsFound="updateCoords" @error="updateError" />

      <!-- Résultat ou erreur -->
      <ResultsDisplay :url="result" :error="error" />
    </main>

    <!-- Pied de page -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import ImageDropzone from "../components/ImageDropzone.vue";
import ResultsDisplay from "../components/ResultsDisplay.vue";

const result = ref("");
const error = ref("");

const updateCoords = (coords) => {
  result.value = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
  error.value = "";
};

const updateError = (errMsg) => {
  result.value = "";
  error.value = errMsg;
};
</script>
