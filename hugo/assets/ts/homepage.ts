import { stagger } from "motion";
import { $, $$ } from "./selector";
import {
	homeGridReveal,
	homeGridRevealReverse,
	observerAnimation,
	scrollDownAnimate,
} from "./animations";

const heroSection = document.getElementById("hero");
const scroll = $("[data-animate='after']");
const marketingLink = document.getElementById("marketing-link");
const designLink = document.getElementById("design-link");
const devLink = document.getElementById("dev-link");

const heading1Elements = $$("[data-animate='from-bottom']");
const heading1 = $("h1");

const links = [marketingLink, designLink, devLink];

const grid = $(".hero-grid");
const elements = grid.childNodes;
const aboutLink = grid.nextElementSibling as HTMLElement;
homeGridReveal(aboutLink, elements);
scrollDownAnimate(scroll, heroSection);

const heading1ObserverOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.7,
};

observerAnimation({
	boundingElement: heading1,
	targetElement: heading1Elements,
}).fromDown({
	observerOptions: heading1ObserverOptions,
	duration: 0.3,
	delay: stagger(0.1),
	easing: "ease-in-out",
});

const fadeInElements = $("[data-animate='fade-in']");

observerAnimation({
	boundingElement: fadeInElements,
	targetElement: fadeInElements,
}).fadeIn({ duration: 0.3, delay: 0.2, easing: "ease-in-out" });

const observerOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.6,
};

const observerCallback: IntersectionObserverCallback = (
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver,
) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			homeGridReveal(aboutLink, elements);
		} else {
			homeGridRevealReverse(aboutLink, elements);
		}
	});
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(heroSection);

window.addEventListener("pageshow", (e) => onHomepageLoad(e, links, grid));

function onHomepageLoad(
	e: PageTransitionEvent,
	links: HTMLElement[],
	grid: HTMLElement,
) {
	const historyTraversal = e.persisted;
	if (historyTraversal) {
		const elements = grid.childNodes;
		const aboutLink = grid.nextElementSibling as HTMLElement;

		links.forEach((el) => {
			const parent = el.parentElement;
			parent.removeAttribute("style");
			el.firstElementChild.removeAttribute("style");
		});

		homeGridReveal(aboutLink, elements);
	}
}
