const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

//할일 배열을 들고와서 로컬 저장소에 저장하는 함수
function saveToDos(){
    //로컬저장소는 모든 자바스크립트 형식의 데이터를 텍스트 형식으로 원하기 때문에
    //자바스크립트의 객체는 JSON 형식이기 때문에 string으로 바꾸어서 저장
    //JSON 은 JavaScript Object Notation 의 준말이다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//html 화면에 띄워주기위한 함수
function paintToDo(text){
    //html 의 태그들을 만들어냄
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    //새로운 할일을 만들 때마다 id 값을 증가시킴
    const newId = toDos.length + 1;
    //각각의 태그들에 함수가 불릴 때 text삽입
    delBtn.innerText = "X";
    span.innerText = text;
    //부모엘리먼트에 append 한다.
    li.appendChild(span);
    li.appendChild(delBtn);
    //할일이 하나씩 만들어 질 때마다 li 태그에 각각의 id 값을 붙여준다.
    li.id = newId;
    toDoList.appendChild(li);
    //할일 목록을 저장할 객체를 생성
    const toDoObj = {
        text: text,
        //할일을 저장 할 때마다 id 값을 하나 씩 증가시킴
        id: newId
    }
    //할일 목록 객체를 toDos 배열에 저장
    toDos.push(toDoObj);
    //배열에 저장된것을 로컬 저장소에 저장하는 함수를 호출
    saveToDos();
}

function handleSubmit(event){
    //디폴트, 즉 브라우저가 사용하는 기본실행이 안돼게 막음
    event.preventDefault();
    //사용자가 최근에 입력한 값을 변수에 담음
    const currentValue = toDoInput.value;
    //변수를 화면에 띄운다음에 입력창을 초기화시킴
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //할일 목록이 있다면
    if(loadedToDos !== null){
        //텍스트형식으로 되어있는 JSON 을 다시 JSON 형식으로 바꿔서 들고옴
        const parsedToDos = JSON.parse(loadedToDos);
        /*forEach는 배열에 사용가능한 메서드인데 배열에 담겨있는 것들 각각에
        한번씩 함수를 실행시켜준다. */
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    //toDoForm 변수, 즉 html 의 js-toDoForm 에 제출 이벤트가 발생했을 때, handleSubmit 함수를 실행
    toDoForm.addEventListener("submit", handleSubmit);
}

init();