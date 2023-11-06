import { stagger } from "motion";
import { observerAnimation, scrollDownAnimate } from "./animations";
import { $, $$ } from "./selector";

const heading1 = $("h1");
const heading1Elements = $$("[data-animate='from-bottom']");
const heroSection = document.getElementById("hero");
const scroll = $("[data-animate='after']");

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
	duration: 0.5,
	delay: stagger(0.15),
	easing: "ease-in-out",
});
