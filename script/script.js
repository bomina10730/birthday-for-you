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
// KUJI 상 랜덤 배치
// =========================

const kujiPrizes = [
    "A",
    "B",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5"
];


// =========================
// 랜덤 섞기 함수
// =========================

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        const temp =
            result[i];

        result[i] =
            result[randomIndex];

        result[randomIndex] =
            temp;
    }

    return result;
}


// =========================
// 실제 랜덤 배치
// =========================

const shuffledPrizes =
    shuffle(kujiPrizes);


// =========================
// 각각의 쿠지에 상 저장
// =========================

kujiItems.forEach(function (kuji, index) {

    kuji.dataset.prize =
        shuffledPrizes[index];

});


// =========================
// 결과 확인
// =========================

console.log(
    "이번 쿠지 상 배치:",
    shuffledPrizes
);

// =========================
// KUJI 실제 상 정보
// =========================

const kujiPrizeInfo = {

    A: {
        title: "A상",
        text: "지갑"
    },

    B: {
        title: "B상",
        text: "미정"
    },

    C: {
        title: "C상",
        text: "체인소맨 랜덤 아크릴"
    },

    D: [
        {
            title: "D상",
            text: "모든걸 미나가 다 에스코드 해주는 데이트권"
        },
        {
            title: "D상",
            text: "칭찬 편지 써주기 쿠폰권"
        }
    ],

    E: {
        title: "E상",
        text: "{보너스 쿠지}"
    },

    F1: {
        title: "F상",
        text: "내 반쪽"
    },

    F2: {
        title: "F상",
        text: "서준이"
    },

    F3: {
        title: "F상",
        text: "생일"
    },

    F4: {
        title: "F상",
        text: "축하해"
    },

    F5: {
        title: "F상",
        text: "♡"
    }

};

    // ==================================================
    // D상 고정 배정 카운트
    // D상 2개를 각각 한 번씩 사용
    // ==================================================

    let dPrizeCount = 0;


// =========================
// 쿠지 클릭
// =========================

kujiItems.forEach(function (kuji, index) {

    kuji.addEventListener("click", function () {

        // ==================================================
        // 이미 뽑힌 쿠지는 다시 선택할 수 없음
        // ==================================================

        if (kuji.classList.contains("opened")) {
            return;
        }


        // ==================================================
        // 이미 현재 선택된 쿠지를 다시 누른 경우
        // ==================================================

        if (selectedKuji === kuji) {
            return;
        }


        // ==================================================
        // 현재 아직 뽑히지 않은 쿠지 찾기
        // opened가 없는 쿠지만 남은 쿠지
        // ==================================================

        const remainingKuji =
            Array.from(kujiItems).filter(function (item) {

                return !item.classList.contains("opened");

            });


    // ==================================================
    // 남은 쿠지가 3개일 때
    // E상이 2개 이상 남아 있다면
    // E상 하나를 먼저 뽑도록 함
    // ==================================================

    if (remainingKuji.length === 3) {

        const eKujiCount =
            remainingKuji.filter(function (item) {

                return item.dataset.prize === "E";

            }).length;


        // E상이 2개 이상 남아 있다면
        // E상이 아닌 쿠지는 선택 막기

        if (
            eKujiCount >= 2 &&
            kuji.dataset.prize !== "E"
        ) {

            console.log(
                "E상이 2개 남아있어 E상부터 뽑아야 합니다."
            );

            return;
        }

    }


        // ==================================================
        // 🔊 쿠지 선택 효과음
        // ==================================================

        kujiSelectSound.currentTime = 0;

        kujiSelectSound.play().catch(function (error) {

            console.log(
                "쿠지 선택 효과음 재생 실패:",
                error
            );

        });


        // ==================================================
        // 이전 선택 해제
        // ==================================================

        kujiItems.forEach(function (item) {

            item.classList.remove("selected");

        });


        // ==================================================
        // 현재 쿠지 선택
        // ==================================================

        kuji.classList.add("selected");

        selectedKuji = kuji;


        // ==================================================
        // 선택하기 버튼 등장
        // ==================================================

        kujiSelectButton.classList.add("show");


        // ==================================================
        // 콘솔 확인
        // ==================================================

        console.log(
            "현재 선택한 KUJI:",
            index + 1,
            "→ 당첨 상:",
            kuji.dataset.prize
        );

        console.log(
            "남은 쿠지:",
            remainingKuji.length
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

    if (!selectedKuji) {
        return;
    }

    // 🔊 선택하기 효과음
    kujiOpenSound.currentTime = 0;
    kujiOpenSound.play().catch(function (error) {
        console.log("쿠지 선택하기 효과음 재생 실패:", error);
    });

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

    selectedKuji.style.setProperty(
    "--kuji-start-height",
    rect.height + "px"
    );

    // 선택하기 버튼 숨기기
    kujiSelectButton.classList.remove("show");

    // 검은 배경 보여주기
    kujiOverlay.classList.add("show");

    // ⭐ 원래 쿠지 자리를 그대로 비워두기 위한 자리
    const placeholder = document.createElement("div");
    placeholder.className = "kuji-placeholder";
    placeholder.style.height = rect.height + "px";

    selectedKuji.parentNode.insertBefore(
        placeholder,
        selectedKuji
    );

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
// 결과 이미지 뒤에 깔기
// ==================================================

function createKujiReveal() {

    if (!selectedKuji) {
        return;
    }


    // 이미 결과판이 만들어졌다면 종료
    if (
        selectedKuji.querySelector(".kuji-result")
    ) {
        return;
    }


    // =========================
    // ① 쿠지 뒷면 결과판 만들기
    // =========================

    const result =
        document.createElement("div");

    result.className =
        "kuji-result";


    const resultImage =
        document.createElement("img");

    resultImage.src =
        "img/kuji2.png";

    resultImage.alt =
        "쿠지 결과";


    result.appendChild(
        resultImage
    );


    // =========================
    // ② 실제 당첨 상 가져오기
    // =========================

    const selectedPrize =
        selectedKuji.dataset.prize;


    // F1~F5 → F상으로 표시
    let prizeGradeText =
        selectedPrize;


    if (
        selectedPrize === "F1" ||
        selectedPrize === "F2" ||
        selectedPrize === "F3" ||
        selectedPrize === "F4" ||
        selectedPrize === "F5"
    ) {

        prizeGradeText = "F";

    }


// =========================
// ③ 찢긴 쿠지 위 표시
// =========================

const prizeGrade =
    document.createElement("div");

prizeGrade.className =
    "prize-grade";


// =========================
// F1~F5는 F상 대신
// 해당 메시지를 표시
// =========================

if (
    selectedPrize === "F1" ||
    selectedPrize === "F2" ||
    selectedPrize === "F3" ||
    selectedPrize === "F4" ||
    selectedPrize === "F5"
) {

    prizeGrade.classList.add("prize-grade-f");

    prizeGrade.innerHTML = `
        <span>${kujiPrizeInfo[selectedPrize].text}</span>
    `;

} else {

    prizeGrade.innerHTML = `
        <span>${prizeGradeText}</span>
        <small>상</small>
    `;

}


    result.appendChild(
        prizeGrade
    );


    // 결과판을 쿠지 가장 뒤에 넣기
    selectedKuji.insertBefore(
        result,
        selectedKuji.firstChild
    );


    // =========================
    // ④ 원래 쿠지 이미지 찾기
    // =========================

    const originalImage =
        selectedKuji.querySelector(
            ":scope > img"
        );


    if (!originalImage) {
        return;
    }


    // =========================
    // ⑤ 원래 쿠지를
    //    kuji-front 안에 넣기
    // =========================

    const front =
        document.createElement("div");

    front.className =
        "kuji-front";


    originalImage.parentNode.insertBefore(
        front,
        originalImage
    );


    front.appendChild(
        originalImage
    );


    // =========================
    // ⑥ 처음에는 쿠지 전체 보이기
    // =========================

    front.style.setProperty(
        "--tear-progress",
        "0"
    );


    // =========================
    // ⑦ ⭐⭐⭐ 스와이프 연결
    // =========================

    startKujiSwipe(front);


    console.log(
        "KUJI 결과판 + 스와이프 준비 완료!"
    );
}


// ==================================================
// KUJI 상 공개 순간 - 화려한 오렌지 팡! 효과
// ==================================================

function playPrizeBurst() {

    const burst = document.createElement("div");
    burst.className = "kuji-burst";

    document.body.appendChild(burst);


    // =========================
    // ① 큰 스파크 / 불꽃 파편
    // =========================

    for (let i = 0; i < 42; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "kuji-burst-particle";


        // 랜덤 방향
        const angle =
            Math.random() * Math.PI * 2;

        // 조금 더 멀리 터지게
        const distance =
            110 + Math.random() * 210;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        particle.style.setProperty(
            "--burst-x",
            x + "px"
        );

        particle.style.setProperty(
            "--burst-y",
            y + "px"
        );


        // 크기 랜덤
        const size =
            3 + Math.random() * 7;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        // 주황 / 금빛 / 흰색 랜덤
        const colors = [
            "#FF8A3D",
            "#FF9F43",
            "#FFC15A",
            "#FFD27A",
            "#FFF1C7",
            "#FFFFFF"
        ];

        particle.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        burst.appendChild(particle);
    }


    // =========================
    // ② 길게 뻗는 불꽃 스파크
    // =========================

    for (let i = 0; i < 18; i++) {

        const spark =
            document.createElement("span");

        spark.className =
            "kuji-burst-spark";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            130 + Math.random() * 190;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        spark.style.setProperty(
            "--spark-x",
            x + "px"
        );

        spark.style.setProperty(
            "--spark-y",
            y + "px"
        );


        spark.style.setProperty(
            "--spark-rotate",
            angle + "rad"
        );


        burst.appendChild(spark);
    }


    // =========================
    // ③ 별 반짝이
    // =========================

    for (let i = 0; i < 12; i++) {

        const star =
            document.createElement("span");

        star.className =
            "kuji-burst-star";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 190;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        star.style.setProperty(
            "--star-x",
            x + "px"
        );

        star.style.setProperty(
            "--star-y",
            y + "px"
        );


        burst.appendChild(star);
    }

    // =========================
// ④ 흰색 / 노란색 스파클
// =========================

for (let i = 0; i < 18; i++) {

    const sparkle =
        document.createElement("span");

    sparkle.className =
        "kuji-burst-sparkle";


    // 랜덤 방향
    const angle =
        Math.random() * Math.PI * 2;

    // 조금 멀리 튀어나가게
    const distance =
        70 + Math.random() * 190;

    const x =
        Math.cos(angle) * distance;

    const y =
        Math.sin(angle) * distance;


    sparkle.style.setProperty(
        "--sparkle-x",
        x + "px"
    );

    sparkle.style.setProperty(
        "--sparkle-y",
        y + "px"
    );


    // 크기 랜덤
    const size =
        0.7 + Math.random() * 0.8;

    sparkle.style.setProperty(
        "--sparkle-size",
        size
    );


    // 흰색 / 노란색 랜덤
    const sparkleColors = [
        "#FFFFFF",
        "#FFFDF0",
        "#FFF4B8",
        "#FFE27A"
    ];

    sparkle.style.background =
        sparkleColors[
            Math.floor(
                Math.random() *
                sparkleColors.length
            )
        ];


    // 살짝 다른 타이밍으로 튀어나오게
    sparkle.style.animationDelay =
        (Math.random() * 0.12) + "s";


    burst.appendChild(sparkle);
}


    // =========================
    // ④ 효과 삭제
    // =========================

    setTimeout(function () {

        burst.remove();

    }, 1200);
}


// =========================
// 생일 노래 → 쿠지 BGM 자연스럽게 연결
// =========================

let musicTransitionStarted = false;




// =========================
// 쿠지 선택 효과음
// =========================

const kujiSelectSound =
    new Audio("sound/kuji-select.mp3");

kujiSelectSound.preload = "auto";
kujiSelectSound.volume = 0.5;


// =========================
// 쿠지 선택하기 효과음
// =========================

const kujiOpenSound =
    new Audio("sound/kuji-open.mp3");

kujiOpenSound.preload = "auto";
kujiOpenSound.volume = 0.6;


// =========================
// 쿠지 종이 찢기 효과음
// =========================

const kujiTearSound =
    new Audio("sound/kuji-tear.mp3");

kujiTearSound.preload = "auto";
kujiTearSound.volume = 0.7;
kujiTearSound.playbackRate = 1;


// =========================
// 생일 노래
// =========================

const birthdaySound =
    new Audio("sound/birthday.mp3");

birthdaySound.preload = "auto";
birthdaySound.volume = 1;


// =========================
// 쿠지 BGM
// =========================

const kujiBgm =
    new Audio("sound/kuji-bgm.mp3");

kujiBgm.preload = "auto";
kujiBgm.loop = true;
kujiBgm.volume = 0.35;

// =========================
// 상 공개 빠밤! 효과음
// =========================

const prizeBurstSound =
    new Audio("sound/prize-burst.mp3");

prizeBurstSound.preload = "auto";
prizeBurstSound.volume = 0.8;


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

    // =========================
    // 쿠지 BGM 미리 재생
    // 모바일 / iPad 자동재생 방지
    // =========================

    kujiBgm.currentTime = 0;
    kujiBgm.volume = 0;

    kujiBgm.play().catch(function (error) {
        console.log("쿠지 BGM 초기 재생 실패:", error);
    });


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
    birthdaySound.volume = 1;

    // =========================
// 생일 노래 → 쿠지 BGM
// 마지막 2.5초 크로스페이드
// =========================

musicTransitionStarted = false;

const musicCheck = setInterval(function () {

    // 이미 전환했다면 종료
    if (musicTransitionStarted) {

        clearInterval(musicCheck);
        return;

    }


    // 생일 노래 길이를 아직 못 읽었으면 기다리기
    if (
        !Number.isFinite(birthdaySound.duration) ||
        birthdaySound.duration <= 0
    ) {

        return;

    }


    const remainingTime =
        birthdaySound.duration -
        birthdaySound.currentTime;


    // =========================
    // 마지막 2.5초
    // =========================

    if (
        remainingTime <= 2.5 &&
        remainingTime > 0
    ) {

        musicTransitionStarted = true;

        clearInterval(musicCheck);


        // =========================
        // 쿠지 화면으로 전환
        // =========================

        yesScreen.classList.remove("show");

        kujiScreen.classList.add("show");


        // =========================
        // 2.5초 크로스페이드
        // =========================

        const fadeDuration = 2500;

        const fadeStart =
            performance.now();


        function fadeMusic(now) {

            const progress =
                Math.min(
                    (now - fadeStart) /
                    fadeDuration,
                    1
                );


            // 생일 노래 ↓
            birthdaySound.volume =
                1 - progress;


            // 쿠지 BGM ↑
            kujiBgm.volume =
                0.35 * progress;


            if (progress < 1) {

                requestAnimationFrame(
                    fadeMusic
                );

            } else {

                // 생일 노래 완전히 종료
                birthdaySound.pause();

                birthdaySound.currentTime = 0;

                birthdaySound.volume = 1;


                // 쿠지 BGM 최종 볼륨
                kujiBgm.volume = 0.35;

            }

        }


        requestAnimationFrame(
            fadeMusic
        );

    }

}, 100);


// =========================
// 생일 노래 재생
// =========================

birthdaySound.play().catch(function (error) {

    console.log(
        "생일 노래 재생 실패:",
        error
    );

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

    // 찢기 시작 시간
    let tearStartTime = 0;


    // =========================================
    // 시작
    // =========================================

    front.addEventListener(
        "pointerdown",
        function (event) {

            if (currentProgress >= 100) {
                return;
            }

            isDragging = true;

            tearStartTime =
                performance.now();

            front.setPointerCapture(
                event.pointerId
            );

            front.classList.add(
                "tearing"
            );

            selectedKuji.classList.add(
                "tearing-start"
            );


            // =========================================
            // 🔊 종이 찢기 효과음
            // =========================================

            kujiTearSound.pause();
            kujiTearSound.currentTime = 0;
            kujiTearSound.playbackRate = 1;

            kujiTearSound.play().catch(
                function (error) {

                    console.log(
                        "쿠지 찢기 효과음 재생 실패:",
                        error
                    );

                }
            );


            event.preventDefault();

        }
    );


    // =========================================
    // 이동
    // =========================================

    front.addEventListener(
        "pointermove",
        function (event) {

            if (!isDragging) {
                return;
            }


            const rect =
                front.getBoundingClientRect();


            const moveX =
                event.clientX - rect.left;


            let progress =
                (moveX / rect.width) * 100;


            progress =
                Math.max(
                    0,
                    Math.min(
                        100,
                        progress
                    )
                );


            currentProgress =
                progress;


            // =========================================
            // 쿠지 앞면 벗기기
            // =========================================

            front.style.setProperty(
                "--tear-progress",
                progress + ""
            );


            // =========================================
            // 🔊 찢는 속도에 맞춰 효과음 배속
            // =========================================

            if (progress > 3) {

                const elapsed =
                    (
                        performance.now()
                        - tearStartTime
                    ) / 1000;


                const estimatedTotalTime =
                    elapsed /
                    (progress / 100);


                let playbackRate =
                    3 /
                    estimatedTotalTime;


                playbackRate =
                    Math.max(
                        0.5,
                        Math.min(
                            2.5,
                            playbackRate
                        )
                    );


                kujiTearSound.playbackRate =
                    playbackRate;

            }


            event.preventDefault();

        }
    );


    // =========================================
    // 끝
    // =========================================

    function finishSwipe(event) {

        if (!isDragging) {
            return;
        }

        isDragging = false;


        try {

            front.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {

            // 무시

        }


        // =========================================
        // 🔊 실제 찢은 시간 계산
        // =========================================

        const elapsed =
            (
                performance.now()
                - tearStartTime
            ) / 1000;


        if (elapsed > 0.1) {

            let finalRate =
                3 / elapsed;


            finalRate =
                Math.max(
                    0.5,
                    Math.min(
                        2.5,
                        finalRate
                    )
                );


            kujiTearSound.playbackRate =
                finalRate;

        }


        // =========================================
        // 40% 이상이면 끝까지 찢기
        // =========================================

        if (currentProgress >= 40) {

            front.style.setProperty(
                "--tear-progress",
                "100"
            );

            currentProgress = 100;


            // =========================================
            // 💥 상 공개 팡!
            // =========================================

            playPrizeBurst();


            // =========================================
            // 🔊 상 공개 효과음
            // =========================================

            prizeBurstSound.currentTime = 0;

            prizeBurstSound.play().catch(
                function (error) {

                    console.log(
                        "상 공개 효과음 재생 실패:",
                        error
                    );

                }
            );


            // =========================================
            // 0.35초 후 찢기 상태 제거
            // =========================================

            setTimeout(
                function () {

                    front.classList.remove(
                        "tearing"
                    );


                    // =========================================
                    // 1.2초 후 선물 결과
                    // =========================================

                    setTimeout(
                        function () {

                            showPrizeResult(
                                selectedKuji.dataset.prize
                            );

                            console.log(
                                "KUJI 선물 공개!"
                            );

                        },
                        1200
                    );

                },
                350
            );


        } else {

            // =========================================
            // 65% 미만이면 취소
            // =========================================

            kujiTearSound.pause();

            kujiTearSound.currentTime = 0;

            kujiTearSound.playbackRate = 1;

        }

    }


// ==================================================
// KUJI 최종 선물 결과
// ==================================================

function showPrizeResult(prize) {

    const resultBox =
        document.getElementById("kujiPrizeResult");

    const ribbon =
        document.querySelector(".kuji-result-ribbon");

    const title =
        resultBox.querySelector(
            ".prize-result-title"
        );

    const text =
        resultBox.querySelector(
            ".prize-result-text"
        );

    const bonusKujiButton =
        document.getElementById("bonusKujiButton");


    // =========================
    // 실제 당첨 정보 가져오기
    // =========================

    let prizeInfo =
        kujiPrizeInfo[prize];


    // ==================================================
    // D상은 2개를 각각 한 번씩 고정 배정
    // ==================================================

    if (prize === "D") {

        prizeInfo =
            kujiPrizeInfo.D[dPrizeCount];

        dPrizeCount++;

        // D상 2개를 모두 사용하면 다시 처음부터
        if (dPrizeCount >= kujiPrizeInfo.D.length) {

            dPrizeCount = 0;

        }

    }


    // =========================
    // 상단 고정 문구
    // =========================

    title.textContent =
        "SEOJUN'S BIRTHDAY KUJI";


    // =========================
    // 현재 상 + 선물 이름
    // =========================

    let grade =
        prizeInfo.title;


    // F1~F5는 모두 F상
    if (
        prize === "F1" ||
        prize === "F2" ||
        prize === "F3" ||
        prize === "F4" ||
        prize === "F5"
    ) {

        grade = "F상";

    }


    text.textContent =
        `${grade}  ${prizeInfo.text}`;


    // =========================
    // E상일 때만
    // "한 번 더 뽑기" 버튼 표시
    // =========================

    if (prize === "E") {

        bonusKujiButton.classList.add(
            "show"
        );

    } else {

        bonusKujiButton.classList.remove(
            "show"
        );

    }


    // =========================
    // 결과 화면에서는
    // 이미 전에 뽑힌 쿠지만 숨기기
    // 현재 뽑은 쿠지는 보여주기
    // =========================

    kujiItems.forEach(function (kuji) {

        if (
            kuji.classList.contains("opened") &&
            kuji !== selectedKuji
        ) {
            kuji.classList.add("result-hidden");
        }

    });


    // =========================
    // 결과 등장
    // =========================

    resultBox.classList.add(
        "show"
    );

    const resultBg =
        document.getElementById("kujiResultBg");

    resultBg.classList.add("show");

    if (ribbon) {
        ribbon.classList.add("show");
    }

    const resultRibbon =
        document.getElementById("kujiResultRibbon");

    resultRibbon.classList.add("show");


    // =========================
// E상이 아니면
// 4초 후 자동으로 쿠지판 복귀
// =========================

if (prize !== "E") {

    setTimeout(function () {

        // 결과창 닫기
        resultBox.classList.remove("show");

        document
            .querySelector(".kuji-result-ribbon")
            ?.classList.remove("show");

        if (ribbon) {
            ribbon.classList.remove("show");
        }

        const resultBg =
            document.getElementById("kujiResultBg");

        resultBg.classList.remove("show");

        const resultRibbon =
            document.getElementById("kujiResultRibbon");

        resultRibbon.classList.remove("show");

        // 반투명 배경 제거
        kujiOverlay.classList.remove("show");


        // ⭐ 열린 쿠지를 원래 자리로 복귀
        returnOpenedKujiToBoard();


        // 쿠지판 보여주기
        kujiScreen.classList.add("show");


        // 선택 초기화
        selectedKuji = null;

    }, 4000);

}

}


// ==================================================
// 마우스 / 터치 끝
// ==================================================

front.addEventListener(
    "pointerup",
    finishSwipe
);


front.addEventListener(
    "pointercancel",
    finishSwipe
);

}


bonusKujiButton.addEventListener(
    "click",
    function () {

        const resultBox =
            document.getElementById(
                "kujiPrizeResult"
            );

        resultBox.classList.remove(
            "show"
        );


        // ⭐ 결과 배경 닫기
        const resultBg =
            document.getElementById("kujiResultBg");

        resultBg.classList.remove("show");


        bonusKujiButton.classList.remove(
            "show"
        );


        kujiOverlay.classList.remove(
            "show"
        );


        returnOpenedKujiToBoard();


        kujiScreen.classList.add(
            "show"
        );


        selectedKuji = null;

    }
);


// ==================================================
// 뽑힌 쿠지를 원래 자리로 복귀
// 열린 상태 그대로 유지
// ==================================================

function returnOpenedKujiToBoard() {

    if (!selectedKuji) {
        return;
    }


    // =========================
    // 원래 자리 placeholder 찾기
    // =========================

    const placeholder =
        document.querySelector(
            ".kuji-placeholder"
        );


    // =========================
    // 쿠지를 원래 자리로 이동
    // =========================

    if (placeholder) {

        // ⭐ 원래 쿠지 높이 기억
        const originalHeight =
            placeholder.offsetHeight;


        // ⭐ 원래 위치로 이동
        placeholder.parentNode.insertBefore(
            selectedKuji,
            placeholder
        );


        // ⭐⭐⭐ 핵심
        // 결과판/찢긴 쿠지는 absolute이므로
        // 부모 쿠지의 높이를 다시 만들어준다
        selectedKuji.style.height =
            originalHeight + "px";


        // placeholder 삭제
        placeholder.remove();

    }


    // =========================
    // 중앙 이동 상태 제거
    // =========================

    selectedKuji.classList.remove(
        "selected"
    );

    selectedKuji.classList.remove(
        "moving"
    );

    selectedKuji.classList.remove(
        "center"
    );

    selectedKuji.classList.remove(
        "tearing"
    );

    selectedKuji.classList.remove(
        "tearing-start"
    );


    // =========================
    // 이미 뽑힌 쿠지
    // =========================

    selectedKuji.classList.add(
        "opened"
    );


    // =========================
    // 중앙 이동용 CSS 변수 제거
    // =========================

    selectedKuji.style.removeProperty(
        "--kuji-start-x"
    );

    selectedKuji.style.removeProperty(
        "--kuji-start-y"
    );

    selectedKuji.style.removeProperty(
        "--kuji-start-width"
    );

    selectedKuji.style.removeProperty(
        "--kuji-start-height"
    );


    // =========================
    // 중앙 이동용 inline style 제거
    // =========================

    selectedKuji.style.removeProperty(
        "transform"
    );

    selectedKuji.style.removeProperty(
        "left"
    );

    selectedKuji.style.removeProperty(
        "top"
    );

    selectedKuji.style.removeProperty(
        "width"
    );


    // =========================
    // 결과 화면에서 숨겼던 쿠지 다시 보여주기
    // =========================

    kujiItems.forEach(function (kuji) {

        kuji.classList.remove(
            "result-hidden"
        );

    });

    // ⭐⭐⭐ height는 절대 지우지 않음!
    // selectedKuji.style.removeProperty("height");
}

// ==================================================
// 쿠지 결과 화면 - 별빛 생성
// ==================================================

const fireflyLayer =
    document.querySelector(
        ".kuji-firefly-layer"
    );

const fireflyColors = [
    "#FFFFFF",
    "#F8F6FF",
    "#EDE8FF",
    "#E8F5FF",
    "#DDEEFF"
];

const fireflyCount = 24;


// ==================================================
// 별빛 만들기
// ==================================================

for (
    let i = 0;
    i < fireflyCount;
    i++
) {

    const firefly =
        document.createElement("span");

    firefly.classList.add(
        "kuji-firefly"
    );


    // =========================
    // 랜덤 위치
    // =========================

    firefly.style.left =
        Math.random() * 100 + "%";

    firefly.style.top =
        Math.random() * 100 + "%";


    // =========================
    // 랜덤 크기
    // =========================

    const size =
        3 +
        Math.random() * 3;

    firefly.style.width =
        size + "px";

    firefly.style.height =
        size + "px";


    // =========================
    // 랜덤 색상
    // =========================

    firefly.style.color =
        fireflyColors[
            Math.floor(
                Math.random() *
                fireflyColors.length
            )
        ];


    // =========================
    // 랜덤 속도
    // =========================

    firefly.style.setProperty(
        "--duration",
        (
            2.2 +
            Math.random() * 3
        ) + "s"
    );


    // =========================
    // 랜덤 시작 타이밍
    // =========================

    firefly.style.setProperty(
        "--delay",
        (
            Math.random() * -5
        ) + "s"
    );


    fireflyLayer.appendChild(
        firefly
    );
}