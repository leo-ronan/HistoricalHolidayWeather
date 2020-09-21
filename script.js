var woeid;
var year = "2020";
var date = year + "/9/16";
var queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;
var locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=";


//WHEN #test is clicked, getLocId is ran with userCity being pulled from input #userCity
function getLocId() {

    //Select input field for city name (CAUTION OF SPACES in user input)
    var userCity = document.getElementById("location-field").value;

    //build URL with new city name
    locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=" + userCity;
    console.log(locQueryURL);
    $.ajax({

        datatype: "json",
        url: locQueryURL,
        method: "GET"
    })
        .then(function (response) {
            var id = response[0].woeid;
            woeid = id;
            console.log("Woeid for " + userCity + " is " + id);
            findWeatherData();
        });
}

function findWeatherData() {
    for (var i = 0; i < 1; i++) {
        queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;
        $.ajax({

            datatype: "json",
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response[0]);
            });
    }
}

// select giphy

var testImageTag = "snow"
function getGiphy() {

    var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=573RMs6M2ej5kQQ7SE5GvGLev4dCDD2Q&tag=" + testImageTag + "&rating=g"
    console.log("line51")
    $.ajax({
        url: giphyURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {
            console.log(response);

            var seasonImage = response

            $("#giphy").attr("src", seasonImage);

        });
};

// finding seasonal giphy tag
// var imageTag
// var month 
// if (month === 12 || 01) {
//     imageTag = "snow";
// };
// else if (month === 02) {
//     imageTag = "valentine";
// };
// else if (month === 03) {
//     imageTag = "leprachaun";
// };
// else if (month = 04 || 05 || 06) {
//     imageTag = "spring";
// };
// else if (month = 07) {
//     imageTag = "fireworks";
// };
// else if (month === 08 || 09) {
//     imageTag = "sun";
// };
// else if (month === 10) {
//     imageTag = "pumpkin";
// };
// else if (month = 11) {
//     imageTag = "thanksgiving";
// };
