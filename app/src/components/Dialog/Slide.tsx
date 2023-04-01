import { LangData } from "app/app";
import { Accessor, Match, Switch } from "solid-js";
import { About } from "@s-src/components/Dialog/Routes/about";
import { Consent } from "@s-src/components/Dialog/Routes/consent";
import { Detail } from "@s-src/components/Dialog/Routes/Detail";

type SlideProps = {
	activeSlide: Accessor<string>;
	content: LangData["cookieDialog"];
};

export const Slide = ({ activeSlide, content }: SlideProps) => {
	return (
		<div class="custom-scroll mr-1 flex max-w-xl overflow-auto px-3 pt-5 text-neutral-200">
			<Switch>
				<Match when={activeSlide() === "about"}>
					<About content={content.about} />
				</Match>
				<Match when={activeSlide() === "detail"}>
					<Detail content={content.details} />
				</Match>
				<Match when={activeSlide() === "consent"}>
					<Consent content={content.consent} />
				</Match>
			</Switch>
		</div>
	);
};
