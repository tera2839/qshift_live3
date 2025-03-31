function memberAdd() {
    const input = document.createElement("input");
    const div = document.createElement("div");
    const form = document.getElementById("geneInputs");
    const hs = document.querySelectorAll(".hidden-value");
    const vs = document.querySelectorAll(".geneInput");
    const er = document.querySelector(".error");
    er.innerHTML = "";

    if(vs.length === 30) {
        const er = document.querySelector(".error");
        er.innerHTML = "30人以上追加できません";
        return;
    }

    input.type = "text";
    input.placeholder = "メンバーの名前";
    input.size = "13";
    input.className = "view-name";
    input.value = "";

    div.classList.add("geneInput");
    div.classList.add("slideUp");
    
    let hidden;
    let f = true;
    let ff = true;
    hs.forEach(h => {
        if(h.value === "" && f === true) {
            ff = true;
            vs.forEach(v => {
                if(h.dataset.id === v.dataset.id) {
                    ff = false;
                }
            })
            if(ff === true) {
                div.dataset.id = h.dataset.id;
                hidden = h;
                f = false;
            }
        }
    })

    div.appendChild(input);
    form.appendChild(div);

    input.addEventListener("input", function() {
        input.setAttribute('value', input.value);
        hidden.setAttribute("value",input.value);
    });
}

function memberSet(name,id) {
    const input = document.createElement("input");
    const div = document.createElement("div");
    const form = document.getElementById("geneInputs");
    const hiddens = document.querySelectorAll(".geneInput-hidden input[type='hidden']");

    input.type = "text";
    input.placeholder = "メンバーの名前";
    input.size = "13";
    input.setAttribute("value",name);
    input.value = name;
    input.classList.add("view-name");
    div.classList.add("geneInput");
    div.classList.add("slideUp");
    div.dataset.id = id;

    div.appendChild(input);
    form.appendChild(div);

    hiddens.forEach(h => {
        if (h.value === input.value) {
            input.addEventListener("input", function() {
                h.value = input.value;
                input.setAttribute('value', input.value);
            });
        }
    });
}

let delFlag = true;
function delMode() {
    const add = document.querySelector(".add");
    const del = document.querySelector(".del");
    const footer = document.querySelector(".footer-content");
    const inputs = document.querySelectorAll(".view-name");
    const geneList = document.querySelectorAll(".geneInput");

    if(delFlag) {
        add.innerHTML = "戻る";
        add.removeAttribute("onclick");
        add.setAttribute("onclick","delMode()");
        del.removeAttribute("onclick");
        del.setAttribute("onclick","memberDel()");

        for(const i of inputs) {
            i.classList.remove("on");
            i.classList.add("off");
        }
    
        const genes = document.getElementById("geneInputs").children;
        for(let i = 0; i < genes.length; i++) {
            const gene = genes[i];
            const check = document.createElement("input");
            check.type = "checkbox"; 
            check.classList.add("checkbox");
            check.classList.add("slide");
            gene.insertBefore(check, gene.firstChild);
        }
        footer.classList.add("del-mode");
        setTimeout(() => {
            footer.classList.add("on");
        },500)

        geneList.forEach(gene => {
            gene.removeEventListener("click", geneListEventHandler);
        });

        geneList.forEach(gene => {
            gene.addEventListener("click", geneListEventHandler);
        });

        delFlag = false;
    } else {
        add.innerHTML = "追加";
        add.removeAttribute("onclick");
        add.setAttribute("onclick","memberAdd()");
        del.removeAttribute("onclick");
        del.setAttribute("onclick","delMode()");

        for(const i of inputs) {
            i.classList.remove("off");
            i.classList.add("on");
        }

        geneList.forEach(gene => {
            gene.removeEventListener("click", geneListEventHandler);
        });

        const genes = document.getElementById("geneInputs").children;
        for(let i = 0; i < genes.length; i++) {
            const gene = genes[i].querySelector(".checkbox");
            gene.remove();
        }
       
        footer.classList.remove("del-mode");
        footer.classList.remove("on");
        footer.classList.add("slide");
        geneList.forEach(gene => {
            gene.removeAttribute("click");
        })
        delFlag = true;
    }
   
}

let geneListEventHandler = function(event) {
    const checkbox = this.querySelector("input[type='checkbox']");
    if (event.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
    }
};

function memberDel() {
    const gene = document.querySelectorAll(".geneInput");
    const hiddens = document.querySelectorAll(".geneInput-hidden input[type='hidden']");
    const checkedItems = [];

    gene.forEach((i) => {
        const checkbox = i.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) { 
            const g = i.closest(".geneInput");
            if (g) {
                g.classList.add("slideout");
                checkedItems.push(g);
            }
        }
    });

    setTimeout(() => {
        checkedItems.forEach((g) => {
            for (const h of hiddens) {
                if (h.dataset.id === g.dataset.id) {
                    h.value = "";
                    g.remove();
                    break;
                }
            }
        });
    }, 500);

}


function sendMember() {
    const genes = document.querySelectorAll(".hidden-value");
    let er = document.querySelector(".error");
    const form = document.createElement("form");
    const geneInputs = document.querySelectorAll(".geneInput");

    if (er) {
        er.innerHTML = "";
    }

    if (geneInputs.length === 0) {
        er.innerHTML = "メンバーは1人以上追加してください";
        return;
    }

    const seen = new Set();
    let hasDuplicate = false;

    genes.forEach(g => {
        if (seen.has(g.value) && g.value !== "") {
            hasDuplicate = true;
        }
        seen.add(g.value);
    });

    if (hasDuplicate) {
        er.innerHTML = "メンバーの中に同じ名前があります";
        return;
    }

    const nones = document.createElement("div");
    const values = document.createElement("div");
    genes.forEach(g => {
        g.value.trim();
        if(g.value !== "") {
            values.appendChild(g.cloneNode(true));
        } else {
            nones.appendChild(g.cloneNode(true));
        }
    })
	
	const csrf = document.querySelector("input[name='_csrf']");
	if (csrf) {
		const csrfInput = document.createElement("input");
	    csrfInput.type = "hidden";
	 	csrfInput.name = "_csrf";
	 	csrfInput.value = csrf.value;
		console.log(csrfInput.value)
	 	form.appendChild(csrfInput);
	}
	
	if(values.children.length === 0) {
		er.innerHTML = "メンバーを追加してください";
		return;
	}
	
    form.appendChild(values);
    form.appendChild(nones);
	console.log(form);
    form.action = "/completeManagementMember";
    form.method = "post";
    form.className = "none";
    document.body.appendChild(form);
    form.submit();
	form.remove();
}

const load = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => {
      i.addEventListener("input",function() {
        i.value = i.value.replace(/\s/g, '');
        if(i.value.length >=  15) {
          i.value = i.value.slice(0, 15); 
        }
      })
    })
  }

document.addEventListener("DOMContentLoaded", function() {
    const genes = document.querySelectorAll(".hidden-value");
    
    if(genes.length === 0) {
        const midle = document.querySelector(".midle-content");
        const div = document.createElement("div");
        div.className = "geneInput-hidden";
        midle.appendChild(div);
		console.log("０人です")
        memberAdd();
    } else {
        genes.forEach((g) => {
            if(g.value !== "") {
                memberSet(g.value,g.dataset.id);
            }
        })
    }

    const textInputs = document.querySelectorAll("#geneInputs input[type='text']");
    const hiddenInputs = document.querySelectorAll(".geneInput-hidden input[type='hidden']");
    
    textInputs.forEach((textInput, index) => {
        textInput.addEventListener("input", function() {
            hiddenInputs[index].value = textInput.value;
        });
    });

    hiddenInputs.forEach((hiddenInput, index) => {
        hiddenInput.addEventListener("input", function() {
            textInputs[index].value = hiddenInput.value;
        });
    });
    load();
})
