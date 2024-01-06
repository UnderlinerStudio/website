import { animate } from "motion";
import { $$ } from "./selector";

const faqButtons = $$("button[aria-controls]");

faqButtons.forEach((button) => {
	const answer = button.nextSibling as HTMLElement;
	button.addEventListener("click", (e) => {
		const answerHeight = answer.querySelector("p").clientHeight + 8 + "px";
		const isExpanded = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", String(!isExpanded));
		button.classList.toggle("faq--toggled");

		if (isExpanded) {
			animate(answer, { height: 0 }, { duration: 0.25 });
		} else {
			animate(answer, { height: answerHeight }, { duration: 0.25 });
		}
	});
});
