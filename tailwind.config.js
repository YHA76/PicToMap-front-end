/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // 🔵 Couleurs principales (bleu océan)
        primary: {
          100: "#3AB7F7", // Bleu océan clair
          500: "#2A9EDB", // Bleu moyen
          900: "#1E2A38", // Bleu nuit profond
        },

        // 🟤 Fond général
        background: {
          100: "#FEF9EF", // Sable chaud clair
          900: "#2D3B4E", // Fond sombre profond
        },

        // 🟠 Accent (corail)
        accent: {
          100: "#F76C5E", // Corail clair
          500: "#F56B4E", // Corail moyen
          900: "#F99081", // Corail vif
        },

        // 📝 Couleurs du texte
        text: {
          100: "#1F2937", // Texte sombre (clair)
          900: "#E5E7EB", // Texte clair (sombre)
        },

        // ✅ Succès
        success: {
          500: "#10B981", // Vert validation
        },

        // ❌ Erreur
        error: {
          500: "#EF4444", // Rouge erreur
        },
      },

      animation: {
        "bounce-slow": "bounce 3s infinite", // rebond lent
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite", // pulsation lente
        "fade-in": "fadeIn 0.7s ease-out", // fondu
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      backdropBlur: {
        xs: "2px", // léger flou pour les fonds
      },
    },
  },

  plugins: [],
};
