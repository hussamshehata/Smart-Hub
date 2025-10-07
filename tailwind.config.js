/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    '50': '#eef8ff',
                    '100': '#d8f0ff',
                    '200': '#bfe6ff',
                    '300': '#99d8ff',
                    '400': '#6fc8ff',
                    '500': '#1E90FF',
                    '600': '#187bd6',
                    '700': '#0f5e9f',
                    '800': '#0a3d66',
                    '900': '#041b30',
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    '500': '#FF5722',
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                neutral: {
                    '50': '#F9FAFB',
                    '100': '#F3F4F6',
                    '300': '#D1D5DB',
                    '500': '#6B7280',
                    '700': '#374151',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
                heading: ["Poppins", "sans-serif"],
            },
            spacing: {
                '1': '4px',
                '2': '8px',
                '3': '12px',
                '4': '16px',
                '5': '20px',
                '6': '24px',
            },
            borderRadius: {
                sm: 'calc(var(--radius) - 4px)',
                md: 'calc(var(--radius) - 2px)',
                lg: 'var(--radius)',
            },
            boxShadow: {
                sm: '0 2px 6px rgba(16,24,40,0.06)',
                md: '0 8px 30px rgba(16,24,40,0.08)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
