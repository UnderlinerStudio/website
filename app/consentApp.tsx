import { createSignal, onMount, Show } from "solid-js";
import { useCookieContext } from "@s-src/context/cookieProvider";
import { CookieBanner } from "@s-src/CookieBanner";
import { CookieDialog } from "@s-src/CookieDialog";
import { consentData } from "@s-src/data/consent";
import { getCookie, setConsentCookies } from "@s-src/utils/Cookies";

type Data = typeof consentData;
export type LangData = Data["cs"];

export const ConsentApp = () => {
	const html = document.querySelector("html");
	const cookieBtn = document.getElementById("cookie-f-button");
	let lang = "cs";
	if (html) lang = html.lang;

	//@ts-ignore
	const langContent: LangData = consentData[lang];

	const consetCookie = getCookie("u_consent") || null;
	let decodedCookie = {
		analytics_storage: false,
		ad_storage: false,
	};
	if (consetCookie) decodedCookie = JSON.parse(consetCookie);

	// @ts-ignore
	gtag("consent", "update", {
		ad_storage: decodedCookie.analytics_storage ? "granted" : "denied",
		analytics_storage: decodedCookie.ad_storage ? "granted" : "denied",
	});
	const consent = useCookieContext();

	consent.setState({
		analytics_storage: decodedCookie.analytics_storage,
		ad_storage: decodedCookie.ad_storage,
	});

	const [consentDialog, setConsentDialog] = createSignal(false);

	if (consetCookie) consent.setConsentFIlled(true);

	const updateConset = (analyticsStorage: boolean, adStorage: boolean) => {
		consent.setState({
			analytics_storage: analyticsStorage,
			ad_storage: true,
		});
		setConsentCookies(analyticsStorage, true);
		consent.setConsentFIlled(true);
		setConsentDialog(false);
	};

	const openDialog = () => {
		setConsentDialog(true);
	};

	onMount(() => {
		if (cookieBtn)
			cookieBtn.addEventListener("click", () => {
				setConsentDialog(true);
			});
	});
	return (
		<Show when={!consent.consetFilled() || consentDialog()}>
			<div class="fixed bottom-4 left-1 right-1 z-50 max-h-[80vh] max-w-[600px] overflow-hidden border border-neutral-600 bg-neutral-800 sm:left-auto sm:right-5">
				<div
					class={`${
						consent.consetFilled() || consentDialog() ? "hidden" : "flex"
					} flex-col p-3 sm:right-4 sm:flex-row sm:items-center`}
				>
					<CookieBanner
						content={langContent.cookieBanner}
						setConsent={updateConset}
						openDialog={openDialog}
					/>
				</div>
				<div
					class={`${
						consentDialog() ? "flex flex-col" : "hidden"
					} h-full sm:right-4`}
				>
					<CookieDialog
						content={langContent.cookieDialog}
						setConsent={updateConset}
					/>
				</div>
			</div>
		</Show>
	);
};
