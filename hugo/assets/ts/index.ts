import { animate, stagger } from "motion";
import { copyContent, scrollToTop } from "./utils";

const scrollToTopButton = document.getElementById("scrolltotop");
scrollToTopButton?.addEventListener("click", scrollToTop);

const dropdownEmail = document.getElementById("dropdown-email");
if (dropdownEmail)
	dropdownEmail.addEventListener("click", (e: MouseEvent) => {
		copyContent(e);
		const target = e.target as HTMLElement;
	});

const hamburger = document.getElementById("hamburger");
const dropdown = document.getElementById("dropdown");
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
	dropdown.style.height = hambToggled ? "100dvh" : "0";

	//@ts-ignore
	dropdown.querySelector("[data-animate='dropdown-nav']").style.visibility =
		hambToggled ? "visible" : "hidden";

	// background
	animate(
		dropdown.querySelector("[data-animate='dropdown-top-bg']"),
		hambToggled ? { height: [0, "100dvh"] } : { height: ["100dvh", 0] },
		{ duration: 0.4, easing: "ease-in-out", delay: 0.05 },
	);
	animate(
		dropdown.querySelector("[data-animate='dropdown-bot-bg']"),
		hambToggled ? { height: [0, "100dvh"] } : { height: ["100svh", 0] },
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
