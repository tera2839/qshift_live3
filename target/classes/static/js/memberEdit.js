let currentMonth;
let currentYear;

function setDate(year,month) {
    currentYear = Number(year);
    currentMonth = Number(month) - 1;
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
            d.className = "odd";
        } else {
            d.className = "even";
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
        const input = document.createElement("input");
        td.className = "time-cell";
        td.dataset.id = i + 1;

        input.type = "text";
        input.className = "input-cell";
        input.placeholder = "0人";
        input.setAttribute("value","");

        td.appendChild(input);

        input.addEventListener("change", function() {
            if(input.value.length === 0) {
                input.value = "";
                input.classList.toggle("in1");
            } else {
                input.value = input.value.replace(/人$/, "") + "人";
                input.classList.toggle("in1");
            }
        })

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
    const plans = document.querySelectorAll(".plan");
    const cells = document.querySelectorAll(".cells");
    const form = document.createElement("form");

    plans.forEach(p => {
        const planId = p.dataset.id;

        cells.forEach(cs => {
            const cellId = cs.dataset.id;

            if (planId === cellId) { 
                const cellElements = cs.querySelectorAll(".time-cell");

                cellElements.forEach(c => {
                    const input = c.querySelector("input");
                    if (input && input.value.length !== 0 && c.classList.contains("in-shift")) {
                        const hiddenInput = document.createElement("input");
                        hiddenInput.type = "hidden";
                        hiddenInput.name = "request";
                        const num = input.value.substring(input.value - 1, 1);
						const mon = currentMonth + 1;
                        hiddenInput.value = `${currentYear}${String(mon).padStart(2, "0")}${String(c.dataset.id).padStart(2, "0")}:${p.dataset.id}`;
                        form.appendChild(hiddenInput);
                    }
                });
            }
        });
    });
	
	const csrf = document.querySelector("input[name='_csrf']");
	  if (csrf) {
	    const csrfInput = document.createElement("input");
	    csrfInput.type = "hidden";
	    csrfInput.name = "_csrf";
	    csrfInput.value = csrf.value;
	    form.appendChild(csrfInput);
	  }
	  
	const year = document.createElement("input");
	const month = document.createElement("input");
	
	year.type = "hidden";
	year.name = "year";
	year.value = currentYear;
	month.type = "hidden";
	month.name = "month";
	month.value = currentMonth;
	
	form.appendChild(year);
	form.appendChild(month);

    console.log(form);
    	
     form.action = "/completeMemberEdit";
     form.method = "POST"; 
     form.className = "none";
     document.body.appendChild(form); 
     form.submit();
	 form.remove();
}

function setPeople(n) {
    const value = n.split(":");
    const planid = value[0];
    const date = value[1];
    const num = value[2];

    const timePlans = document.querySelectorAll(".cells");
    timePlans.forEach(t => {
        if(t.dataset.id === planid) {
            const dates = t.querySelectorAll(".time-cell");
            dates.forEach(d => {
                if(d.dataset.id === date) {
                    d.classList.add("odd");
                    const input = d.querySelector("input");
                    input.setAttribute("value",`${num}人`);
                    input.addEventListener("input", (event) => event.preventDefault());
                    d.addEventListener("click", function() {
                      d.classList.toggle("in-shift");
                    })
                }
            })
        }
    })
}

function setShift(shift) {
  const values = shift.value.split(":");
  const date = values[0];
  const plan = values[1];

  const cells = document.querySelectorAll(".cells");
  cells.forEach(cs => {
    const dates = cs.querySelectorAll(".time-cell");
    if(cs.dataset.id === plan) {
      dates.forEach(d => {
        if(d.dataset.id === date) {
          d.classList.add("in-shift");
        }
      })
    }
  })
}

const load = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => {
        i.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, '');
        })
    })
}

document.addEventListener("DOMContentLoaded",function() {
    
    const year = document.querySelector(".year-hidden");
    const month = document.querySelector(".month-hidden");
    setDate(year.value,month.value);
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
        if(name.value !== "") {
            createPlan(to.value, from.value, name.value, plan.id);
        }
    });

    const plans = document.querySelectorAll(".plan");
    
    for(let i = 0; i < plans.length; i++) {
        addTd();
    }


    const nums = document.querySelectorAll(".select-hidden");
    nums.forEach(n => {
        setPeople(n.value);
    })
    


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

    const shifts = document.querySelectorAll(".shift-hidden");
    if(shifts.length !== 0) {
      shifts.forEach(s => {
        setShift(s);
      })
    }
    

    load();
})

