function select() {
  const form = document.createElement("form");
  const select = document.querySelector(".member").value;
  
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = select;
  input.name = "memberId";
  
  form.appendChild(input);
  form.action = "/memberHome";
  form.method = "post";
  const er = document.querySelector(".error");
     
	const csrf = document.querySelector("input[name='_csrf']");
  if (csrf) {
    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_csrf";
    csrfInput.value = csrf.value;
    form.appendChild(csrfInput);
  }

  if(select === "") {
    er.innerHTML = "名前を選択してください";
    return;
  } else {
	console.log(form);
	document.body.appendChild(form);
    form.submit();
	form.remove();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const select = document.querySelector(".member");
  const op = document.createElement("option");
  op.setAttribute("value","");
  op.disabled = true;
  op.selected = true;
  op.textContent = "名前を選択";
  select.prepend(op);
})