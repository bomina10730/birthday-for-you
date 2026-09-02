/* =========================
   요소 가져오기
========================= */

const helloButton =
    document.getElementById("helloButton");

const curtain =
    document.getElementById("curtain");

const intro =
    document.querySelector(".intro");

const vvipScreen =
    document.getElementById("vvipScreen");


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

/* ==================================================
   아니요 페이지 요소
================================================== */

const noButton =
    document.getElementById("noButton");

const noScreen =
    document.getElementById("noScreen");

const sceneHuh =
    document.getElementById("sceneHuh");

const sceneCharacter =
    document.getElementById("sceneCharacter");

const sceneGetout =
    document.getElementById("sceneGetout");

const sceneFeet =
    document.getElementById("sceneFeet");

const waitButton =
    document.getElementById("waitButton");


/* ==================================================
   효과음
================================================== */

const huhSound = document.getElementById("huhSound");
const getoutSound = new Audio("sound/GETOUT.mp3");
const hmmSound = document.getElementById("hmmSound");

huhSound.preload = "auto";
getoutSound.preload = "auto";
hmmSound.preload = "auto";


/* ==================================================
   효과음 재생 함수
================================================== */

function playSound(sound) {

    sound.pause();
    sound.currentTime = 0;

    const playPromise = sound.play();

    if (playPromise !== undefined) {

        playPromise.catch(function (error) {

            console.log(
                "오디오 재생 실패:",
                error
            );

        });

    }
}


/* ==================================================
   퍽 소리 여러 개 준비
   → Smack.mp3를 겹쳐서 빠르게 재생
================================================== */

const thumpSounds = [];

for (let i = 0; i < 6; i++) {

    const sound =
        new Audio("sound/Smack.mp3");

    sound.preload = "auto";

    thumpSounds.push(sound);

}


/* ==================================================
   퍽퍽 상태
================================================== */

let isThumping = false;

let thumpInterval = null;

let thumpIndex = 0;


/* ==================================================
   퍽 한 번 재생
================================================== */

function playThump() {

    if (!isThumping) {
        return;
    }


    /* 사용할 소리 선택 */

    const sound =
        thumpSounds[thumpIndex];


    /* 다음 소리로 이동 */

    thumpIndex++;

    if (thumpIndex >= thumpSounds.length) {
        thumpIndex = 0;
    }


    /* 처음부터 재생 */

    sound.currentTime = 0;

    sound.play()
        .catch(function (error) {

            console.log(
                "Smack.mp3 재생 실패:",
                error
            );

        });

}


/* ==================================================
   퍽퍽퍽퍽 시작
================================================== */

function startThumping() {

    /* 혹시 기존 반복이 있다면 제거 */

    clearInterval(thumpInterval);


    isThumping = true;


    /* 첫 번째 퍽 */

    playThump();


    /*
       0.15초마다 반복

       퍽!
       퍽!
       퍽!
       퍽!
    */

    thumpInterval =
        setInterval(function () {

            playThump();

        }, 800);

}


/* ==================================================
   퍽퍽 완전히 정지
================================================== */

function stopThumping() {

    isThumping = false;


    clearInterval(thumpInterval);

    thumpInterval = null;


    /* 모든 퍽 소리 정지 */

    thumpSounds.forEach(function (sound) {

        sound.pause();

        sound.currentTime = 0;

    });

}


/* ==================================================
   아니요 버튼 클릭
================================================== */

noButton.addEventListener("click", function () {


    /* 중복 클릭 방지 */

    noButton.disabled = true;


    /* 혹시 이전 퍽퍽이 남아있다면 정지 */

    stopThumping();


    /* 기존 장면 초기화 */

    sceneHuh.classList.remove("active");

    sceneCharacter.classList.remove("active");

    sceneGetout.classList.remove("active");

    sceneFeet.classList.remove("active");

    sceneFeet.classList.remove("hit");

    waitButton.classList.remove("show");


    /* ==================================================
       VVIP 화면 숨기기
    ================================================== */

    vvipScreen.classList.remove("show");


    /* ==================================================
       아니요 화면 보여주기
    ================================================== */

    noScreen.classList.add("show");


    /* ==================================================
       ① 하?
    ================================================== */

    sceneHuh.classList.add("active");

    huhSound.currentTime = 0;
    huhSound.play().catch(function(error) {
        console.log("huh 재생 실패:", error);
    });

    /* ==================================================
       ② 겔아웃!
       
       하? 후 0.8초
    ================================================== */

    setTimeout(function () {


        sceneHuh.classList.remove("active");


        sceneGetout.classList.add("active");


        getoutSound.currentTime = 0;

        getoutSound.play()
            .catch(function (error) {

                console.log(
                    "GETOUT.mp3 재생 실패:",
                    error
                );

            });


    }, 800);


    /* ==================================================
       ③ 캐릭터 등장
       
       겔아웃 후 0.7초
    ================================================== */

    setTimeout(function () {


        sceneGetout.classList.remove("active");


        sceneCharacter.classList.add("active");


    }, 0);


    /* ==================================================
       ④ 발 사진 등장
       
       캐릭터 등장 후 1.2초
    ================================================== */

   setTimeout(function () {

      sceneFeet.classList.add("active");

   }, 2700);


    /* ==================================================
       ⑤ 퍽퍽 시작
    ================================================== */

    setTimeout(function () {


        sceneFeet.classList.add("hit");


        startThumping();


    }, 2200);


    /* ==================================================
       ⑥ 잠시만요ㅠㅠ
       
       퍽퍽 시작 후 1초
    ================================================== */

    setTimeout(function () {


        waitButton.classList.add("show");


    }, 4100);

});


/* ==================================================
   잠시만요ㅠㅠ 클릭
================================================== */

waitButton.addEventListener("click", function () {


    /* ==================================================
       퍽퍽 완전히 정지
    ================================================== */

    stopThumping();


    /* ==================================================
       다른 효과음 정지
    ================================================== */

    huhSound.pause();

    huhSound.currentTime = 0;


    getoutSound.pause();

    getoutSound.currentTime = 0;


    /* ==================================================
       아니요 화면 숨기기
    ================================================== */

    noScreen.classList.remove("show");


    /* ==================================================
       장면 초기화
    ================================================== */

    sceneHuh.classList.remove("active");

    sceneCharacter.classList.remove("active");

    sceneGetout.classList.remove("active");

    sceneFeet.classList.remove("active");

    sceneFeet.classList.remove("hit");

    waitButton.classList.remove("show");


    /* ==================================================
       VVIP 화면으로 복귀
    ================================================== */

    vvipScreen.classList.add("show");

    /* =========================
    흐음? 효과음
    ========================= */

    hmmSound.currentTime = 0;
    hmmSound.play().catch(function(error) {
        console.log("hmm 재생 실패:", error);
    });

vvipScreen.classList.add("show");

    /* ==================================================
       아니요 버튼 다시 활성화
    ================================================== */

    noButton.disabled = false;

});