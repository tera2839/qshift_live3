function viewChange() {
    const pass = document.getElementById("pass");
    var btnEye = document.getElementById("buttonEye");

    if(pass.type === "text") {
        pass.type = "password";
        btnEye.className = "fa fa-eye-slash";
    } else {
        pass.type = "text";
        btnEye.className = "fa fa-eye";
    }
}