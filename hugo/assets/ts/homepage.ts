import { animate } from "motion";
import { $ } from "./selector";
import { homeGridReveal } from "./animations";

document.addEventListener("DOMContentLoaded", () => {
	const marketingLink = document.getElementById("marketing-link");
	const designLink = document.getElementById("design-link");
	const devLink = document.getElementById("dev-link");

	const links = [marketingLink, designLink, devLink];

	const grid = $(".hero-grid");
	const elements = grid.childNodes;
	const aboutLink = grid.nextElementSibling as HTMLElement;

	homeGridReveal(grid, aboutLink, elements);

	links.forEach((el) => {
		el.parentElement.style.inset = "auto";
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const parent = this.parentElement;
			const href = this.getAttribute("href");

			const t = parent.offsetTop;
			const l = parent.offsetLeft;
			const b = window.innerHeight - (parent.offsetHeight + t);
			const r = window.innerWidth - (parent.offsetWidth + l);

			parent.style.inset = `${t}px ${r}px ${b}px ${l}px`;

			parent.style.position = "fixed";
			parent.style.zIndex = "40";

			animate(
				parent,
				{
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				},
				{ duration: 0.25, easing: "ease-in-out" },
			);

			setTimeout(() => {
				location.href = href;
			}, 300);
		});
	});

	window.addEventListener("pageshow", (e) => onHomepageLoad(e, links, grid));
});

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

		grid.classList.remove("bg-neutral-100");
		grid.classList.add("relative");
		(grid.firstChild as HTMLElement).classList.remove("hidden");

		homeGridReveal(grid, aboutLink, elements);
	}
}
