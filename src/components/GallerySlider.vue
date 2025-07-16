<template>
  <section class="gallery-slider">
    <!-- Première ligne d'images qui défile vers la gauche -->
    <div class="gallery-row gallery-row-top">
      <div class="gallery-track">
        <div
          v-for="(image, i) in duplicatedImages"
          :key="`top-${i}`"
          class="relative group gallery-item"
        >
          <img :src="image.src" :alt="`Image ${image.city}`" loading="lazy" class="gallery-image" />
          <div
            class="absolute inset-0 bg-black/70 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center text-center p-5 backdrop-blur-sm"
          >
            <div class="text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-md">
              {{ image.city }}
            </div>
            <a
              class="mt-2 text-xs sm:text-sm px-3 py-1 rounded-full bg-accent-100 text-black font-medium shadow hover:bg-accent-500 transition-colors"
              :href="`https://www.google.com/maps?q=${image.lat},${image.lon}`"
              target="_blank"
            >
              Voir sur Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Deuxième ligne d'images qui défile vers la droite -->
    <div class="gallery-row gallery-row-bottom">
      <div class="gallery-track">
        <div
          v-for="(image, i) in duplicatedImages"
          :key="`bottom-${i}`"
          class="relative group gallery-item"
        >
          <img :src="image.src" :alt="`Image ${image.city}`" loading="lazy" class="gallery-image" />
          <div
            class="absolute inset-0 bg-black/70 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center text-center p-5 backdrop-blur-sm"
          >
            <div class="text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-md">
              {{ image.city }}
            </div>
            <a
              class="mt-2 text-xs sm:text-sm px-3 py-1 rounded-full bg-accent-100 text-black font-medium shadow hover:bg-accent-500 transition-colors"
              :href="`https://www.google.com/maps?q=${image.lat},${image.lon}`"
              target="_blank"
            >
              Voir sur Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import picture1 from "../assets/images/new_york.webp";
import picture2 from "../assets/images/shibuya.webp";
import picture4 from "../assets/images/amsterdam.webp";
import picture5 from "../assets/images/weesp.webp";
import picture6 from "../assets/images/oman.webp";
import picture7 from "../assets/images/ottawa.webp";
import picture8 from "../assets/images/senegal.webp";
import picture9 from "../assets/images/times_square.webp";
import picture10 from "../assets/images/rome.webp";
import picture11 from "../assets/images/porto.webp";
import picture12 from "../assets/images/rio.webp";
import picture13 from "../assets/images/kuala_lumpur.webp";
import picture14 from "../assets/images/oran.webp";
import picture15 from "../assets/images/cuba.webp";
import picture16 from "../assets/images/turquie.webp";
import picture17 from "../assets/images/londres.webp";

// Tableau d'images avec infos ville et coordonnées
const images = [
  {
    src: picture1,
    city: "États-Unis – New York",
    alt: "New York City",
    lat: 40.748817,
    lon: -73.985428,
  },
  {
    src: picture2,
    city: "Japon – Shibuya",
    alt: "Shibuya, Tokyo",
    lat: 35.659286,
    lon: 139.700806,
  },
  {
    src: picture4,
    city: "Pays-Bas – Amsterdam",
    alt: "Amsterdam, Netherlands",
    lat: 52.39475,
    lon: 4.87814,
  },
  {
    src: picture5,
    city: "Pays-Bas – Weesp",
    alt: "Weesp, Netherlands",
    lat: 52.307709,
    lon: 5.0326613,
  },
  {
    src: picture6,
    city: "Oman – Mascate",
    alt: "Oman, Muscat",
    lat: 23.5859,
    lon: 58.4059,
  },
  {
    src: picture7,
    city: "Canada – Ottawa",
    alt: "Ottawa, Canada",
    lat: 45.4256696,
    lon: -75.6978727,
  },
  {
    src: picture8,
    city: "Sénégal – Dakar",
    alt: "Dakar, Senegal",
    lat: 14.692128,
    lon: -17.475936,
  },

  {
    src: picture9,
    city: "États-Unis – Times Square",
    alt: "New York City, Times Square",
    lat: 40.7598841,
    lon: -73.9842158,
  },
  {
    src: picture10,
    city: "Italie – Rome",
    alt: "Rome, Italy",
    lat: 41.895864,
    lon: 12.477214,
  },
  {
    src: picture11,
    city: "Portugal – Porto",
    alt: "Porto, Portugal",
    lat: 41.1415853,
    lon: -8.6087805,
  },
  {
    src: picture12,
    city: "Brésil – Rio de Janeiro",
    alt: "Rio de Janeiro, Brazil",
    lat: -22.9518833,
    lon: -43.21025,
  },
  {
    src: picture13,
    city: "Malaisie – Kuala Lumpur",
    alt: "Kuala Lumpur, Malaysia",
    lat: 3.1569,
    lon: 101.71354,
  },
  {
    src: picture14,
    city: "Algérie – Oran",
    alt: "Oran, Algeria",
    lat: 35.7090955,
    lon: -0.6648043,
  },
  {
    src: picture15,
    city: "Cuba – La Havane",
    alt: "Havana, Cuba",
    lat: 23.14145,
    lon: -82.3537,
  },
  {
    src: picture16,
    city: "Turquie – Istanbul",
    alt: "Istanbul, Turkey",
    lat: 41.0056762,
    lon: 28.9763724,
  },
  {
    src: picture17,
    city: "Royaume-Uni – Londres",
    alt: "London, United Kingdom",
    lat: 51.5008132,
    lon: -0.1196865,
  },
];

// Duplication des images pour assurer un défilement fluide et continu
const duplicatedImages = computed(() => [...images, ...images, ...images, ...images]);

// ====================  Contrôle de la vitesse  ====================

const animationSpeed = ref(90);

// Ajustement dynamique : mobile → 50 s, tablette → 70 s, desktop → 90 s
onMounted(() => {
  const updateAnimationSpeed = () => {
    animationSpeed.value = window.innerWidth < 768 ? 50 : window.innerWidth < 1280 ? 70 : 90;

    document.documentElement.style.setProperty("--animation-duration", `${animationSpeed.value}s`);
  };

  updateAnimationSpeed();
  window.addEventListener("resize", updateAnimationSpeed);

  return () => window.removeEventListener("resize", updateAnimationSpeed);
});
</script>

<style scoped>
:root {
  /* durée d'animation par défaut (sera écrasée par JS) */
  --animation-duration: 90s;
}

/* Conteneur principal de la galerie */
.gallery-slider {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Rangée d'images */
.gallery-row {
  position: relative;
  width: 100%;
  height: 40vh;
  overflow: hidden;
  margin: 2vh 0;
}

.gallery-row-top {
  margin-top: 5vh;
}

.gallery-row-bottom {
  margin-bottom: 5vh;
}

/* Piste de défilement contenant toutes les images */
.gallery-track {
  display: flex;
  width: max-content;
  height: 100%;
  gap: 2vw;
}

/* Animation vers la gauche pour la ligne du haut */
.gallery-row-top .gallery-track {
  animation: scroll-left var(--animation-duration) linear infinite;
}

/* Animation vers la droite pour la ligne du bas */
.gallery-row-bottom .gallery-track {
  animation: scroll-right var(--animation-duration) linear infinite;
}

/* Bloc contenant une image */
.gallery-item {
  height: 100%;
  flex: none;
  overflow: hidden;
  border-radius: 1rem;
  transition: transform 0.3s ease-out;
}

/* Image dans chaque bloc */
.gallery-image {
  height: 100%;
  width: auto;
  min-width: 40vh;
  max-width: 60vw;
  object-fit: cover;
  object-position: center;
  transition: filter 0.3s ease;
}

/* Effet survol : amélioration du contraste */
.gallery-item:hover .gallery-image {
  filter: contrast(1.3);
}

/* Animation de défilement vers la gauche */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 1vw));
  }
}

/* Animation de défilement vers la droite */
@keyframes scroll-right {
  0% {
    transform: translateX(calc(-50% - 1vw));
  }
  100% {
    transform: translateX(0);
  }
}

/* Responsive : adaptation pour les petits écrans */
@media (max-width: 768px) {
  .gallery-row {
    height: 30vh;
    margin: 5vh 0;
  }

  .gallery-item {
    border-radius: 0.75rem;
  }

  .gallery-image {
    min-width: 30vh;
    max-width: 80vw;
  }
}

/* Responsive : adaptation pour les très grands écrans */
@media (min-width: 1440px) {
  .gallery-row {
    height: 45vh;
  }

  .gallery-image {
    min-width: 50vh;
  }
}
</style>
