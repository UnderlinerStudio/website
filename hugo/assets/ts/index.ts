import { animate, stagger } from "motion";
import { copyContent, scrollToTop } from "./utils";
import { listen as quicklinkListen } from "quicklink";
import { $$ } from "./selector";

const scrollToTopButton = document.getElementById("scrolltotop");
scrollToTopButton?.addEventListener("click", scrollToTop);

const dropdownEmail = document.getElementById("dropdown-email");
if (dropdownEmail)
	dropdownEmail.addEventListener("click", (e: MouseEvent) => {
		copyContent(e);
		const target = e.target as HTMLElement;
		// @ts-ignore
		toast.success(target.dataset.toast);
	});

const hamburger = document.getElementById("hamburger");
const dropdown = document.getElementById("dropdown");
const logohome = document.getElementById("logohome");

const focusableElements = $$(
	'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
);

const dropdownLinks = dropdown.querySelectorAll(
	"[data-animate='dropdown-link']",
);
const dropdownSocial = dropdown.querySelectorAll(
	"[data-animate='dropdown-social']",
);
let hambToggled = false;
hamburger?.addEventListener("click", (e: MouseEvent) => {
	hamburger.querySelector(".hamburger").classList.toggle("toggled");
	document.body.classList.toggle("overflow-hidden");

	hambToggled = !hambToggled;
	dropdown.classList.toggle("hidden");
	dropdown.style.height = hambToggled ? "100dvh" : "0";

	focusableElements.forEach((el) => {
		if (!dropdown.contains(el) && el !== hamburger && el !== logohome)
			el.tabIndex = hambToggled ? -1 : 0;
	});

	//@ts-ignore
	dropdown.querySelector("[data-animate='dropdown-nav']").style.visibility =
		hambToggled ? "visible" : "hidden";

	// background
	animate(
		dropdown.querySelector("[data-animate='dropdown-top-bg']"),
		hambToggled ? { height: [0, "100vh"] } : { height: ["100vh", 0] },
		{ duration: 0.4, easing: "ease-in-out", delay: 0.05 },
	);
	animate(
		dropdown.querySelector("[data-animate='dropdown-bot-bg']"),
		hambToggled ? { height: [0, "100vh"] } : { height: ["100vh", 0] },
		{ duration: 0.4, easing: "ease-in-out" },
	);

	// dropdown links
	animate(
		dropdownLinks,
		{ y: ["100%", "0"] },
		{ duration: 0.55, easing: "ease-in-out", delay: stagger(0.05) },
	);
	animate(
		dropdownSocial,
		{ y: ["100%", "0"] },
		{
			duration: 0.5,
			easing: "ease-in-out",
			delay: stagger(0.05),
		},
	);
	animate(
		dropdown.querySelectorAll("[data-animate='dropdown-mail']"),
		{ y: ["100%", "0"] },
		{ duration: 0.5, easing: "ease-in-out", delay: 0.4 },
	);
});

document.addEventListener("DOMContentLoaded", () => {
	quicklinkListen({
		ignores: [(uri) => uri.includes("#"), (uri) => uri.includes("/blog/")],
	});
});
