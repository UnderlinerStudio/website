import { z } from "zod";
import { $ } from "./selector";

const formContent = {
	email: {
		element: <HTMLInputElement>document.getElementById("call-mail"),
		schema: z.string().min(1, "EMPTY").email("FORMAT"),
	},
};

formContent.email.element.addEventListener("input", () =>
	validateInputValue("email"),
);

type FormElementType = "email";

function validateInputValue(formElement: FormElementType) {
	const elementSchema = formContent[formElement];
	const element = elementSchema.element;
	const errorElementEmpty = element
		.closest("div")
		.querySelector("[data-validation-empty]");
	const errorElementFormat = element
		.closest("div")
		.querySelector("[data-validation-format]");

	// @ts-ignore
	let validation = elementSchema.schema.safeParse(element.value);

	if (validation.success === false) {
		if (validation.error.issues[0].message === "EMPTY") {
			if (errorElementEmpty) errorElementEmpty.classList.remove("hidden");
			if (errorElementFormat) errorElementFormat.classList.add("hidden");
		} else if (validation.error.issues[0].message === "FORMAT") {
			if (errorElementFormat) errorElementFormat.classList.remove("hidden");
			if (errorElementEmpty) errorElementEmpty.classList.add("hidden");
		}
	} else {
		if (errorElementEmpty) errorElementEmpty.classList.add("hidden");
		if (errorElementFormat) errorElementFormat.classList.add("hidden");
	}
}

$("[data-name='call']").addEventListener("submit", handleSubmit);
function handleSubmit(event: Event) {
	event.preventDefault();

	const formValidation = z.object({
		email: formContent.email.schema,
	});

	const formDataValidate = {
		email: formContent.email.element.value,
	};

	const isValidData = formValidation.parse(formDataValidate);

	if (!isValidData) {
		validateInputValue("email");
		return;
	}

	const myForm = event.target as HTMLFormElement;
	const formData = new FormData(myForm);

	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		// @ts-ignore
		body: new URLSearchParams(formData).toString(),
	})
		.then(() => {
			const button = myForm.querySelector(
				"button[type='submit']",
			) as HTMLButtonElement;

			button.classList.remove(
				"hover:bg-neutral-700",
				"hover:text-neutral-50",
				"bg-neutral-50",
			);
			button.classList.add(
				"cursor-not-allowed",
				"bg-emerald-400",
				"hover:fill-neutral-50",
				"opacity-40",
			);
			button.querySelector("span").classList.remove("invisible");
			button.disabled = true;
			// @ts-ignore
			toast.success(button.dataset["toast-success"]);
			console.log("Form successfully submitted");
		})
		.catch((error) => {
			const button = $("button[type='submit']") as HTMLButtonElement;
			console.error(error);
			// @ts-ignore
			toast.error(button.dataset["toast-error"]);
		});
}
