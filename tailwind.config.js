module.exports = {
	content: ["./hugo/**/*.{html,md,svg,tsx,ts}", "./app/**/*.{tsx,ts}"],
	theme: {
		extend: {
			colors: {
				sunset: {
					// primary
					400: "#ff5751",
				},
			},
			zIndex: {
				"-10": "-10",
				"-1": "-1",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
