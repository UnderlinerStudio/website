import { animate } from "motion";
import { $ } from "./selector";

const header = $("[data-theme='dark']");
const heroSection = document.getElementById("hero");

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

colorObserver.observe(heroSection);
