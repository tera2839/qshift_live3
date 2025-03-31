document.addEventListener("DOMContentLoaded", function () {
    const urlElement = document.querySelector(".url-hidden .url");
    if (!urlElement) {
        console.error("hidden input の URL が見つかりません");
        return;
    }

    const url = urlElement.value;
    setCode(url);
});

function setCode(u) {
    const qrBox = document.querySelector(".qr-code");
    const urlBox = document.querySelector(".code-text");

    const qr = new QRCode(qrBox, {
        text: u,
        width: 150,
        height: 150
    });
    qr.makeCode(u); 

    urlBox.innerHTML = u;
    urlBox.href = u;
}
