/* =========================
   요소 가져오기
========================= */

const helloButton =
    document.getElementById("helloButton");

const curtain =
    document.getElementById("curtain");

const intro =
    document.querySelector(".intro");


/* =========================
   커튼 효과음
========================= */

const curtainSound =
    new Audio("sound/Elegant.mp3");


/* =========================
   입장하기 클릭
========================= */

helloButton.addEventListener("click", function () {

    /* 버튼 중복 클릭 방지 */
    helloButton.disabled = true;


    /* =========================
       효과음 재생
    ========================= */

    curtainSound.currentTime = 0;
    curtainSound.play();


    /* =========================
       입장하기 화면 숨기기
    ========================= */

    intro.classList.add("hide");


    /* =========================
       커튼 보여주기
    ========================= */

    curtain.classList.add("show");


    /* =========================
       커튼 열기
    ========================= */

    requestAnimationFrame(function () {

        curtain.classList.add("open");

    });

});