import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			serif: ["var(--font-serif)", "serif"],
			sans: ["var(--font-sans)", "sans-serif"],
			mono: ["var(--font-mono)", "monospace"],
		},
  		colors: {
			"orange-peel": {
				50: "var(--color-orange-peel-50)",
				100: "var(--color-orange-peel-100)",
				200: "var(--color-orange-peel-200)",
				300: "var(--color-orange-peel-300)",
				400: "var(--color-orange-peel-400)",
				500: "var(--color-orange-peel-500)",
				600: "var(--color-orange-peel-600)",
				700: "var(--color-orange-peel-700)",
				800: "var(--color-orange-peel-800)",
				900: "var(--color-orange-peel-900)",
				950: "var(--color-orange-peel-950)",
			},
			shark: {
				50: "var(--color-shark-50)",
				100: "var(--color-shark-100)",
				200: "var(--color-shark-200)",
				300: "var(--color-shark-300)",
				400: "var(--color-shark-400)",
				500: "var(--color-shark-500)",
				600: "var(--color-shark-600)",
				700: "var(--color-shark-700)",
				800: "var(--color-shark-800)",
				900: "var(--color-shark-900)",
			},

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
