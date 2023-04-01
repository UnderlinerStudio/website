import { SlideType } from "@s-src/CookieDialog";
import { Accessor, JSX, Setter } from "solid-js";

type SlideButtonProps = {
	activeSlide: Accessor<SlideType>;
	setActiveSlide: Setter<SlideType>;
	key: SlideType;
	children: JSX.Element | JSX.Element[];
};
export const SlideButton = ({
	activeSlide,
	setActiveSlide,
	key,
	children,
}: SlideButtonProps) => {
	return (
		<button
			class={`p-2 text-neutral-100 decoration-red-500 ${
				activeSlide() === key
					? "border-b-2 border-neutral-200 font-bold"
					: "hover:underline"
			}`}
			onClick={() => {
				setActiveSlide(key);
			}}
		>
			{children}
		</button>
	);
};
