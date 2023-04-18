import { animate } from "motion";
import { $ } from "./selector";

document.addEventListener("DOMContentLoaded", () => {
	const marketingLink = document.getElementById("marketing-link");
	const designLink = document.getElementById("design-link");
	const devLink = document.getElementById("dev-link");

	const links = [marketingLink, designLink, devLink];

	const grid = $(".hero-grid");
	const elements = grid.childNodes;
	const link = grid.nextElementSibling;

	animate(link, { opacity: [0, 1] }, { duration: 0.4 });
	elements.forEach((el, index) => {
		animate(
			// @ts-ignore
			el,
			{ scale: [0, 1] },
			{ duration: 0.25, delay: 0.25 + 0.05 * index },
		);
	});

	setTimeout(() => {
		grid.classList.add("bg-neutral-100");
		grid.classList.remove("relative");
		grid.removeChild(grid.firstChild);
	}, 450);

	links.forEach((el) => {
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const parent = this.parentElement;
			const t = parent.offsetTop;
			const l = parent.offsetLeft;
			const b = window.innerHeight - (parent.offsetHeight + t);
			const r = window.innerWidth - (parent.offsetWidth + l);

			parent.style.top = `${t}px`;
			parent.style.right = `${r}px`;
			parent.style.bottom = `${b}px`;
			parent.style.left = `${l}px`;

			parent.style.position = "fixed";
			parent.style.zIndex = "200";

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
			animate(
				// @ts-ignore
				this.children,
				{
					opacity: [1, 0],
				},
				{ duration: 0.25, delay: 0.25, easing: "ease-in-out" },
			);

			setTimeout(() => {
				// @ts-ignore
				window.location.href = this.href;
			}, 500);
		});
	});
});
