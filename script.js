var woeid;
var year = "2020";
var date = year + "/9/16";
var queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;      
var locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=";


//WHEN #test is clicked, getLocId is ran with userCity being pulled from input #userCity
function getLocId(){
    
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
        .then(function(response){
            var id = response[0].woeid;
            woeid = id;
            console.log("Woeid for " + userCity + " is " + id);   
            findWeatherData();          
        });         
}

function findWeatherData(){
    for (var i = 0; i < 1; i++){
        queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;
        $.ajax({
        
        datatype: "json",
        url: queryURL,
        method: "GET" 
        })
            .then(function(response){
                console.log(response[0]);
            });
    }
}
        
// display image
var imageTag = "snow"
var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=573RMs6M2ej5kQQ7SE5GvGLev4dCDD2Q&tag" + imageTag + "&rating=g"
function getGiphy(){

    $.ajax({
           
        url: giphyURL,
        method: "GET" 
    })
        .then(function(response){
           console.log(response);         
        });         
}