
function setShift(h) {
  const value = h.split(":");
  const year = value[0];
  const month = value[1];

  const shifts = document.querySelector(".shifts");
  const shiftdiv = document.createElement("div");
  const shift = document.createElement("h4");

  shift.innerHTML = `${year}年${month}月シフト`;
  shiftdiv.className = "shift";
  shiftdiv.appendChild(shift);

  shiftdiv.addEventListener("click", function() {
    const form = document.createElement("form");
    form.className = "none";

    const input1 = document.createElement("input");
    const input2 = document.createElement("input");

    input1.value = year;
    input2.value = month;

    input1.name = "year";
    input2.name = "month";

    input1.type = "hidden";
    input2.type = "hidden";
    form.appendChild(input1);
    form.appendChild(input2);
	const csrf = document.querySelector("input[name='_csrf']");
	if (csrf) {
		const csrfInput = document.createElement("input");
		csrfInput.type = "hidden";
		csrfInput.name = "_csrf";
		csrfInput.value = csrf.value;
		console.log(csrfInput.value)
		 form.appendChild(csrfInput);
	}
	

    form.action = "/editAdminRequest";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();
    form.remove();
  })
  shifts.appendChild(shiftdiv);
}

document.addEventListener("DOMContentLoaded", function() {
  const hiddens = document.querySelectorAll(".shift-hidden");
  hiddens.forEach(h => {
    setShift(h.value);
  })
 
})