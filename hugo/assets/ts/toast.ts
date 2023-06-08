import { animate, timeline } from "motion";

type ToastType = "success" | "error" | null | undefined;

export const Toast = (text: string, time: number, type: ToastType) => {
	let toast = createToast(text, type);
	addToast(toast);

	const animationDuration = 0.15;
	const animationDelay = time / 1000 - animationDuration;
	timeline(
		[
			[
				toast,
				{
					opacity: [0, 1],
				},
				{ duration: animationDuration, easing: "ease-in-out" },
			],
			[
				toast,
				{ opacity: [1, 0] },
				{
					duration: animationDuration,
					easing: "ease-in-out",
					delay: animationDelay,
				},
			],
		],
		{ duration: time / 1000 },
	);
	setTimeout(async () => {
		Toaster.removeChild(toast);
	}, time);
};

const createToast = (text: string, type: ToastType): HTMLOutputElement => {
	const node = document.createElement("output");
	if (type) {
		const toastStatus = resolveStatus(type);
		node.appendChild(toastStatus);
	}

	const textSpan = document.createElement("span");
	textSpan.innerText = text;
	node.appendChild(textSpan);
	node.classList.add(
		"bg-neutral-700",
		"px-4",
		"py-2",
		"text-sm",
		"text-neutral-200",
		"flex",
		"items-center",
	);
	node.setAttribute("role", "status");

	return node;
};

const addToast = (toast: HTMLOutputElement) => {
	flipToast(toast);
};

const flipToast = (toast: HTMLOutputElement) => {
	Toaster.appendChild(toast);
	animate(
		toast,
		{
			opacity: [0, 1],
		},
		{ duration: 0.15, easing: "ease-in-out" },
	);
};

const init = (): HTMLDivElement => {
	const node = document.createElement("div");

	node.id = "toaster";
	node.classList.add(
		"z-[200]",
		"font-bold",
		"fixed",
		"right-4",
		"top-[5vh]",
		"grid",
		"justify-center",
		"justify-items-center",
		"gap-[1vh]",
	);

	document.body.appendChild(node);
	return node;
};

const resolveStatus = (type: ToastType): HTMLSpanElement => {
	const node = document.createElement("span");
	node.classList.add(
		"h-4",
		"w-4",
		"p-[2px]",
		"mr-1",
		"inline-block",
		"rounded-full",
	);
	if (type === "success") {
		node.classList.add("bg-green-600", "fill-neutral-100");
		node.innerHTML = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.9 142.5l-23.2 22L181 395.3l-22 20.8-22-20.8L23.2 287.6 0 265.6l44-46.5 23.2 22L159 328 380.7 118l23.2-22 44 46.5z" /></svg>`;
	} else if (type === "error") {
		node.classList.add("bg-red-500", "fill-neutral-100");
		node.innerHTML = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M326.6 166.6L349.3 144 304 98.7l-22.6 22.6L192 210.7l-89.4-89.4L80 98.7 34.7 144l22.6 22.6L146.7 256 57.4 345.4 34.7 368 80 413.3l22.6-22.6L192 301.3l89.4 89.4L304 413.3 349.3 368l-22.6-22.6L237.3 256l89.4-89.4z"/></svg>`;
	}

	return node;
};

const Toaster = init();
