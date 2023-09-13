import { JSX } from "solid-js/jsx-runtime";
import { Switch, SwitchProps } from "@s-src/components/Switch";
import { Accessor, createSignal } from "solid-js";

type cookiesDetailInfo = {
	app?: string;
	name: string;
	description: string;
}[];

type CookieKindDetailProps = {
	heading: string;
	text: string;
	switchProps: SwitchProps;
	cookiesDetailInfo: cookiesDetailInfo;
};

export const CookieKindDetail = ({
	heading,
	text,
	switchProps,
	cookiesDetailInfo,
}: CookieKindDetailProps) => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div>
			<div class="mt-px flex">
				<div class="flex-1">
					<CollapsibleButton
						isOpen={isOpen}
						onClick={() => setIsOpen(!isOpen())}
					>
						{heading}
					</CollapsibleButton>
				</div>
				<Switch
					isDisabled={switchProps.isDisabled}
					checked={switchProps.checked}
					onClick={switchProps.onClick}
				/>
			</div>
			<p class="text-sm leading-relaxed text-neutral-400">{text}</p>
			{isOpen() && <CookieDetailTable cookiesDetailInfo={cookiesDetailInfo} />}
		</div>
	);
};

const CollapsibleButton = ({
	children,
	onClick,
	isOpen,
}: {
	children: JSX.Element;
	onClick: () => void;
	isOpen: Accessor<boolean>;
}) => {
	return (
		<button onClick={onClick} class="mb-4 flex items-center font-medium">
			<span
				class={`mr-2 aspect-square h-4 fill-neutral-300 ${
					isOpen() ? "rotate-180 transform" : ""
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 512 512"
				>
					<path d="M256 417.9l17-17L465 209l17-17L448 158.1l-17 17-175 175L81 175l-17-17L30.1 192l17 17L239 401l17 17z" />
				</svg>
			</span>
			{children}
		</button>
	);
};

const CookieDetailTable = ({
	cookiesDetailInfo,
}: {
	cookiesDetailInfo: cookiesDetailInfo;
}) => {
	return (
		<table class="text-left">
			<thead>
				<tr>
					{cookiesDetailInfo[0].app && (
						<th class="border-b border-neutral-600 py-4 pr-4 font-bold">
							Aplikace
						</th>
					)}
					<th class="border-b border-neutral-600 py-4 pr-4 font-bold">Název</th>
					<th class="border-b border-neutral-600 py-4 pr-4 font-bold">Účel</th>
				</tr>
			</thead>
			<tbody>
				{cookiesDetailInfo.map((detail) => {
					return (
						<tr>
							{detail.app && (
								<td class="border-b border-neutral-600 py-4 pr-4">
									{detail.app}
								</td>
							)}
							<td class="border-b border-neutral-600 py-4 pr-4">
								{detail.name}
							</td>
							<td class="border-b border-neutral-600 py-4 pr-4">
								{detail.description}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
