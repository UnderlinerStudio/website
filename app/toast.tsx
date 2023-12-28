import { render } from "solid-js/web";
import { ToastApp } from "./toastApp";

const root = document.getElementById("toaster");

render(() => {
	return (
		<div>
			<ToastApp />
		</div>
	);
}, root!);
