let flag = true;
function activeClick() {
  const humbar = document.querySelector(".humbar");
  const body = document.querySelector("body");
  let menu = document.querySelector(".menu");

  if (!menu) {
    menu = document.createElement("div");
    const nav = document.createElement("nav");
    const ol = document.createElement("ol");
    const top = document.createElement("li");
    const help = document.createElement("li")
    const logout = document.createElement("li");
    const form = document.createElement("li");
    top.innerHTML = "topへ";
    help.innerHTML = "ヘルプ";
    logout.innerHTML = "ログアウト";
    form.innerHTML = "お問い合わせ";
    ol.appendChild(top);
    ol.appendChild(help);
    ol.appendChild(logout);
    ol.appendChild(form);
    nav.appendChild(ol);
    menu.appendChild(nav);
    
    menu.classList.add("menu");
    body.prepend(menu);
  }
  humbar.classList.toggle("active");

  if(flag) {
    menu.classList.add("on");
    menu.classList.remove("off");
    flag = false;
  } else {
    menu.classList.add("off");
    menu.classList.remove("on");

    setTimeout(() => {
      menu.classList.remove("off");
    }, 300);
    flag = true;
  }
 
}