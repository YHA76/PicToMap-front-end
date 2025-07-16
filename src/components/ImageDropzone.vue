<template>
  <div class="relative w-full max-w-3xl mx-auto">
    <div
      :class="[
        'uploader-area relative w-full h-auto aspect-[4/4] sm:aspect-video rounded-2xl transition-all duration-300 ease-in-out',
        'bg-white/80 dark:bg-primary-900 backdrop-blur-md',
        'shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]',
        'border-2 border-dashed dark:border-gray-600 overflow-hidden',
        isDragging
          ? 'scale-[1.02] border-primary-100 bg-primary-100/10 dark:bg-primary-100/20'
          : '',
        isProcessing ? 'border-solid border-primary-100 dark:border-primary-100' : '',
        hasError ? 'border-solid border-error-500 bg-error-500/10 dark:bg-error-500/20' : '',
      ]"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Area Content -->
      <div class="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-10">
        <div class="w-full max-w-md text-center animate-fade-in space-y-4 sm:space-y-6">
          <!-- Processing State -->
          <div v-if="isProcessing" class="space-y-4 sm:space-y-6">
            <div class="spinner-container mx-auto">
              <div class="spinner"></div>
            </div>
            <p
              class="text-primary-100 dark:text-primary-100 font-medium text-sm sm:text-lg tracking-wide"
            >
              Traitement en cours...
            </p>
          </div>

          <!-- Default/Drag/Error State -->
          <template v-else>
            <div
              :class="[
                'transition-all duration-300',
                isDragging ? 'scale-110 text-primary-100' : 'text-primary-100',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-12 h-12 sm:w-16 sm:h-16 mx-auto drop-shadow-md stroke-current text-primary-500 dark:text-accent-500 transition-colors duration-300"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6.5 7h11M5 7a1 1 0 011.5 0M18 7a1 1 0 011.5 0M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3
              class="text-xl sm:text-2xl font-semibold mb-1 sm:mb-3 text-text-100 dark:text-text-900"
            >
              {{ isDragging ? "Déposez votre image ici" : "Importer une image" }}
            </h3>

            <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base break-words">
              {{
                isDragging
                  ? "Lâchez pour traiter l'image"
                  : "Glissez et déposez ou sélectionnez un fichier"
              }}
            </p>

            <!-- Compte à rebours rate-limit -->
            <p
              v-if="retryCountdown > 0"
              class="mt-2 text-[12px] sm:text-xs md:text-sm text-error-500 dark:text-error-500 font-medium text-center break-normal whitespace-nowrap sm:whitespace-normal"
            >
              Trop de requêtes&nbsp;: réessayez dans {{ retryCountdown }}&nbsp;s…
            </p>

            <!-- Button -->
            <button
              @click="triggerFileInput"
              :class="[
                'px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base',
                'bg-primary-100 text-white dark:bg-accent-100 dark:text-black',
                'shadow-[inset_2px_2px_5px_rgba(255,255,255,0.3),_inset_-5px_-5px_10px_rgba(0,0,0,0.2)]',
                'hover:shadow-[0_5px_20px_rgba(0,0,0,0.25)]',
                'transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95',
                isProcessing ? 'opacity-50 cursor-not-allowed' : '',
              ]"
              :disabled="isProcessing"
            >
              Parcourir
            </button>
          </template>
        </div>
      </div>

      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileChange"
        class="hidden"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { extractGpsFromImage } from "../services/imageService";
import "../assets/css/imageDropzone.css";

const emit = defineEmits(["coordsFound", "error"]);

const fileInput = ref(null);
const isDragging = ref(false);
const isProcessing = ref(false);
const hasError = ref(false);
const errorMessage = ref("");
const showSuccess = ref(false);
const retryCountdown = ref(0);

function startCountdown(sec) {
  retryCountdown.value = sec;
  const timer = setInterval(() => {
    retryCountdown.value--;
    if (retryCountdown.value <= 0) clearInterval(timer);
  }, 1000);
}

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = async (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) await processFile(file);
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) await processFile(file);
};

const processFile = async (file) => {
  hasError.value = false;
  errorMessage.value = "";
  showSuccess.value = false;

  if (!file.type.startsWith("image/")) {
    hasError.value = true;
    errorMessage.value = "Veuillez sélectionner une image valide";
    return;
  }

  try {
    isProcessing.value = true;
    const coords = await extractGpsFromImage(file);
    isProcessing.value = false;
    showSuccess.value = true;
    setTimeout(() => (showSuccess.value = false), 4000);
    emit("coordsFound", coords);
  } catch (err) {
    isProcessing.value = false;
    hasError.value = true;
    errorMessage.value = err.message || "Impossible d'extraire les coordonnées GPS";

    // Si l’erreur contient retry (HTTP 429)
    if (err.retry) startCountdown(err.retry);

    emit("error", errorMessage.value);
  }
};
</script>
<style scoped>
@keyframes halo {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
}

.animate-halo {
  animation: halo 2s infinite;
}
</style>
