function planColor() {
    const table = document.getElementById("time-plans");
    const rows = table.children;

    for(let i = 0; i < rows.length; i++) {
        if(i % 2 == 0) {
            rows[i].classList.add("even");
        } else {
            rows[i].classList.add("odd");
        }
    }
}


function setPlan(num1,num2,name,id) {

    const plans = document.getElementById("time-plans");
    const plansAll = document.querySelectorAll(".plan");
    const plan = document.createElement("div");
    const planName = document.createElement("div");
    const planTime = document.createElement("div");
    const planHiddens = document.querySelectorAll(".time-plan-hidden");
    plan.classList.add("plan");
    plan.dataset.name = id;
    plan.classList.add("slide");
    planName.classList.add("plan-name");
    planTime.classList.add("plan-time");

    const planTitle = document.createElement("p");
    planTitle.innerHTML = `プラン${plansAll.length + 1}`;
    const planInput = document.createElement("input");
    planInput.classList.add("name-insert");
    planInput.size = "15";
    planInput.setAttribute("value",name);

    planName.appendChild(planTitle);
    planName.appendChild(planInput);
    plan.appendChild(planName);

    const fromTime = document.createElement("select");
    fromTime.className = "from";
    const toTime = document.createElement("select");
    toTime.className = "to";
    const p = document.createElement("p");
    p.innerHTML = "～";
    const time = 48;
    let hour = 0;
    let minutes = 0;

    for(let i = 0; i < time; i++) {

        const fromOp = document.createElement("option");
        const toOp = document.createElement("option");

        if(minutes === 0 && hour < 10) {
            fromOp.value = `0${String(hour)}0${String(minutes)}`;
            fromOp.innerHTML = `0${String(hour)}:0${String(minutes)}`;
            toOp.value = `0${String(hour)}0${String(minutes)}`;
            toOp.innerHTML = `0${String(hour)}:0${String(minutes)}`;
        } 
        if(minutes === 0 && hour >= 10) {
            fromOp.value = `${String(hour)}0${String(minutes)}`;
            fromOp.innerHTML = `${String(hour)}:0${String(minutes)}`;
            toOp.value = `${String(hour)}0${String(minutes)}`;
            toOp.innerHTML = `${String(hour)}:0${String(minutes)}`;
        } 
        if(minutes === 30) {
            if(hour < 10) {
                fromOp.value = `0${String(hour)}${String(minutes)}`;
                fromOp.innerHTML = `0${String(hour)}:${String(minutes)}`;
                toOp.value = `0${String(hour)}${String(minutes)}`;
                toOp.innerHTML = `0${String(hour)}:${String(minutes)}`;
            } else {
                fromOp.value = `${String(hour)}${String(minutes)}`;
                fromOp.innerHTML = `${String(hour)}:${String(minutes)}`;
                toOp.value = `${String(hour)}${String(minutes)}`;
                toOp.innerHTML = `${String(hour)}:${String(minutes)}`;
            }
        }

        if(fromOp.value === num1) {
            fromOp.selected = true;
            fromTime.setAttribute("value",fromOp.value);
        } else {
            fromOp.selected = false;
        }

        if(toOp.value === num2) {
            toOp.selected = true;
            toTime.setAttribute("value",toOp.value);
        } else {
            toOp.selected = false;
        }

        fromTime.appendChild(fromOp);
        toTime.appendChild(toOp);
        minutes += 30;

        if(minutes >= 60) {
            minutes = 0;
            hour += 1;
            
        }
    }

    planHiddens.forEach(h => {
        const hid = h.dataset.name;
        if (hid ===  plan.dataset.name) {

            fromTime.addEventListener("input", function() {
                const hiFrom = h.querySelector(".from-time");
                hiFrom.value = fromTime.value;
                fromTime.setAttribute('value', fromTime.value);
            });

            toTime.addEventListener("input", function() {
                const hiTo = h.querySelector(".to-time");
                hiTo.value = toTime.value;
                toTime.setAttribute('value', toTime.value);
            });

            planInput.addEventListener("input", function() {
                const hiName = h.querySelector(".name");
                hiName.value = planInput.value;
                planInput.setAttribute('value', planInput.value);
            });
        }
    });
    
    planTime.appendChild(fromTime);
    planTime.appendChild(p);
    planTime.appendChild(toTime);
    plan.appendChild(planTime);
    plans.appendChild(plan);
    planColor();
}


function addPlan() {
  const plans = document.getElementById("time-plans");
  const plansAll = document.querySelectorAll(".plan");
  const plan = document.createElement("div");
  const planName = document.createElement("div");
  const planTime = document.createElement("div");
  plan.classList.add("plan");
  plan.classList.add("slide");
//   plan.dataset.name = plansAll.length + 1;
  planName.classList.add("plan-name");
  planTime.classList.add("plan-time");

  const planTitle = document.createElement("p");
  planTitle.innerHTML = `プラン${plansAll.length + 1}`;
  const planInput = document.createElement("input");
  planInput.classList.add("name-insert");
  planInput.size = "15";
  planInput.setAttribute("value","");
  planName.appendChild(planTitle);
  planName.appendChild(planInput);
  plan.appendChild(planName);

  const fromTime = document.createElement("select");
  const toTime = document.createElement("select");
  fromTime.setAttribute("value","0000");
  toTime.setAttribute("value","0000");
  const p = document.createElement("p");
  p.innerHTML = "～";
  const time = 48;
  let hour = 0;
  let minutes = 0;

  for(let i = 0; i < time; i++) {

    const fromOp = document.createElement("option");
    const toOp = document.createElement("option");

    if(minutes === 0 && hour < 10) {
        fromOp.value = `0${String(hour)}0${String(minutes)}`;
        fromOp.innerHTML = `0${String(hour)}:0${String(minutes)}`;
        toOp.value = `0${String(hour)}0${String(minutes)}`;
        toOp.innerHTML = `0${String(hour)}:0${String(minutes)}`;
    } 
    if(minutes === 0 && hour >= 10) {
        fromOp.value = `${String(hour)}0${String(minutes)}`;
        fromOp.innerHTML = `${String(hour)}:0${String(minutes)}`;
        toOp.value = `${String(hour)}0${String(minutes)}`;
        toOp.innerHTML = `${String(hour)}:0${String(minutes)}`;
    } 
    if(minutes === 30) {
        if(hour < 10) {
            fromOp.value = `0${String(hour)}${String(minutes)}`;
            fromOp.innerHTML = `0${String(hour)}:${String(minutes)}`;
            toOp.value = `0${String(hour)}${String(minutes)}`;
            toOp.innerHTML = `0${String(hour)}:${String(minutes)}`;
        } else {
            fromOp.value = `${String(hour)}${String(minutes)}`;
            fromOp.innerHTML = `${String(hour)}:${String(minutes)}`;
            toOp.value = `${String(hour)}${String(minutes)}`;
            toOp.innerHTML = `${String(hour)}:${String(minutes)}`;
        }
    }
   
    fromTime.appendChild(fromOp);
    toTime.appendChild(toOp);
    minutes += 30;

    if(minutes >= 60) {
        minutes = 0;
        hour += 1;
        
    }
  }

  const hiddenBox = document.querySelector(".plans-hidden");

  const planAllhidden = document.querySelectorAll(".time-plan-hidden");
  const planAll = document.querySelectorAll(".plan");

  let hidden;
  let flag = true;
  let ff = true;
  planAllhidden.forEach(p => {
        const n = p.querySelector(".name");
        const f = p.querySelector(".from-time");
        const t = p.querySelector(".to-time");
        if(n.value === "" && f.value === "" && t.value === "" && flag === true) {
            ff = true;
            
            planAll.forEach(pp => {
                console.log(pp.dataset.name);
                console.log(p.dataset.name);
                if(p.dataset.name === pp.dataset.name) {
                    ff = false;
                }
            })
            if(ff === true) {
                plan.dataset.name = p.dataset.name;
                hidden = p;
                flag = false;
            }
        }
  })
  const hiFrom1 = hidden.querySelector(".from-time");
  const hiTo1 = hidden.querySelector(".to-time");
  hiFrom1.setAttribute("value","0000");
  hiTo1.setAttribute("value","0000");

        fromTime.addEventListener("input", function() {
            const hiFrom = hidden.querySelector(".from-time");
            hiFrom.value = fromTime.value;
            fromTime.setAttribute('value', fromTime.value);
        });

        toTime.addEventListener("input", function() {
            const hiTo = hidden.querySelector(".to-time");
            hiTo.value = toTime.value;
            toTime.setAttribute('value', toTime.value);
        });

        planInput.addEventListener("input", function() {
            const hiName = hidden.querySelector(".name");
            hiName.value = planInput.value;
            planInput.setAttribute('value', planInput.value);
        });


  planTime.appendChild(fromTime);
  planTime.appendChild(p);
  planTime.appendChild(toTime);
  plan.appendChild(planTime);
  plans.appendChild(plan);
  planColor();

}

function planDel() {
    const plans = document.getElementById("time-plans");
    const delList = plans.querySelectorAll('input[type="checkbox"]:checked');
    delList.forEach((i) => {
        const plan = i.closest(".plan");
        if(plan) {
            plan.classList.add("slideout");
        }
    })
    const planhidden = document.querySelectorAll(".time-plan-hidden");
    setTimeout(() => {
        for(let i = 0; i < delList.length; i++) {
            const plan = delList[i].closest(".plan");
            planhidden.forEach(p => {
                if(plan.dataset.name === p.dataset.name) {
                    plan.remove();
                    p.querySelector(".name").value = "";
                    p.querySelector(".from-time").value = "";
                    p.querySelector(".to-time").value = "";
                }
            }) 
        }
        planColor();
    },400)
}

let delFlag = true;
function deletePlan() {

    const table = document.getElementById("time-plans");
    const plans = table.children;
    const footer =  document.querySelector(".footer-content");
    const title = document.getElementById("title");
    const sub = document.getElementById("sub-title");
    const op = document.getElementById("add");
    const del = document.getElementById("del");
    
    

    if(delFlag === true) {
        for(let i = 0; i < plans.length; i++) {
            const input = document.createElement("input");
            const insert = plans[i].querySelector(".name-insert");
            input.type = "checkbox";
            input.classList.add("del-check");
            input.classList.add("check-box");
            const planName = plans[i].querySelector(".plan-name");
            planName.classList.add("del-check");
            planName.prepend(input);
            insert.classList.add("del-check");
        }
        footer.classList.add("del-check");
        

        title.innerHTML = "削除";
        sub.innerHTML = "削除するプランを選択してください";

        op.innerHTML = "戻る";
        op.removeAttribute("onclick");
        op.setAttribute("onclick","deletePlan()");

        del.removeAttribute("onclick");
        del.setAttribute("onclick","planDel()");
        
        delFlag = false;

    } else {
        for(let i = 0; i < plans.length; i++) {
            const planName = plans[i].querySelector(".plan-name");
            const inserts = plans[i].querySelector(".name-insert");
            planName.removeChild(planName.firstElementChild);
            planName.classList.remove("del-check");
            inserts.classList.remove("del-check");
        }
        
        footer.classList.remove("del-check");
        title.innerHTML = "タイムプラン作成";
        sub.innerHTML = "シフト時間を作成して下さい";

        op.innerHTML = "追加";
        op.removeAttribute("onclick");
        op.setAttribute("onclick","addPlan()");

        del.removeAttribute("onclick");
        del.setAttribute("onclick","deletePlan()");
        
        delFlag = true;
    }
}

function subForm() {
    const form = document.createElement("form");
    const set = new Set();
    const plans = document.querySelectorAll(".time-plan-hidden");
    const values = document.createElement("div"); 
    const noneV = document.createElement("div");
    const error = document.querySelector(".error");

    if(error) {
        error.innerHTML = "";
    }

    let flag = false;
    plans.forEach(p => {
        const bename = p.querySelector(".name");
        const name = bename.value.trim();
        const fromTime = p.querySelector(".from-time").value.trim();
        const toTime = p.querySelector(".to-time").value.trim();

        if(name !== "") {
            if(!set.has(name)) {
                // 各要素をフォームに追加
                const nameInput = document.createElement("input");
                nameInput.type = "hidden";
                nameInput.name = "values";
                nameInput.value = `${name}:${fromTime}:${toTime}`;
                console.log(nameInput);
                
                values.appendChild(nameInput);
            } else {
                error.innerHTML = "同じ名前は使用できません";
                flag = true;
            }
        } else {
            const nameInput = document.createElement("input");
            nameInput.type = "hidden";
            nameInput.name = "values";
            nameInput.value = `${name}:${fromTime}:${toTime}`;
            noneV.appendChild(nameInput);
        }
    });

    if(!flag) {
		const csrf = document.querySelector("input[name='_csrf']");
		  if (csrf) {
		    const csrfInput = document.createElement("input");
		    csrfInput.type = "hidden";
		    csrfInput.name = "_csrf";
		    csrfInput.value = csrf.value;
		    form.appendChild(csrfInput);
		  }
       
        form.appendChild(values);
        form.appendChild(noneV);
        form.action = "/yearAndMonth";
        form.method = "post";
        form.className = "none";
        document.body.appendChild(form);
        console.log(form);
		if(values.children.length !== 0) {
			form.submit(); // フォームを送信
			form.remove();
		} else {
			error.innerHTML = "一つ以上プランを作ってください";
		}  
    } else {
        return;
    }
}


function checkZoom() {
    let zoom = window.devicePixelRatio;
    const main = document.querySelector("main");
    if(zoom > 1.5) {
        main.classList.add("zoom-out");
    } else {
        main.classList.remove("zoom-out");
    }
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
    

window.addEventListener("resize", function() {
    checkZoom();
})

document.addEventListener("DOMContentLoaded", function() {
    const hiddenpre = document.getElementById("time-plans-hidden");

    if(hiddenpre.children.length <= 0) {
        const newhiddens = document.createElement("div");   
        newhiddens.className = "plans-hidden";
        hiddenpre.appendChild(newhiddens);
    }

    const hiddens = document.querySelectorAll(".time-plan-hidden");

    hiddens.forEach((hi) => {
        const hiNum1 = hi.querySelector(".from-time").value;
        const hinum2 = hi.querySelector(".to-time").value;
        const names = hi.querySelector(".name").value;
        const id = hi.dataset.name;
        if(hiNum1 !== "" && hinum2 !== "" && names !== "") {
            setPlan(hiNum1,hinum2,names,id);
        }
    })

    planColor();

    const selects = document.querySelectorAll("#time-plans select");

    const hiddenInputs = document.querySelectorAll(".time-plan-hidden input[type='hidden']");

    selects.forEach(select => {
        select.addEventListener("input", function() {
            const hiddenInput = document.querySelector(`.time-plan-hidden input[name='${select.name}']`);
            if (hiddenInput) {
                hiddenInput.value = select.value;
                hiddenInput.dispatchEvent(new Event("input"));
            }
        });
    });

    hiddenInputs.forEach(hiddenInput => {
        hiddenInput.addEventListener("input", function() {
            const select = document.querySelector(`#time-plans select[name='${hiddenInput.name}']`);
            if (select) {
                select.value = hiddenInput.value;
            }
        });
    });

    hiddenInputs.forEach(hiddenInput => {
        const select = document.querySelector(`#time-plans select[name='${hiddenInput.name}']`);
        if (select) {
            select.value = hiddenInput.value;
        }
    });

    load();
})