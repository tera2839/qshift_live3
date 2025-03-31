
function setShift(h) {
    const value = h.split(":");
    const year = value[0];
    const month = value[1];
  
    const shifts = document.querySelector(".shifts");
    const shiftdiv = document.createElement("div");
    const shift = document.createElement("h4");
  
    shift.innerHTML = `${year}年${month}月シフト締め切り`;
    shiftdiv.className = "shift";
    shiftdiv.appendChild(shift);
  
    shiftdiv.addEventListener("click", function() {
      const form = document.createElement("form");
      form.className = "none";
  
      const input1 = document.createElement("input");
      input1.type = "hidden";
	  input1.name = "month";
	  input1.value = `${year}:${month}`;
     
      form.appendChild(input1);
	  
	  const csrf = document.querySelector("input[name='_csrf']");
	  if (csrf) {
	  	const csrfInput = document.createElement("input");
	      csrfInput.type = "hidden";
	   	csrfInput.name = "_csrf";
	   	csrfInput.value = csrf.value;
	  	console.log(csrfInput.value)
	   	form.appendChild(csrfInput);
	  }
  
      form.action = "/checkMemberRequest";
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