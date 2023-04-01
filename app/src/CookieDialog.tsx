import { createSignal } from "solid-js";
import { DialogButtons } from "@s-src/components/Dialog/DialogButtons";
import { Slide } from "@s-src/components/Dialog/Slide";

import { SlideRouter } from "@s-src/components/Dialog/SlideRouter";

export type SlideType = "detail" | "about" | "consent";

export const CookieDialog = ({ content, setConsent }: any) => {
	const [activeSlide, setActiveSlide] = createSignal<SlideType>("detail");

	return (
		<div class="flex h-full max-h-[80vh] grid-rows-[max-content,minmax(0px,_auto),max-content] flex-col">
			<SlideRouter
				activeSlide={activeSlide}
				content={content}
				setActiveSlide={setActiveSlide}
			/>
			<Slide activeSlide={activeSlide} content={content} />
			<DialogButtons setConsent={setConsent} />
		</div>
	);
};
