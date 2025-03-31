function login() {
  const form = document.querySelector("form");
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

document.addEventListener("DOMContentLoaded", function() {
  const hiname = document.querySelector(".name-hidden");
  const name = document.querySelector(".store-name");
  name.innerHTML = hiname.value;
}) 