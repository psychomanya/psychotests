import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gemini: {
          dark: "#08090D",
          surface: "#10121A",
          card: "#161824",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "#1D2130",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
          amber: "#f59e0b",
          cyan: "#06b6d4",
          teal: "#14b8a6",
        },
      },
      backgroundImage: {
        "gemini-rainbow":
          "linear-gradient(135deg, #4285F4 0%, #9B51E0 35%, #EA4335 70%, #FBBC05 100%)",
        "gemini-rainbow-soft":
          "linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(155, 81, 224, 0.15) 35%, rgba(234, 67, 53, 0.15) 70%, rgba(251, 188, 5, 0.15) 100%)",
        "gemini-glow":
          "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.18) 0%, rgba(168, 85, 247, 0.12) 30%, rgba(236, 72, 153, 0.08) 60%, transparent 80%)",
      },
      animation: {
        "aura-float": "auraFloat 14s ease-in-out infinite alternate",
        "aura-pulse": "auraPulse 8s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        auraFloat: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(20px, -25px) scale(1.05)" },
          "100%": { transform: "translate(-20px, 15px) scale(0.98)" },
        },
        auraPulse: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.75" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
