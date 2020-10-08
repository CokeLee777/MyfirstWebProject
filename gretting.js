//html 의 클래스이름 및 태그 이름을 가져오기위해 querySelector 사용
const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
SHOWING_CN = "showing";

//사용자의 이름을 로컬 저장소에 저장함
function saveName(text){
    //로컬저장소에 USER_LS 키에 text값 저장한다.
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    // 사용자가 이름을 입력했을 때 기본적으로 새로고침되는것을 막음
    event.preventDefault();
    //변수에 가장 최근에 입력받은 사용자 이름 정보를 받는다.
    const currentValue = input.value;
    //사용자가 입력한 이름을 화면에 Hello 와 함께 띄우기 위해 함수 불러옴
    paintGreeting(currentValue);
    saveName(currentValue);
}

// 사용자에게 이름을 물어보는 함수
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    //로컬 저장소에 아무것도 들어있지 않을 때
    if(currentUser === null){
        //askForName 함수 불러옴 
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init()