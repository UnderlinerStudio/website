import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { readdir, copyFile, mkdir } from "fs/promises";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	root: "app",
	resolve: {
		alias: {
			"@s": path.resolve(__dirname, "./app"),
			"@s-src": path.resolve(__dirname, "./app/src"),
		},
	},
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	plugins: [solidPlugin(), syncToHugo()],
});

function syncToHugo() {
	return {
		name: "sync-to-hugo",
		closeBundle: async () => {
			const assetsJsDir = "./app/dist/assets";
			const assets = await readdir(assetsJsDir);
			const js = assets.filter((name) => name.match(/(index*.).*\w+/))[0];
			try {
				await mkdir("./hugo/assets/js/CookieBanner", { recursive: true });
			} catch {}

			await copyFile(
				`./app/dist/assets/${js}`,
				"./hugo/assets/js/CookieBanner/index.js",
			);
			console.log(`wrote ${js} to hugo static`);
		},
	};
}
