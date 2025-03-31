function addStore() {
    const form = document.querySelector("form");
    form.action = "/addStore";
    form.method = "get";
    form.submit();
}

function setStore(sh) {
    const input= document.createElement("input");
    const storeHiddens = document.querySelector(".store-content");
    const inputbox = document.createElement("div");

    input.className = "store-name";
    input.type = "text";
    input.readOnly = true;
    input.setAttribute("value", sh.value);
    input.dataset.name = sh.dataset.name;

    inputbox.className = "store-box";

    input.addEventListener("click", function() {
        
        if(inputbox.querySelector(".check-box") === null) {

            const hiddenForm = document.createElement("form");
            hiddenForm.action = "/adminHome";
            hiddenForm.method = "post";
            hiddenForm.className = "none";

            const inputSub = document.createElement("input");
            inputSub.type = "hidden";
            inputSub.setAttribute("value",sh.value);
            inputSub.name = "name";

            const inputData = document.createElement("input");
            inputData.type = "hidden";
            inputData.setAttribute("value", sh.dataset.name);
            inputData.name = "id";
			
			const csrf = document.querySelector("input[name='_csrf']");
			if (csrf) {
				const csrfInput = document.createElement("input");
			    csrfInput.type = "hidden";
			 	csrfInput.name = "_csrf";
			 	csrfInput.value = csrf.value;
				console.log(csrfInput.value)
			 	hiddenForm.appendChild(csrfInput);
			}

            hiddenForm.appendChild(inputSub);
            hiddenForm.appendChild(inputData);
            document.body.appendChild(hiddenForm);

            console.log(inputSub.value);
            console.log(inputSub.name);
            console.log(inputData.value);
            console.log(inputData.name);
			
            hiddenForm.submit();
        } else {
            const check = inputbox.querySelector(".check-box");
            if(check.checked === true) {
                check.checked = false;
            } else {
                check.checked = true;
            }
        }
    })

    inputbox.appendChild(input);
    storeHiddens.appendChild(inputbox);
}



document.addEventListener("DOMContentLoaded", function() {
    const backStore = document.getElementById("back-store-hiddens").children;
    if(backStore.length <= 0) {

       const storeContent = document.querySelector(".store-content");
       const addstore = document.querySelector(".add-store");
       const nothing1 = document.createElement("h4");
       const nothing2 = document.createElement("h4");

       nothing1.innerHTML = "選択する店舗がありません";
       nothing2.innerHTML = "下記より店舗を登録してください";

       nothing1.className = "nothing";
       nothing2.className = "nothing";

       addstore.value = "新規店舗登録へ"
       storeContent.appendChild(nothing1);
       storeContent.appendChild(nothing2);

    } else {
        const storeHiddens = document.querySelectorAll(".store-hiddens input[name='storeName']");
        storeHiddens.forEach(sh => {   
            setStore(sh);
        })
    }

})