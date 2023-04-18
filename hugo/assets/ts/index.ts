import { scrollToTop } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
	const scrollToTopButton = document.getElementById("scrolltotop");
	scrollToTopButton?.addEventListener("click", scrollToTop);
});
