<!-- src/views/PrivacyPolicy.vue -->
<template>
  <div
    class="min-h-screen bg-background-100 dark:bg-background-900 text-text-100 dark:text-text-900 transition-colors duration-300"
  >
    <!-- En-tête global -->
    <TheHeader />

    <!-- Contenu principal -->
    <main class="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <!-- Bouton Retour -->
      <router-link
        to="/"
        class="inline-flex items-center text-sm font-medium text-primary-500 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Retour à l’accueil
      </router-link>

      <h1 class="text-2xl font-bold">Politique de confidentialité</h1>

      <p>
        Chez <span class="font-semibold">PicToMap</span>, nous n’extrayons les coordonnées GPS de
        vos images qu’à la volée, directement dans votre navigateur. Aucune photo, aucune donnée
        personnelle n’est conservée sur nos serveurs ou dans une base de données.
      </p>

      <p>
        <strong>Traitement :</strong> extraction GPS uniquement, en mémoire, pour générer la carte.
      </p>

      <p>
        <strong>Durée de conservation :</strong> aucune, tout est détruit dès que vous quittez la
        page ou fermez l’onglet.
      </p>
    </main>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
</script>
