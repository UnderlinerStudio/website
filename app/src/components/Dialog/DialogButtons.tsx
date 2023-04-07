import { useCookieContext } from "@s-src/context/cookieProvider";
import { ButtonFilled, ButtonOutlined } from "@s-src/components/Buttons";

export const DialogButtons = ({ setConsent }: any) => {
	const { state } = useCookieContext();
	return (
		<div class="grid grid-cols-3 gap-2 px-3 pb-3 pt-5 sm:gap-4">
			<ButtonFilled
				onClick={() => {
					setConsent(true, true);
				}}
			>
				Přijmout vše
			</ButtonFilled>
			<ButtonOutlined
				onClick={() => {
					setConsent(state().analytics_storage, state().ad_storage);
				}}
			>
				Potvrdit
			</ButtonOutlined>
			<ButtonOutlined
				onClick={() => {
					setConsent(false, false);
				}}
			>
				Odmítnout
			</ButtonOutlined>
		</div>
	);
};
