function submitForm1() {
  const form = document.querySelector("form");
  form.action = "/checkHome";
  form.method = "GET";
  form.submit();
}

function submitForm2() {
  const form = document.querySelector("form");
  form.action = "/memberEditHome";
  form.method = "GET";
  form.submit();
}