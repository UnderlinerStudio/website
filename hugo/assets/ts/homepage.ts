import { animate, stagger } from "motion";
import { $, $$ } from "./selector";
import {
	homeGridReveal,
	observerAnimation,
	scrollDownAnimate,
} from "./animations";

const heroSection = document.getElementById("hero-content");
const scroll = $("[data-animate='after']");

const heading2 = $("[data-animate='h2-from-bottom'");
const heading2Elements = heading2.querySelectorAll(
	"[data-animate='from-bottom']",
) as NodeListOf<HTMLElement>;

const heroAnimations = heroSection.querySelectorAll("[data-animate]");

if (heroAnimations)
	heroAnimations.forEach((entry) => {
		animate(
			entry,
			{
				opacity: [0, 1],
			},
			{ duration: 0.6, delay: 0.4, easing: "ease-in-out" },
		);
	});

const grid = $(".hero-grid");
const elements = grid.childNodes;
homeGridReveal(elements);
scrollDownAnimate(scroll, heroSection);

const heading2ObserverOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.7,
};

observerAnimation({
	boundingElement: heading2,
	targetElement: heading2Elements,
}).fromDown({
	observerOptions: heading2ObserverOptions,
	duration: 0.5,
	delay: stagger(0.15),
	easing: "ease-in-out",
});

const fadeInElements = $("[data-bounding]");

observerAnimation({
	boundingElement: fadeInElements,
	targetElement: fadeInElements,
}).fadeIn({ duration: 0.3, delay: 0.2, easing: "ease-in-out" });
