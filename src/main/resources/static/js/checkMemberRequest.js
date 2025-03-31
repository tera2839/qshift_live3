const memberSet = () => {
    const members = document.querySelectorAll(".member-hidden");
    const memberBox = document.querySelector(".members");
    members.forEach(mem => {
        const p = document.createElement("p");
        p.className = "member";
        p.innerHTML = mem.value;
        memberBox.appendChild(p);
    })
}

const noneMemberSet = () => {
    const members = document.querySelectorAll(".noneMember-hidden");

    const memberBox = document.querySelector(".noneMembers");
    members.forEach(mem => {
        const p = document.createElement("p");
        p.className = "noneMember";
        p.innerHTML = mem.value;
        memberBox.appendChild(p);
    })
}

function subForm() {
    const form = document.querySelector("form");
    form.submit();
}

document.addEventListener("DOMContentLoaded", function() {
    memberSet();
    noneMemberSet();
})