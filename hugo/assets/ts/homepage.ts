import { animate, stagger } from "motion";
import { $, $$ } from "./selector";
import {
	homeGridReveal,
	homeGridRevealReverse,
	observerAnimation,
	scrollDownAnimate,
} from "./animations";

document.addEventListener("DOMContentLoaded", () => {
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

	const pmLink = document.getElementById("pm-link");
	// [pmLink, ...links].forEach((el) => {
	// 	const elHref = el.getAttribute("href");

	// 	if (elHref) {
	// 		const head = document.head;
	// 		const preloadLink = document.createElement("link");
	// 		preloadLink.href = elHref;
	// 		preloadLink.rel = "prefetch";

	// 		head.appendChild(preloadLink);

	// 		el.addEventListener("click", function (e) {
	// 			e.preventDefault();
	// 			const parent = this.parentElement;
	// 			const href = this.getAttribute("href");

	// 			const { x, y, bottom, right } = parent.getBoundingClientRect();

	// 			const t = y;
	// 			const r = window.innerWidth - right;
	// 			const b = window.innerHeight - bottom;
	// 			const l = x;

	// 			parent.style.inset = `${t}px ${r}px ${b}px ${l}px`;

	// 			parent.style.position = "fixed";
	// 			parent.style.zIndex = "45";

	// 			animate(
	// 				parent,
	// 				{
	// 					left: 0,
	// 					right: 0,
	// 					top: 0,
	// 					bottom: 0,
	// 				},
	// 				{ duration: 0.25, easing: "ease-in-out" },
	// 			);

	// 			setTimeout(() => {
	// 				location.href = href;
	// 			}, 300);
	// 		});
	// 	}
	// });

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
});
