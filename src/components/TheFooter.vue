<!-- src/components/TheFooter.vue -->
<template>
  <footer class="bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400 py-6 text-sm">
    <div class="max-w-4xl mx-auto flex flex-col items-center gap-4 px-4">
      <!-- Copyright + auteur -->
      <p class="text-center">
        &copy; 2025 <span class="font-semibold">PicToMap</span> — Réalisé par Yahya Benali
      </p>

      <!-- Icônes réseaux sociaux -->
      <div class="flex gap-6">
        <!-- GitHub -->
        <a
          href="https://github.com/YHA76"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.418 2.865 8.166 6.839 9.489.5.091.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.912.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.983 1.029-2.682-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.565 9.565 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.396.1 2.65.64.699 1.028 1.59 1.028 2.682 0 3.842-2.337 4.687-4.566 4.935.359.31.678.923.678 1.86 0 1.343-.012 2.424-.012 2.753 0 .268.18.58.688.482A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <!-- LinkedIn -->
        <a
          href="https://www.linkedin.com/in/yahya-benali-507b09223/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM7 19H4v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zM20 19h-3v-5.604c0-1.337-.025-3.058-1.865-3.058-1.865 0-2.151 1.455-2.151 2.961V19h-3v-10h2.881v1.367h.041c.401-.756 1.381-1.552 2.846-1.552 3.043 0 3.605 2.002 3.605 4.602V19z"
            />
          </svg>
        </a>
      </div>

      <!-- Mention confidentialité + lien vers la page dédiée -->
      <div class="flex flex-col items-center space-y-1">
        <p class="italic text-xs">Aucune image n’est stockée.</p>
        <router-link
          to="/privacy"
          class="text-xs underline hover:text-primary-500 transition-colors"
        >
          Politique de confidentialité
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped></style>
