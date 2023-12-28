import { render } from "solid-js/web";
import { CookieProvider } from "@s-src/context/cookieProvider";
import { ConsentApp } from "./consentApp";

const root = document.getElementById("cookie-consent");

render(() => {
	return (
		<CookieProvider>
			<ConsentApp />
		</CookieProvider>
	);
}, root!);
