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

const yesButton = 
    document.getElementById("yesButton"); 

const yesScreen = 
    document.getElementById("yesScreen"); 

const kujiScreen = document.getElementById("kujiScreen");

// =========================
// KUJI 선택 기능
// STEP 1
// =========================

const kujiItems =
    document.querySelectorAll(".kuji-item");

const kujiSelectButton =
    document.getElementById("kujiSelectButton");

let selectedKuji = null;


// =========================
// 쿠지 클릭
// =========================

kujiItems.forEach(function (kuji, index) {

    kuji.addEventListener("click", function () {

        // 이미 선택된 쿠지를 다시 누른 경우
        if (selectedKuji === kuji) {
            return;
        }


        // 이전 선택 해제
        kujiItems.forEach(function (item) {

            item.classList.remove("selected");

        });


        // 현재 쿠지 선택
        kuji.classList.add("selected");

        selectedKuji = kuji;


        // 선택하기 버튼 등장
        kujiSelectButton.classList.add("show");


        console.log(
            "현재 선택한 KUJI:",
            index + 1
        );

    });

});

// ==================================================
// KUJI 선택하기 버튼
// STEP 2 → 중앙 이동
// ==================================================

const kujiOverlay =
    document.getElementById("kujiOverlay");


kujiSelectButton.addEventListener("click", function () {

    // 쿠지를 선택하지 않았다면 종료
    if (!selectedKuji) {
        return;
    }

    // 선택한 쿠지 위치 가져오기
    const rect =
        selectedKuji.getBoundingClientRect();

    const startX =
        rect.left + rect.width / 2;

    const startY =
        rect.top + rect.height / 2;

    // 현재 위치 저장
    selectedKuji.style.setProperty(
        "--kuji-start-x",
        startX + "px"
    );

    selectedKuji.style.setProperty(
        "--kuji-start-y",
        startY + "px"
    );

    selectedKuji.style.setProperty(
        "--kuji-start-width",
        rect.width + "px"
    );

    // 선택하기 버튼 숨기기
    kujiSelectButton.classList.remove("show");

    // 검은 배경 보여주기
    kujiOverlay.classList.add("show");

    // 중앙 이동 시작
    selectedKuji.classList.add("moving");

    // 중앙으로 이동
    requestAnimationFrame(function () {

    requestAnimationFrame(function () {

        selectedKuji.classList.add("center");


        // =========================
        // 중앙에 도착한 뒤 결과판 준비
        // =========================

        setTimeout(function () {

            createKujiReveal();

        }, 850);

    });

});

});

// ==================================================
// KUJI STEP 3
// 결과 이미지 + 왼쪽 → 오른쪽 스와이프
// ==================================================

// ==================================================
// KUJI STEP 3
// 결과 이미지 뒤에 깔기
// ==================================================

function createKujiReveal() {

    if (!selectedKuji) {
        return;
    }

    // 이미 만들어졌다면 종료
    if (
        selectedKuji.querySelector(".kuji-result")
    ) {
        return;
    }

    // =========================
    // 결과 이미지 만들기
    // =========================

    const result =
        document.createElement("div");

    result.className = "kuji-result";


    const resultImage =
        document.createElement("img");


    // ★ 결과판 이미지
    resultImage.src = "img/kuji2.png";

    resultImage.alt = "쿠지 결과";


    result.appendChild(resultImage);


    // =========================
    // 결과판을 쿠지 맨 뒤에 넣기
    // =========================

    selectedKuji.insertBefore(
        result,
        selectedKuji.firstChild
    );


    console.log("KUJI 결과판 준비 완료!");
}


// =========================
// 생일 노래
// =========================

const birthdaySound = 
    new Audio("sound/birthday.mp3");

birthdaySound.preload = "auto";


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

        setTimeout(function () {

            vvipScreen.classList.add("show");

        }, 1200);

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

const huhSound = new Audio("sound/huh.mp3");
const getoutSound = new Audio("sound/GETOUT.mp3");
const hmmSound = new Audio("sound/hmm.mp3");

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

noButton.addEventListener("click", () => {

curtainSound.pause();
curtainSound.currentTime = 0;


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


    }, 5000);

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


    /* ==================================================
       아니요 버튼 다시 활성화
    ================================================== */

    noButton.disabled = false;

});

// =========================
// YES 버튼
// =========================

yesButton.addEventListener("click", () => {

    // 커튼 음악 정지
    curtainSound.pause();
    curtainSound.currentTime = 0;


    // VVIP 화면 숨기기
    vvipScreen.classList.remove("show");


    // YES 화면 보여주기
    yesScreen.classList.add("show");


    // =========================
    // 생일 노래 시작
    // =========================

    birthdaySound.currentTime = 0;

    birthdaySound.play().catch((error) => {
        console.log("생일 노래 재생 실패:", error);
    });


    // =========================
    // 폭죽 시작
    // =========================

    startFireworks();


// =========================
// 사진 + 메시지 시작
// =========================

setTimeout(() => {

    startMemories();

}, 6000);


// =========================
// 24초 후 쿠지판으로 이동
// =========================

setTimeout(() => {

    yesScreen.classList.remove("show");
    kujiScreen.classList.add("show");

}, 24000);

});

// =========================
// 사진 + 메시지
// =========================

const memories = document.querySelectorAll(".memory");

let memoryTimers = [];


function startMemories() {

    // 혹시 이전 타이머가 있다면 제거
    memoryTimers.forEach((timer) => {
        clearTimeout(timer);
    });

    memoryTimers = [];


    // 처음에는 모든 장면 숨기기
    memories.forEach((memory) => {
        memory.classList.remove("show");
    });


    // =========================
    // 사진 + 메시지 1
    // 6초부터
    // =========================

    memoryTimers.push(
        setTimeout(() => {

            showMemory(0);

        }, 0)
    );


    // =========================
    // 사진 + 메시지 2
    // 10.5초부터
    // =========================

    memoryTimers.push(
        setTimeout(() => {

            showMemory(1);

        }, 4500)
    );


    // =========================
    // 사진 + 메시지 3
    // 15초부터
    // =========================

    memoryTimers.push(
        setTimeout(() => {

            showMemory(2);

        }, 9000)
    );


    // =========================
    // 사진 + 메시지 4
    // 19.5초부터
    // =========================

    memoryTimers.push(
        setTimeout(() => {

            showMemory(3);

        }, 13500)
    );

}


function showMemory(index) {

    // 모든 장면 숨기기
    memories.forEach((memory) => {
        memory.classList.remove("show");
    });


    // 해당 장면 보여주기
    if (memories[index]) {

        memories[index].classList.add("show");

    }

}


// ==================================================
// 폭죽
// ==================================================


// =========================
// 폭죽 컨테이너
// =========================

const fireworkContainer =
    document.getElementById("fireworkContainer");

let fireworkInterval = null;


// =========================
// 폭죽 하나 만들기
// =========================

function createFirework() {

    // 폭죽 컨테이너가 없으면 종료
    if (!fireworkContainer) {

        console.log(
            "폭죽 컨테이너를 찾을 수 없습니다."
        );

        return;
    }


    // =========================
    // 폭죽 생성
    // =========================

    const firework =
        document.createElement("div");

    firework.classList.add("firework");


    // =========================
    // 폭죽 색상
    // 노랑 / 주황 / 빨강
    // =========================

    const fireworkColors = [

        "#FFD95A",
        "#FF9F43",
        "#FF6B5E"

    ];


    const randomColor =
        fireworkColors[
            Math.floor(
                Math.random() *
                fireworkColors.length
            )
        ];


    firework.style.setProperty(
        "--firework-color",
        randomColor
    );


    // =========================
    // 폭죽 위치
    // =========================

    const x =
        Math.random() * 80 + 10;

    const y =
        Math.random() * 65 + 8;


    firework.style.left =
        `${x}%`;

    firework.style.top =
        `${y}%`;


    // 폭죽을 화면에 추가
    fireworkContainer.appendChild(
        firework
    );


    // =========================
    // 빛줄기
    // =========================

    const rayCount = 14;


    for (
        let i = 0;
        i < rayCount;
        i++
    ) {

        const ray =
            document.createElement("span");


        ray.classList.add(
            "firework-ray"
        );


        const angle =
            (360 / rayCount) * i;


        ray.style.setProperty(
            "--angle",
            `${angle}deg`
        );


        firework.appendChild(
            ray
        );

    }


    // =========================
    // 작은 반짝이
    // =========================

    const sparkCount = 10;


    for (
        let i = 0;
        i < sparkCount;
        i++
    ) {

        const spark =
            document.createElement("span");


        spark.classList.add(
            "firework-spark"
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            35 +
            Math.random() *
            55;


        const sparkX =
            Math.cos(angle) *
            distance;


        const sparkY =
            Math.sin(angle) *
            distance;


        spark.style.setProperty(
            "--spark-x",
            `${sparkX}px`
        );


        spark.style.setProperty(
            "--spark-y",
            `${sparkY}px`
        );


        firework.appendChild(
            spark
        );

    }


    // =========================
    // 1초 후 폭죽 삭제
    // =========================

    setTimeout(() => {

        firework.remove();

    }, 1000);

}


// =========================
// 폭죽 시작
// =========================

function startFireworks() {

    if (!fireworkContainer) {

        console.log(
            "fireworkContainer가 없습니다."
        );

        return;
    }


    // 혹시 기존 폭죽이 있다면 정리
    if (fireworkInterval) {

        clearInterval(
            fireworkInterval
        );

        fireworkInterval = null;

    }


    // 바로 폭죽 하나
    createFirework();


    // 0.42초마다 폭죽 생성
    fireworkInterval =
        setInterval(() => {

            createFirework();

        }, 420);

}


// =========================
// 폭죽 종료
// =========================

function stopFireworks() {

    if (fireworkInterval) {

        clearInterval(
            fireworkInterval
        );

        fireworkInterval = null;

    }


    if (fireworkContainer) {

        fireworkContainer.innerHTML = "";

    }

}

// ==================================================
// KUJI 스와이프
// 마우스 + 터치
// 왼쪽 → 오른쪽으로 벗기기
// ==================================================

function startKujiSwipe(front) {

    let isDragging = false;
    let currentProgress = 0;


    // =========================================
    // 시작
    // =========================================

    front.addEventListener("pointerdown", function (event) {

        if (currentProgress >= 100) {
            return;
        }

        isDragging = true;

        front.setPointerCapture(event.pointerId);

        front.classList.add("tearing");

        event.preventDefault();

    });


    // =========================================
    // 이동
    // =========================================

    front.addEventListener("pointermove", function (event) {

        if (!isDragging) {
            return;
        }


        const rect =
            front.getBoundingClientRect();


        // 쿠지의 왼쪽 끝에서
        // 현재 마우스 위치까지의 거리

        const moveX =
            event.clientX - rect.left;


        // 전체 쿠지 너비에서
        // 얼마나 이동했는지 %

        let progress =
            (moveX / rect.width) * 100;


        // 0 ~ 100 사이로 제한

        progress =
            Math.max(
                0,
                Math.min(100, progress)
            );


        currentProgress = progress;


        // 앞면 벗기기

        front.style.setProperty(
            "--tear-progress",
            progress + ""
        );

    });


    // =========================================
    // 끝
    // =========================================

    function finishSwipe(event) {

        if (!isDragging) {
            return;
        }

        isDragging = false;


        try {
            front.releasePointerCapture(event.pointerId);
        } catch (error) {
            // 무시
        }


        // 65% 이상 밀었으면
        // 끝까지 자동으로 벗기기

        if (currentProgress >= 65) {

            front.style.setProperty(
                "--tear-progress",
                "100"
            );

            currentProgress = 100;


            setTimeout(function () {

                front.classList.remove(
                    "tearing"
                );

                console.log(
                    "KUJI 찢기 완료!"
                );

            }, 350);

        }

    }


    front.addEventListener(
        "pointerup",
        finishSwipe
    );


    front.addEventListener(
        "pointercancel",
        finishSwipe
    );

}