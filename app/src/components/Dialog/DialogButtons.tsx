import { useCookieContext } from "@s-src/context/cookieProvider";
import { ButtonFilled, ButtonOutlined } from "@s-src/components/Buttons";
import { LangData } from "app/app";

type DialogButtons = {
	setConsent: (analyticsStorage: boolean, adStorage: boolean) => void;
	content: LangData["cookieDialog"];
};

export const DialogButtons = ({ setConsent, content }: DialogButtons) => {
	const { state } = useCookieContext();
	return (
		<div class="grid grid-cols-3 gap-2 px-3 pb-3 pt-5 sm:gap-4">
			<ButtonFilled
				onClick={() => {
					setConsent(true, true);
				}}
			>
				{content.buttons.acceptAll}
			</ButtonFilled>
			<ButtonOutlined
				onClick={() => {
					setConsent(state().analytics_storage, state().ad_storage);
				}}
			>
				{content.buttons.confirmSelection}
			</ButtonOutlined>
			<ButtonOutlined
				onClick={() => {
					setConsent(false, false);
				}}
			>
				{content.buttons.deny}
			</ButtonOutlined>
		</div>
	);
};
