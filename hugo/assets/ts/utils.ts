export const scrollToTop = () => {
	window.scrollTo({ top: 0 });
};

export const coppyContent = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	navigator.clipboard.writeText(target.innerHTML);
};
