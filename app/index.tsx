import { render } from "solid-js/web";
import { CookieProvider } from "@s-src/context/cookieProvider";
import { App } from "@s/app";

const root = document.getElementById("cookie-consent");

render(() => {
	return (
		<CookieProvider>
			<App />
		</CookieProvider>
	);
}, root!);
