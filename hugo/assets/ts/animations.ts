import { animate } from "motion";

export const homeGridReveal = (
	grid: HTMLElement,
	aboutLink: HTMLElement,
	elements: NodeListOf<ChildNode>,
) => {
	animate(aboutLink, { opacity: [0, 1] }, { duration: 0.5, delay: 0.5 });
	elements.forEach((el: HTMLElement, index) => {
		animate(
			el,
			{ scale: [0, 1] },
			{ duration: 0.25, delay: 0.25 + 0.05 * index },
		);
	});

	setTimeout(() => {
		grid.classList.add("bg-neutral-100");
		grid.classList.remove("relative");
		const gridFirstChild = grid.firstChild as HTMLElement;
		gridFirstChild.classList.add("hidden");
	}, 450);
};
