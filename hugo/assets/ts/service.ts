import { scrollDownAnimate } from "./animations";
import { $ } from "./selector";

document.addEventListener("DOMContentLoaded", () => {
	const header = $("[data-theme='dark']");
	const heroSection = document.getElementById("hero");
	const scroll = $("[data-animate='after']");

	scrollDownAnimate(scroll, heroSection);

	const bgContainer = $("[data-animate='color-switch']");
	const bgContainerClass = bgContainer.className
		.split(" ")
		.filter((cssClass) => cssClass.startsWith("bg-"))[0];

	const observerOptions: IntersectionObserverInit = {
		rootMargin: "",
		threshold: 0.9,
	};

	const observerCallback: IntersectionObserverCallback = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver,
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (!bgContainer.classList.contains(bgContainerClass)) {
					bgContainer.classList.add(bgContainerClass, "dark");
					if (header) header.classList.add("dark");
				}
			} else {
				bgContainer.classList.remove(bgContainerClass, "dark");

				if (header) header.classList.remove("dark");
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);
	observer.observe(heroSection);
});
