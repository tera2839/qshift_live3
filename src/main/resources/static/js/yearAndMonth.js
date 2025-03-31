const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function setOption(Year,Month) {
    console.log(Year);//2025
    console.log(Month);//1

    const htmlMonth = document.querySelector(".month");
    const htmlyear = document.querySelector(".year");
    const nowYear = document.createElement("option");
    const nextYaer = document.createElement("option");

    nowYear.value = Year;
    nowYear.innerHTML = Year;
    nextYaer.value = Year + 1;
    nextYaer.innerHTML = Year + 1;

    htmlyear.appendChild(nowYear);
    htmlyear.appendChild(nextYaer);

    for(let i = Month; i < 12; i++) {
        const getMonth = document.createElement("option");
        getMonth.value = i + 1;
        getMonth.innerHTML = i + 1;
        htmlMonth.appendChild(getMonth);
    }

    htmlyear.addEventListener("change", function() {
        selectChange();
    })
    
}

let flagSelect = true;
function selectChange() {
    const htmlMonth = document.querySelector(".month");
    htmlMonth.innerHTML = "";
    if(flagSelect) {
        
        for(let i = 0; i < 12; i++) {
            const getMonth = document.createElement("option");
            getMonth.value = i + 1;
            getMonth.innerHTML = i + 1;
            htmlMonth.appendChild(getMonth);
        }
        flagSelect = false;
    } else {
        for(let i = currentMonth; i < 12; i++) {
            const getMonth = document.createElement("option");
            getMonth.value = i + 1;
            getMonth.innerHTML = i + 1;
            htmlMonth.appendChild(getMonth);
        }
        flagSelect = true;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    setOption(currentYear,currentMonth);
})