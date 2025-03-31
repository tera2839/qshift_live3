document.addEventListener("DOMContentLoaded", function() {
    const shareButton = document.querySelector(".share");
    shareButton.addEventListener("click", async () => {
        const url = document.querySelector(".url").value;
        const text = "各従業員はシフトを提出してください";
        const title = "クイックシフト:シフト提出";

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
                console.log("share success");
            } catch (error) {
                console.error("共有エラー:", error);
            }
        } else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
                alert("URLをコピーしました！");
            } catch (error) {
                console.error("コピーエラー:", error);
                document.querySelector(".error").innerText = "コピーに失敗しました";
            }
        } else {
            const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            const lineURL = `https://line.me/R/msg/text/?${encodeURIComponent(text + "\n" + url)}`;
            
            document.querySelector(".error").innerHTML = `
                共有ができません。代わりに下記のリンクを使用してください:<br>
                <a href="${twitterURL}" target="_blank">Twitterで共有</a><br>
                <a href="${lineURL}" target="_blank">LINEで共有</a>
            `;
        }
    });
});
