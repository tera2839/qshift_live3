document.addEventListener("DOMContentLoaded",function() {
	const form = document.querySelector("form");
	const input = document.createElement("input");
	input.type = "hidden";
	input.name = "url";
	input.value = location.origin;
	form.appendChild(input);
})