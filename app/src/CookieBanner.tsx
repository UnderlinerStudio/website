import { ButtonFilled } from "@s-src/components/Buttons";
import { ButtonOutlined } from "@s-src/components/Buttons";

export const CookieBanner = ({ content, setConsent, openDialog }: any) => {
	return (
		<>
			<div class="flex flex-1 items-center">
				<div class="mr-4 aspect-square h-8 fill-neutral-400">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M118 121.7L218.5 68c19 52.5 62.4 93.4 116.4 109.1c15.4 53.2 55.2 95.9 106.5 115.5L394 390.3l-104.7 56L172 429.7 86.6 346.8 66 229.1 118 121.7zM489.9 255.2c-61.5-6.7-109.9-57.1-113.7-119.5C313.8 132 263.5 83.6 256.8 22.1L213.9 16 81.7 86.7 16 222.1 42 370.4 149.8 475l148.3 21 132.3-70.7L496 289.9l-6.1-34.7zM160 224l32-32-32-32-32 32 32 32zm96 32l32 32 32-32-32-32-32 32zm-96 96l32 32 32-32-32-32-32 32zm160 0l32 32 32-32-32-32-32 32z" />
					</svg>
				</div>
				<p class="space-y-2 pr-4 text-sm text-neutral-300">
					{content.content.text}{" "}
					<button
						onClick={openDialog}
						class="font-medium uppercase underline hover:text-sunset-dark"
					>
						{content.content.manageToggle}
					</button>
				</p>
			</div>
			<div class="mt-4 grid flex-shrink-0 flex-grow-0 grid-cols-1 gap-3 font-medium sm:mt-0 sm:w-auto">
				<ButtonFilled onClick={() => setConsent(true, true)}>
					{content.buttonFilled}
				</ButtonFilled>
			</div>
		</>
	);
};
