/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,js,ts,tsx,jsx}",
		"../../packages/ui/src/**/*.{html,js,ts,tsx,jsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("tailwindcss-animated")],
};
