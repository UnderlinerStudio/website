import { animate, stagger, timeline } from "motion";
import { $, $$ } from "./selector";
import { scrollDownAnimate } from "./animations";

const h1 = $$("h1>span");
const scroll = $("[data-animate='after']");
const heroSection = $("#hero");

scrollDownAnimate(scroll, heroSection);

timeline([
	[
		h1,
		{
			opacity: [0, 1],
		},
		{ duration: 0.01, delay: stagger(0.1) },
	],
	[
		h1,
		{
			opacity: [1, 0],
		},
		{ duration: 0.01, delay: stagger(0.1) },
	],
	[
		h1[1],
		{
			opacity: 1,
		},
		{ duration: 0.01, delay: 0.2 },
	],
]);
