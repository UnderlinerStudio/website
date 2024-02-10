import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { readdir, copyFile, mkdir, unlink } from "fs/promises";
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
		rollupOptions: {
			input: {
				cookieBanner: "app/index.html",
				toaster: "app/toast.html",
			},
		},
	},
	plugins: [solidPlugin(), syncToHugo()],
});

function syncToHugo() {
	return {
		name: "sync-to-hugo",
		closeBundle: async () => {
			const assetsJsDir = "./app/dist/assets";
			const hugoSolidDir = "./hugo/assets/js/solid";
			const assets = await readdir(assetsJsDir);
			const hugoAssets = await readdir(hugoSolidDir);
			const originWeb = assets.filter((name) => name.match(/(web*.).*\w+/))[0];
			const hugoWeb = hugoAssets.filter((name) =>
				name.match(/(web*.).*\w+/),
			)[0];

			if (hugoWeb && originWeb !== hugoWeb) {
				await unlink(`./hugo/assets/js/solid/${hugoWeb}`).catch((e) =>
					console.log(e),
				);
			}
			try {
				await mkdir("./hugo/assets/js/solid", { recursive: true });
			} catch {}
			assets.forEach(async (asset) => {
				const assetName = asset.split("-")[0];
				if (assetName !== "web") {
					await copyFile(
						`./app/dist/assets/${asset}`,
						`./hugo/assets/js/solid/${assetName}.js`,
					);
				} else {
					await copyFile(
						`./app/dist/assets/${asset}`,
						`./hugo/assets/js/solid/${asset}`,
					);
				}
			});

			console.log(`wrote ${assets} to hugo static`);
		},
	};
}
