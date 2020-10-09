const body = document.querySelector("body");

const IMG_NUMBER = 3;

//html 에 이미지를 보여주기 위한 함수
function paintImage(imgNumber){
    const image = new Image();
    //해당 이미지를 폴더에서 찾음
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

//랜덤 이미지 발생 함수
function genRandom(){
    //random 함수로 무작위로 생성 후 내림 0~IMG_NUMBER-1 까지 생성
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();