import {
	Easing,
	EasingFunction,
	EasingGenerator,
	OptionResolver,
	animate,
	stagger,
} from "motion";

export const homeGridReveal = (
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
};

export const homeGridRevealReverse = (
	aboutLink: HTMLElement,
	elements: NodeListOf<ChildNode>,
) => {
	const arrElements = Array.from(elements).reverse();

	animate(aboutLink, { opacity: [1, 0] }, { duration: 0.5 });
	arrElements.forEach((el: HTMLElement, index) => {
		animate(
			el,
			{ scale: [1, 0] },
			{ duration: 0.25, delay: 0.25 + 0.05 * index },
		);
	});
};

export const scrollDownAnimate = (
	element: HTMLElement,
	section: HTMLElement,
) => {
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
				animate(
					element,
					{
						y: 0,
					},
					{ duration: 0.3, delay: 0.9 },
				);
			} else {
				animate(
					element,
					{
						y: "100%",
					},
					{ duration: 0.5 },
				);
			}
		});
	};
	const observer = new IntersectionObserver(observerCallback, observerOptions);
	observer.observe(section);
};

type ObserverAnimationType = {
	boundingElement: HTMLElement;
	targetElement: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;
};
type ObserverAnimationProps = {
	duration: number;
	delay?: number | OptionResolver<number>;
	easing: Easing | Easing[] | EasingGenerator | EasingFunction;
	observerOptions?: IntersectionObserverInit;
};
export const observerAnimation = ({
	boundingElement,
	targetElement,
}: ObserverAnimationType) => {
	const defaultObserverOptions: IntersectionObserverInit = {
		rootMargin: "",
		threshold: 0.6,
	};

	const fadeIn = ({
		duration,
		delay = 0,
		easing,
		observerOptions = defaultObserverOptions,
	}: ObserverAnimationProps) => {
		const observerCallback: IntersectionObserverCallback = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animate(
						targetElement,
						{
							opacity: [0, 1],
						},
						{ duration: duration, delay: delay, easing: easing },
					);
					observer.unobserve(boundingElement);
				}
			});
		};
		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);
		observer.observe(boundingElement);
	};
	const fromDown = ({
		duration,
		delay = 0,
		easing,
		observerOptions = defaultObserverOptions,
	}: ObserverAnimationProps) => {
		const observerCallback: IntersectionObserverCallback = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animate(
						targetElement,
						{
							y: 0,
						},
						{ duration: duration, delay: delay, easing: easing },
					);
					observer.unobserve(boundingElement);
				}
			});
		};
		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);
		observer.observe(boundingElement);
	};

	return {
		fadeIn,
		fromDown,
	};
};
