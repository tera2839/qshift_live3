function viewChange1() {
    const pass = document.querySelector(".form5");
    var btnEye = document.getElementById("buttonEye1");
    
    if(pass.type === "text") {
        pass.type = "password";
        btnEye.className = "fa fa-eye-slash";
    } else {
        pass.type = "text";
        btnEye.className = "fa fa-eye";
    }
}

function viewChange2() {
    const pass = document.querySelector(".form6");
    var btnEye = document.getElementById("buttonEye2");

    if(pass.type === "text") {
        pass.type = "password";
        btnEye.className = "fa fa-eye-slash";
    } else {
        pass.type = "text";
        btnEye.className = "fa fa-eye";
    }
}


function viewChange3() {
    const pass = document.querySelector(".form3");
    var btnEye = document.getElementById("buttonEye2");

    if(pass.type === "text") {
        pass.type = "password";
        btnEye.className = "fa fa-eye-slash";
    } else {
        pass.type = "text";
        btnEye.className = "fa fa-eye";
    }
}