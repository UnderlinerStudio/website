/** @type {import('tailwindcss').Config} */
export default {
	content: ["./hugo/**/*.{html,md,svg,tsx,ts}", "./app/**/*.{tsx,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				sunset: {
					DEFAULT: "#DF625A",
					dark: "#FF5751",
				},
				ronchi: {
					DEFAULT: "#EBC350",
				},
				tealblue: {
					DEFAULT: "#05416C",
				},
			},
			height: {
				screen: ["100vh", "100dvh"],
			},
			zIndex: {
				"-10": "-10",
				"-1": "-1",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
