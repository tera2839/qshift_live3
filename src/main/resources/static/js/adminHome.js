function create() {
    const form = document.createElement("form");
    form.action = "/managementMember";
    form.method = "post";
	
	const csrf = document.querySelector("input[name='_csrf']");
    if (csrf) {
        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_csrf";
        csrfInput.value = csrf.value;
        console.log(csrfInput.value)
        form.appendChild(csrfInput);
    }
    document.body.appendChild(form);
    form.submit();
	form.remove();
}

function closeShift() {
	const form = document.createElement("form");
	form.action = "/closingHome";
	form.method = "post";
	
	const csrf = document.querySelector("input[name='_csrf']");
    if (csrf) {
        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_csrf";
        csrfInput.value = csrf.value;
        console.log(csrfInput.value)
        form.appendChild(csrfInput);
    }
    document.body.appendChild(form);
    form.submit();
	form.remove();
}

function change() {
    const form = document.createElement("form");
    form.action = "/adminEditHome";
    form.method = "post";
	const csrf = document.querySelector("input[name='_csrf']");
    if (csrf) {
        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_csrf";
        csrfInput.value = csrf.value;
        console.log(csrfInput.value)
        form.appendChild(csrfInput);
    }
    document.body.appendChild(form);
    form.submit();
	form.remove();
}