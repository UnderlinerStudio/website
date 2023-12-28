import { z } from "zod";
import { $ } from "./selector";

const phoneRegex = /^((\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}){0,1}$/;

const formContent = {
	fullname: {
		element: <HTMLInputElement>document.getElementById("fullname"),
		schema: z.string().min(1, "EMPTY"),
	},
	email: {
		element: <HTMLInputElement>document.getElementById("email"),
		schema: z.string().min(1, "EMPTY").email("FORMAT"),
	},
	phone: {
		element: <HTMLInputElement>document.getElementById("phone"),
		schema: z.string().regex(phoneRegex, "FORMAT").optional(),
	},
	company: {
		element: <HTMLInputElement>document.getElementById("company"),
		schema: z.string(),
	},
	goals: {
		element: <HTMLInputElement>document.getElementById("goals"),
		schema: z.string(),
	},
};

formContent.fullname.element.addEventListener("input", () =>
	validateInputValue("fullname"),
);
formContent.email.element.addEventListener("input", () =>
	validateInputValue("email"),
);
formContent.phone.element.addEventListener("input", () =>
	validateInputValue("phone"),
);
formContent.goals.element.addEventListener("input", () =>
	validateInputValue("goals"),
);

type FormElementType = "fullname" | "email" | "phone" | "company" | "goals";

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

$("[data-name='lead']").addEventListener("submit", handleSubmit);
function handleSubmit(event: Event) {
	event.preventDefault();

	const formValidation = z.object({
		fullname: formContent.fullname.schema,
		email: formContent.email.schema,
		phone: formContent.phone.schema,
		company: formContent.company.schema,
		goals: formContent.goals.schema,
	});

	const formDataValidate = {
		fullname: formContent.fullname.element.value,
		email: formContent.email.element.value,
		phone: formContent.phone.element.value,
		company: formContent.company.element.value,
		goals: formContent.goals.element.value,
	};
	const isValidData = formValidation.parse(formDataValidate);

	if (!isValidData) {
		validateInputValue("fullname");
		validateInputValue("email");
		validateInputValue("phone");
		validateInputValue("goals");
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
