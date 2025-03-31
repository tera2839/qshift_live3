const date = new Date();
let currentMonth;
let currentYear;

function setDate(date) {
    const values = date.value.split(":");
    currentYear = Number(values[0]);
    currentMonth = Number(values[1]) - 1;
}

function renderCalendar() {
    document.getElementById("days").innerHTML = "";
    document.getElementById("day").innerHTML = "";

    const monthYear = new Date(currentYear, currentMonth);
    createMonthCalendar(monthYear);
}

function createMonthCalendar(monthYear) {
    const first = new Date(monthYear.getFullYear(), monthYear.getMonth(), 1);
    const last = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0);
    const firstDay = first.getDate();
    const lastDay = last.getDate();

    console.log(firstDay);
    console.log(lastDay);

    const days = ["日", "月", "火", "水", "木", "金", "土"];
    const startDay = first.getDay(); 

    const htmldays = document.getElementById("days");
    const htmlday = document.getElementById("day");
    let limit = startDay;

    for (let j = 0; j < lastDay; j++) {
        const d = document.createElement("td");
        d.innerHTML = days[limit];
        if(j % 2 === 0) {
            d.className = "even";
        } else {
            d.className = "odd";
        }
        htmldays.appendChild(d);
        limit++;    
        if(limit > 6) {
            limit = 0;
        }
    }

    for (let i = 1; i <= lastDay; i++) {
        const d = document.createElement("td");
        d.innerHTML = i;
        if(i % 2 === 0) {
            d.className = "date odd";
        } else {
            d.className = "date even";
        }
        htmlday.appendChild(d);
    }
}

function addTd() {
    const trlen = document.querySelector(".time").children;
    const tr = document.createElement("tr");
    const time = document.querySelector(".time");
    const monthYear = new Date(currentYear, currentMonth);

    const first = new Date(monthYear.getFullYear(), monthYear.getMonth(), 1);
    const last = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0);
    const firstDay = first.getDate();
    const lastDay = last.getDate();

    
    for(let i = 0; i < lastDay; i++) {

        const td = document.createElement("td");
        const input = document.createElement("select");
        td.className = "time-cell";
        td.dataset.id = i + 1;

        input.className = "input-cell def";
        const op = document.createElement("option");
        op.value = "";
        op.innerHTML = "選択無し";
        input.prepend(op);
        
        const member = document.querySelectorAll(".member-hidden");
        member.forEach(m => {
			if(m.value !== "") {
				const o = document.createElement("option");
				o.setAttribute("value",m.value);
				o.innerHTML = m.value;
				input.appendChild(o);
			}
        })

        td.appendChild(input);

        input.addEventListener("change", function() {
            selectlogic(input,td);
        });
        
        
        tr.className = "cells";
        tr.dataset.id = trlen.length + 1;
        tr.appendChild(td);

    }
    time.appendChild(tr);
}

let count = 0;
function createPlan(t,f,n,i) {
    const timePlan = document.querySelector(".time-plan");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const to = document.createElement("p");
    const from = document.createElement("p");
    const name = document.createElement("p");
    const c = document.createElement("p");

    to.innerHTML = t.substring(0,2) + ":" + t.substring(2,4);
    to.className = "to-time";
    from.innerHTML =  f.substring(0,2) + ":" + f.substring(2,4);
    from.className = "from-time";
    c.innerHTML = "~";
    name.innerHTML = n;
    div.className = "plan";
    if(i % 2 === 0) {
        div.classList.add("odd");
    } else {
        div.classList.add("even");
    }
    div2.className = "plan-time";
    div.dataset.id = i;

    div2.appendChild(to);
    div2.appendChild(c);
    div2.appendChild(from);
    div.appendChild(name);
    div.appendChild(div2);

    timePlan.appendChild(div);
    count++;
}

function submitForm() {
    const form = document.createElement("form");
    form.className = "none";
    const plans = document.querySelectorAll(".cells");
    const shifts = document.createElement("div");

    plans.forEach(p => {
        const originalShifts = p.querySelectorAll(".time-cell");
        originalShifts.forEach(o => {
            const select = o.querySelectorAll("select");
            if(select.length >= 2) {
                select.forEach(s => {
                    if(s.value !== "") {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "shift";
                        input.value = `${p.dataset.id}:${o.dataset.id}:${s.value}`;
                        shifts.appendChild(input);
                    }
                })
            }
        })
    })
	
	const csrf = document.querySelector("input[name='_csrf']");
	if (csrf) {
	  const csrfInput = document.createElement("input");
	  csrfInput.type = "hidden";
	  csrfInput.name = "_csrf";
	  csrfInput.value = csrf.value;
	  form.appendChild(csrfInput);
	}
    
    console.log(shifts);
    
    form.action = "/completeEditShift";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();
}

function selectlogic(cell,d) {
    console.log("ssss");
    
    const member = document.querySelectorAll(".member-hidden");
    if (cell.value === "") {
      const nextElem = cell.nextElementSibling;
      
      if (nextElem && nextElem.classList.contains("def")) {
          cell.classList.add("def");
          nextElem.remove();
      }
    } else {
      cell.classList.remove("def");
      const i = document.createElement("select");
      i.className = "input-cell def";
      member.forEach(m => {
        const op = document.createElement("option");
        op.value = m.value;
        op.innerHTML = m.value;
        i.appendChild(op);
      })
      const opt = document.createElement("option");
      opt.value = "";
      opt.innerHTML = "選択無し";
      opt.selected = true;
      i.prepend(opt);
      i.addEventListener("change", function() {selectlogic(i,d)});
      d.appendChild(i);
    }
  }
  
  function defaultLogic(def,d) {
    const member = document.querySelectorAll(".member-hidden");
    if (def.value === "") {
      const nextElem = def.nextElementSibling;
      
      if (nextElem && nextElem.classList.contains("def")) {
          console.log("削除対象の要素:", nextElem); 
          def.value = "";
          def.classList.add("def");
          nextElem.remove();
      }
    } else {
      def.classList.remove("def");
      const i = document.createElement("select");
      i.className = "input-cell def";
      member.forEach(m => {
        const op = document.createElement("option");
        op.value = m.value;
        op.innerHTML = m.value;
        i.appendChild(op);
      })
      const option = document.createElement("option");
      option.value = "";
      option.innerHTML = "選択無し";
      option.selected = true;
      i.prepend(option);
      i.addEventListener("change", function() {selectlogic(i,d)});
      d.appendChild(i);
    }
  }


document.addEventListener("DOMContentLoaded",function() {
	const dates = document.querySelector(".dates");
	setDate(dates);
    renderCalendar();
    const viewP = document.createElement("p");
    const viewYear = document.getElementById("view-year");
    viewP.innerHTML = `${currentYear}年 ${currentMonth + 1}月`;
    viewYear.appendChild(viewP);

    const timePlan = document.querySelectorAll(".plan-hidden");

    timePlan.forEach(plan => {
        const to = plan.querySelector(".to");
        const from = plan.querySelector(".from");
        const name = plan.querySelector(".plan-name");
		if(name.value !== "" && from.value !== "" && to.value !== "") {
			createPlan(to.value, from.value, name.value, plan.id);
		}
    });

    const plans = document.querySelectorAll(".plan");
    for(let i = 0; i < plans.length; i++) {
        addTd();
    }


    const scrollParent = document.querySelector(".calendar-container");
    const scrollChild = document.querySelector(".time-plan");
    let isSyncing = false;

    function syncScroll(source, target) {
        if (!isSyncing) {
            isSyncing = true;
            requestAnimationFrame(() => {
                target.scrollTop = source.scrollTop;
                isSyncing = false;
            });
        }
    }
    
    scrollParent.addEventListener("scroll",function() {
        syncScroll(scrollParent, scrollChild);
    })

    scrollChild.addEventListener("scroll", function() {
        syncScroll(scrollChild, scrollParent);
    })

})

