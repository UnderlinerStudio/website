import { LangData } from "@s/app";
import { SlideType } from "@s-src/CookieDialog";
import { Accessor, Setter } from "solid-js";
import { SlideButton } from "@s-src/components/Buttons";

type SlideRouter = {
	setActiveSlide: Setter<SlideType>;
	activeSlide: Accessor<SlideType>;
	content: LangData["cookieDialog"];
};

export const SlideRouter = ({
	setActiveSlide,
	activeSlide,
	content,
}: SlideRouter) => {
	return (
		<div class="grid grid-cols-3 gap-4 px-3">
			<SlideButton
				activeSlide={activeSlide}
				setActiveSlide={setActiveSlide}
				key={"consent"}
			>
				{content.consent.key}
			</SlideButton>
			<SlideButton
				activeSlide={activeSlide}
				setActiveSlide={setActiveSlide}
				key={"detail"}
			>
				{content.consent.key}
			</SlideButton>
			<SlideButton
				activeSlide={activeSlide}
				setActiveSlide={setActiveSlide}
				key={"about"}
			>
				{content.consent.key}
			</SlideButton>
		</div>
	);
};
