import { stagger } from "motion";
import { $, $$ } from "./selector";
import {
	homeGridReveal,
	observerAnimation,
	scrollDownAnimate,
} from "./animations";

const heroSection = document.getElementById("hero");
const scroll = $("[data-animate='after']");

const heading2 = $("[data-animate='h2-from-bottom'");
const heading2Elements = heading2.querySelectorAll(
	"[data-animate='from-bottom']",
) as NodeListOf<HTMLElement>;

const grid = $(".hero-grid");
const elements = grid.childNodes;
homeGridReveal(elements);
scrollDownAnimate(scroll, heroSection);

const heading1ObserverOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.7,
};

observerAnimation({
	boundingElement: heading2,
	targetElement: heading2Elements,
}).fromDown({
	observerOptions: heading1ObserverOptions,
	duration: 0.5,
	delay: stagger(0.15),
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
