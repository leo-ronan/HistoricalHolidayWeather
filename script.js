var woeid;
var year = "2020";
var date = year + "/9/16";
var queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;
var locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=";
var userDate;
var userDateFixed;
var year = "", month = "", day = "";
var responseList = [];
//WHEN #test is clicked, getLocId is ran with userCity being pulled from input #userCity
function getLocId() {

    //Select input field for city name (CAUTION OF SPACES in user input)

    var userCity = document.getElementById("location-field").value;  
    userDate = document.getElementById("date-field").value;

    //build URL with new city name
    locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=" + userCity;
    console.log(locQueryURL);
    console.log("Date: " + userDate);
    $.ajax({

        datatype: "json",
        url: locQueryURL,
        method: "GET"
    })
        .then(function (response) {
            var id = response[0].woeid;
            woeid = id;
            console.log("Woeid for " + userCity + " is " + id);
            clearInfo();
            dateFixer();
            getGiphy();
            findWeatherData(0);
        });
}

function clearInfo(){
    for (var i = 0; i < 5; i++){
        $("#year-" + i).html("");
        userDateFixed = "";
        year = "";
        month = "";
        day = "";
        responseList = [];
        userDate = document.getElementById("date-field").value;
    }
}



function findWeatherData(a){

    if (a < 5){
        queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + (year-a) + "/" + month + "/" + day;

        $.ajax({

            datatype: "json",
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                responseList.push(response[0]);
                console.log(responseList);
                    function weatherInfo(b){
                        listItemId = "year-" + b;
                        console.log(listItemId);
                        var temp = ((responseList[b].max_temp * 1.8) + 32);
                        var wState = responseList[b].weather_state_name;
                        $("#" + listItemId).append(" " + (year-b) + " / " + temp.toFixed(2) + "F / " + wState);
                    }
                    weatherInfo(a);
                    a++;
                    findWeatherData(a);
                
            });
    }
}

// select giphy
function getGiphy() {
    var imageTag;

    if (month == 12 && 01) {
        imageTag = "snow";
    }
    else if (month == 02) {
        imageTag = "valentine";
    }
    else if (month == 03) {
        imageTag = "leprachaun";
    }
    else if (month == 04 && 05 && 06) {
        imageTag = "spring";
    }
    else if (month == 07) {
        imageTag = "fireworks";
    }
    else if (month == 08 && 09) {
        imageTag = "summer";
    }
    else if (month == 10) {
        imageTag = "pumpkin";
    }
    else if (month == 11) {
        imageTag = "thanksgiving";
    }


    var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=573RMs6M2ej5kQQ7SE5GvGLev4dCDD2Q&tag=" + imageTag + "&rating=g"
    console.log("line51")
    $.ajax({
        url: giphyURL,
        method: "GET"
    })
        .then(function (response) {
            var seasonImage = response.data.image_original_url;
            $("#giphy").attr("src", seasonImage);
        });
};




function dateFixer() {
    var badDate = userDate;

    //Dissect user date and extract year, month, and day to turn into an API-usable date
    //year
    for (var i = 0; i < 4; i++) {
        var currentLetter = badDate.charAt(i);
        year += currentLetter;
    }
    //month
    for (var i = 5; i < 7; i++) {
        var currentLetter = badDate.charAt(i);
        month += currentLetter;
    }
    //day
    for (var i = 8; i < 10; i++) {
        var currentLetter = badDate.charAt(i);
        day += currentLetter;
    }
    userDateFixed = year + "/" + month + "/" + day;
    console.log(userDateFixed);
    userDate = userDateFixed;
}


