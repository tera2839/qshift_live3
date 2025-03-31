const date = new Date();
let currentMonth;
let currentYear;

function setDate(v) {
    const value = v.split(":");
    
    currentYear = Number(value[0]);
    currentMonth = Number(value[1] - 1);
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
            d.classList.add("odd");
        } else {
            d.classList.add("even");
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
            d.classList.add("even");
        } else {
            d.classList.add("odd");
        }
        htmlday.appendChild(d);
    }
}

function menberAdd(m,index) {
        const menbers = document.querySelector(".menbers");
        const tr = document.createElement("div");
        const menber = document.createElement("div");
        menber.classList.add("men");
        menber.innerHTML = m;
        if(index % 2 === 0) {
            menber.classList.add("odd");
        } else {
            menber.classList.add("even");
        }
        tr.appendChild(menber);
        menbers.appendChild(tr);

        const shift = document.querySelector(".time");
        const shiftTr = document.createElement("tr");
        shiftTr.classList.add("shift");

        const monthYear = new Date(currentYear, currentMonth);
        const last = new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0);
        const lastDay = last.getDate();

        const shifts = document.querySelectorAll(".shift-hidden");
        for(let j = 0; j < lastDay; j++) {
            const shiftTd = document.createElement("td");
            shiftTd.className = m;
            shifts.forEach(s => {
                const value = s.value.split(":");
                if(value[3] === m && Number(value[2]) === j + 1) {
                    console.log(value[3]);
                    console.log(value[2]);
                    
                    const p = document.createElement("p");
                    p.innerHTML = `${value[0].substring(0,2)}:${value[0].substring(2,4)}~${value[1].substring(0,2)}:${value[1].substring(2,4)}`;
                    p.className = "shift-cell";
                    shiftTd.appendChild(p);
                    shiftTd.classList.add("in");
                }
            })
            
            shiftTr.appendChild(shiftTd);
        }
        shift.appendChild(shiftTr);

        scrollBottom();
}

function scrollBottom() {
    const menbers = document.querySelector(".menbers");
    requestAnimationFrame(() => {
        menbers.scrollTop = menbers.scrollHeight;
    });
}

document.addEventListener("DOMContentLoaded",function() {

    const date = document.querySelector(".date-hidden");
    setDate(date.value);

    renderCalendar();

    const memberhiddens = document.querySelectorAll(".member-hidden");
    memberhiddens.forEach((m,index)=> {
		if(m.value !== "") {
			menberAdd(m.value,index);
		}
    })
    
    const viewP = document.createElement("p");
    const viewYear = document.getElementById("view-year");
    viewP.innerHTML = `${currentYear}年 ${currentMonth + 1}月`;
    viewYear.appendChild(viewP);

    const scrollParent = document.querySelector(".calendar-container");
    const scrollChild = document.querySelector(".menbers");
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

