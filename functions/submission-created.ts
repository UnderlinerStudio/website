import type { Handler, HandlerResponse } from "@netlify/functions";
import { z } from "zod";

const handler: Handler = async (event, context) => {
	// @ts-ignore
	const formData = JSON.parse(event.body);
	const formType = formData["form-name"];
	let validation = false;
	switch (formType) {
		case "contact":
			validation = validateContact(formData);
			if (!validation) {
				return errorCallback;
			}
			return successCallback;
		case "website-lead" || "ecommerce-lead" || "SEO":
			validation = validateLead(formData);
			if (!validation) {
				return errorCallback;
			}
			return successCallback;
		case "discovery-free-call" || "website-free-call" || "ecommerce-free-call":
			validation = validateMail(formData);
			if (!validation) {
				return errorCallback;
			}
			return successCallback;
		default:
			return errorCallback;
	}
};
const phoneRegex = /^((\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}){0,1}$/;

const validateContact = (data: any) => {
	const formObject = z.object({
		name: z.string().min(1, "EMPTY"),
		surname: z.string().min(1, "EMPTY"),
		email: z.string().min(1, "EMPTY").email("FORMAT"),
		phone: z.string().regex(phoneRegex, "FORMAT").optional(),
		company: z.string(),
		message: z.string().min(1, "EMPTY"),
	});
	const formData = {
		name: data["name"],
		surname: data["surname"],
		email: data["email"],
		phone: data["phone"],
		company: data["company"],
		message: data["message"],
	};
	const isValidData = formObject.parse(formData);

	if (!isValidData) {
		return false;
	}

	return true;
};

const validateLead = (data: any) => {
	const formObject = z.object({
		fullname: z.string().min(1, "EMPTY"),
		email: z.string().min(1, "EMPTY").email("FORMAT"),
		phone: z.string().regex(phoneRegex, "FORMAT").optional(),
		company: z.string(),
		goals: z.string(),
	});
	const formData = {
		fullname: data.name,
		email: data.email,
		phone: data.phone,
		company: data.company,
		goals: data.message,
	};
	const isValidData = formObject.parse(formData);

	if (!isValidData) {
		return false;
	}

	return true;
};

const validateMail = (data: any) => {
	const formObject = z.object({
		email: z.string().min(1, "EMPTY").email("FORMAT"),
	});
	const formData = {
		email: data.email,
	};
	const isValidData = formObject.parse(formData);

	if (!isValidData) {
		return false;
	}

	return true;
};

const successCallback: HandlerResponse = {
	statusCode: 200,
	body: JSON.stringify({ message: "success" }),
};
const errorCallback: HandlerResponse = {
	statusCode: 500,
	body: JSON.stringify({ message: "error" }),
};

export { handler };
