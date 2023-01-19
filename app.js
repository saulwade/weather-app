const box = document.querySelector(".box"),
inputPart = box.querySelector(".inputp"),
infoText = inputPart.querySelector(".infotext"),
inputField = inputPart.querySelector("input"),
locationButton = inputPart.querySelector(".get-device"),
wicon = box.querySelector(".weatherbox img"),
buttonBack = box.querySelector(".back-to-menu")

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
    api = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metrics&appid=20dbed72930a4933821b3c8b83bda1ad';
    fetchData();
}

function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    api = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metricsappid=20dbed72930a4933821b3c8b83bda1ad'; 
    fetchData();
}

function fetchData (){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pendiente");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoText.classList.replace("pendiente", "error");
    if(info.cod == "404"){
        infoText.innerText = '${inputField.value} isnt a valid city name';
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wicon.src = "img/soleado.svg";
        }else  if(id >= 200 && id <= 232){
            wicon.src = "img/tormenta.svg";
        }else  if(id >= 600 && id <= 622){
            wicon.src = "img/nieve.svg";
        }else  if(id >= 701 && id <= 781){
            wicon.src = "img/aire.svg";
        }else  if(id >= 801 && id <= 804){
            wicon.src = "img/nublado.svg";
        }else  if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wicon.src = "img/lluvia.svg";
        }
        

        box.querySelector(".temperatura .numero").innerText = Math.floor(temp);
        box.querySelector(".weather").innerText = description;
        box.querySelector(".location span").innerText = '${city}, ${country}';
        box.querySelector(".temperatura .numero2").innerText = feels_like;
        box.querySelector(".humidity span").innerText = '${humidity}%';


        infoText.classList.remove("pendiente", "error");
        box.classList.add("active");
        console.log(info);
    }
}

buttonBack.addEventListener("click", ()=>{
    box.classList.remove("active");
})