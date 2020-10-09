const weather = document.querySelector(".js-weather");

const API_KEY = "f72c246137453e49c528a252aad73629";
const COORDS = "coords";

//API 호출하기
function getWeather(lat, lng){
    //fetch 함수에 요청 URL 입력
    //then 은 데이터가 우리한테 넘어왔을 때 그 응답에 대한 json 데이터를 가져온다.
    //then 을 두번 쓸 건데 자바스크립트가 데이터를 가져오고 처리하는 과정을 생략시키기 위함
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        //json 파일에서 정보를 가져옴
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        //객체의 키값과 value 값을 같게 할 때 이렇게 할 수도 있다.
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){

}

//좌표 불러오기 네이게이터 사용
function askForCoords(){
    /*첫번째 인자는 좌표를 가져오는것을 성공했을 때 처리하는 함수이다.
    */
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();