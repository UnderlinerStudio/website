export const scrollToTop = () => {
	window.scrollTo({ top: 0 });
};

export const copyContent = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	navigator.clipboard.writeText(target.innerHTML);
};
