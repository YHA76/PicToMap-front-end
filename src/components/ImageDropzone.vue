<template>
  <div
    class="border-4 border-dashed border-gray-300 rounded-xl p-8 w-full max-w-xl text-center bg-white shadow-md transition hover:border-blue-400"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <p class="text-gray-600 mb-4">Glissez une image ici ou cliquez pour en sélectionner une</p>

    <input type="file" accept="image/*" @change="handleFileChange" class="hidden" ref="fileInput" />

    <button
      @click="fileInput.click()"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Sélectionner une image
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { extractGpsFromImage } from "../services/imageService";

const emit = defineEmits(["coordsFound", "error"]);

const fileInput = ref(null);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await sendToBackend(file);
  }
};

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    await sendToBackend(file);
  }
};

const sendToBackend = async (file) => {
  try {
    const coords = await extractGpsFromImage(file);
    emit("coordsFound", coords);
  } catch (error) {
    emit("error", error.message);
  }
};
</script>
