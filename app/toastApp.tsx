import toast, { Toaster } from "solid-toast";

export const ToastApp = () => {
	// @ts-ignore
	window.toast = toast;

	return <Toaster position="top-right" />;
};
