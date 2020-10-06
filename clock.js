// 시계를 보여줄 자바스크립트
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    //시,분,초 에다가 삼항연산자 적용
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
    
}

function init(){
    getTime();
    //1초간격으로 getTime 함수를 실행
    setInterval(getTime, 1000);
}

init()