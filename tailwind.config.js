/** @type {import('tailwindcss').Config} */
export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx,html}",
        ],
        theme: {
            extend: {
                colors: {
                    // Use a scale so you can do hover:bg-primary-600 etc.
                    primary: {
                        50:  "#eef8ff",
                        100: "#d8f0ff",
                        200: "#bfe6ff",
                        300: "#99d8ff",
                        400: "#6fc8ff",
                        500: "#1E90FF", // your main brand color
                        600: "#187bd6",
                        700: "#0f5e9f",
                        800: "#0a3d66",
                        900: "#041b30",
                    },
                    secondary: {
                        500: "#FF5722",
                    },
                    neutral: {
                        50:  "#F9FAFB",
                        100: "#F3F4F6",
                        300: "#D1D5DB",
                        500: "#6B7280",
                        700: "#374151",
                    },
                },
                fontFamily: {
                    sans: ["Inter", "sans-serif"],
                    heading: ["Poppins", "sans-serif"],
                },
                spacing: { // custom spacing scale (optional)
                    1: "4px",
                    2: "8px",
                    3: "12px",
                    4: "16px",
                    5: "20px",
                    6: "24px",
                },
                borderRadius: {
                    sm: "6px",
                    md: "10px",
                    lg: "14px",
                },
                boxShadow: {
                    sm: "0 2px 6px rgba(16,24,40,0.06)",
                    md: "0 8px 30px rgba(16,24,40,0.08)",
                },
            },
        },
        plugins: [],
    }
