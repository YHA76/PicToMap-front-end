<template>
  <div
    class="min-h-screen bg-background-100 dark:bg-background-900 text-text-100 dark:text-text-900 transition-colors duration-300"
  >
    <TheHeader />

    <!-- Corps principal -->
    <main class="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <div class="space-y-14">
        <!-- Titre + sous-titre -->
        <header class="text-center space-y-6">
          <h1
            class="flex flex-col items-center gap-5 text-[clamp(2.25rem,8vw,3.75rem)] /* ≃ 36-60 px */ font-extrabold leading-tight tracking-tight"
          >
            <img
              src="@/assets/images/logo.png"
              alt="Logo PicToMap"
              class="h-24 md:h-24 lg:h-28 xl:h-32 w-auto dark:invert transition duration-500"
            />

            Découvrez l'origine&nbsp;de&nbsp;vos&nbsp;photos
          </h1>

          <p class="text-lg lg:text-xl max-w-2xl mx-auto">
            Importez une image ; nous extrairons ses coordonnées GPS pour vous montrer où elle a été
            prise.
          </p>

          <p
            class="mt-4 flex items-start justify-center text-center text-sm leading-relaxed text-gray-700 dark:text-gray-200"
          >
            <span>
              🛡️ Aucune <span class="font-semibold">photo</span> ni
              <span class="font-semibold">donnée</span> n’est conservée&nbsp;: pas de base de
              données,<br class="hidden lg:inline" />
              vos images vivent seulement en mémoire le temps de l’analyse.
            </span>
          </p>
        </header>

        <!-- Zone principale -->
        <section
          class="bg-white/80 dark:bg-primary-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
        >
          <!-- Zone de dépôt -->
          <ImageDropzone
            @coordsFound="updateCoords"
            @error="updateError"
            class="transition-transform duration-300 hover:scale-105"
          />

          <!-- Résultat ou erreur -->
          <ResultsDisplay :url="result" :error="error" />
        </section>

        <!-- Petit encart compatibilité + compteur -->
        <div class="space-y-6 text-center">
          <p class="text-sm lg:text-base">
            Compatible avec les images JPEG contenant des données GPS
          </p>

          <div
            class="inline-flex flex-col px-8 py-5 rounded-2xl bg-white/80 dark:bg-background-900/90 backdrop-blur-sm shadow-lg border border-primary-100 dark:border-accent-100"
          >
            <span class="text-sm lg:text-base mb-1"> Nombre d’images traitées&nbsp;: </span>
            <span class="text-3xl lg:text-4xl font-bold text-primary-500 dark:text-accent-100">
              {{ globalCount }}
            </span>
          </div>
        </div>
      </div>
    </main>

    <!-- Galerie plein écran en dehors du container -->
    <div style="width: 100vw; margin: 0; padding: 0; overflow: hidden">
      <GallerySlider />
    </div>
    <!-- Pied de page -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import ImageDropzone from "../components/ImageDropzone.vue";
import ResultsDisplay from "../components/ResultsDisplay.vue";
import GallerySlider from "../components/GallerySlider.vue";

const globalCount = ref(0);
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

onMounted(async () => {
  try {
    const response = await fetch("http://192.168.1.125:5000/get-count");
    const data = await response.json();
    globalCount.value = data.count;
  } catch (err) {
    console.error("Erreur lors de la récupération du compteur :", err);
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  animation: fadeIn 0.6s ease-out;
}
</style>
