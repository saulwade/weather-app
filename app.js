const box = document.querySelector(".box"),
inputPart = box.querySelector(".inputp"),
infoText = inputPart.querySelector(".infotext"),
inputField = inputPart.querySelector("input");
locationButton = inputPart.querySelector(".get-device");

let api;

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationButton.addEventListener("click", ()=> {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser doesn't support geolocation api")
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords; 
    api = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20dbed72930a4933821b3c8b83bda1ad';
    fetchData();
}

function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    api = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=20dbed72930a4933821b3c8b83bda1ad'; 
    fetchData();
}

function fetchData (){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pendiente");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
}