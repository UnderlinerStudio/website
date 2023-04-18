module.exports = {
	content: ["./hugo/**/*.{html,md,svg,tsx,ts}", "./app/**/*.{tsx,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				sunset: "#DF625A",
				ronchi: "#EBC350",
				tealblue: "#05416C",
			},
			zIndex: {
				"-10": "-10",
				"-1": "-1",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
