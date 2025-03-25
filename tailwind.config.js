/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				crimson: ["Crimson Pro", "serif"],
			},
			colors: {
				primary: "#723520",
				secondary: "#8c3d22",
				background: "#faf9f6",
				border: "#eae6e0",
			},
			borderRadius: {
				lg: "0.5rem",
				xl: "1rem",
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgba(114, 53, 32, 0.05)",
				DEFAULT:
					"0 1px 3px 0 rgba(114, 53, 32, 0.1), 0 1px 2px 0 rgba(114, 53, 32, 0.06)",
				md: "0 4px 6px -1px rgba(114, 53, 32, 0.1), 0 2px 4px -1px rgba(114, 53, 32, 0.06)",
				lg: "0 10px 15px -3px rgba(114, 53, 32, 0.1), 0 4px 6px -2px rgba(114, 53, 32, 0.05)",
				xl: "0 20px 25px -5px rgba(114, 53, 32, 0.1), 0 10px 10px -5px rgba(114, 53, 32, 0.04)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
