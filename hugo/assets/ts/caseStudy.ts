import { animate } from "motion";
import { $ } from "./selector";

const header = $("[data-theme='dark']");
const heroSection = document.getElementById("hero");
const stickyName = document.getElementById("name").querySelector("span");
const h1 = $("h1");

const bgContainer = $("[data-animate='color-switch']");
const bgContainerClass = bgContainer.className
	.split(" ")
	.filter((cssClass) => cssClass.startsWith("bg-"))[0];

const bgColorObserverOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.9,
};
const bgColorObserverCallback: IntersectionObserverCallback = (
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver,
) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			if (!bgContainer.classList.contains(bgContainerClass)) {
				if (header) {
					bgContainer.classList.add(bgContainerClass, "dark");
					header.classList.add("dark");
				} else {
					bgContainer.classList.add(bgContainerClass);
				}
			}
		} else {
			if (header) {
				bgContainer.classList.remove(bgContainerClass, "dark");
				header.classList.remove("dark");
			} else {
				bgContainer.classList.remove(bgContainerClass);
			}
		}
	});
};
const colorObserver = new IntersectionObserver(
	bgColorObserverCallback,
	bgColorObserverOptions,
);

const stickyNameObserverOptions: IntersectionObserverInit = {
	rootMargin: "",
	threshold: 0.2,
};
const stickyNameObserverCallback: IntersectionObserverCallback = (
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver,
) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			animate(
				stickyName,
				{
					y: "-100%",
				},
				{ duration: 0.2 },
			);
		} else {
			animate(
				stickyName,
				{
					y: 0,
				},
				{ duration: 0.3 },
			);
		}
	});
};
const stickyNameObserver = new IntersectionObserver(
	stickyNameObserverCallback,
	stickyNameObserverOptions,
);

colorObserver.observe(heroSection);
stickyNameObserver.observe(h1);
