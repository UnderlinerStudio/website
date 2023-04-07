import { LangData } from "app/app";
import { CookieKindDetail } from "./CookieKindDetail";
import { useCookieContext } from "@s-src/context/cookieProvider";

export const Detail = ({
	content,
}: {
	content: LangData["cookieDialog"]["details"];
}) => {
	const consent = useCookieContext();

	return (
		<div class="min-h-auto">
			<div class="space-y-8 px-px">
				<CookieKindDetail
					heading={content.necesaryCookies.heading}
					text={content.necesaryCookies.text}
					switchProps={{ isDisabled: true, checked: true, onClick: () => {} }}
					cookiesDetailInfo={content.necesaryCookies.cookies}
				/>
				<CookieKindDetail
					heading={content.analyticsCookies.heading}
					text={content.analyticsCookies.text}
					switchProps={{
						isDisabled: false,
						checked: consent.state().analytics_storage,
						onClick: () =>
							consent.setState({
								ad_storage: consent.state().ad_storage,
								analytics_storage: !consent.state().analytics_storage,
							}),
					}}
					cookiesDetailInfo={content.analyticsCookies.cookies}
				/>
			</div>
		</div>
	);
};
