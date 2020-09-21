var woeid;
var year = "2020";
var date = year + "/9/16";
var queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + date;      
var locQueryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?query=";
var userDate;
var userDateFixed;

//WHEN #test is clicked, getLocId is ran with userCity being pulled from input #userCity
function getLocId(){
    
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
        .then(function(response){
            var id = response[0].woeid;
            woeid = id;
            console.log("Woeid for " + userCity + " is " + id);   
            findWeatherData();          
        });         
}

function findWeatherData(){
    dateFixer();
    for (var i = 0; i < 1; i++){
        queryURL = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + woeid + "/" + userDate;
        $.ajax({
        
        datatype: "json",
        url: queryURL,
        method: "GET" 
        })
            .then(function(response){
                console.log()
                console.log(response[0]);
            });
    }
}
        
function dateFixer(){
    var badDate = userDate;
    var year = "", month = "", day = "";
    //Dissect user date and extract year, month, and day to turn into an API-usable date
    //year
    for (var i = 0; i < 4; i++){
        var currentLetter = badDate.charAt(i);
        year += currentLetter;
    }
    //month
    for (var i = 5; i < 7; i++){
        var currentLetter = badDate.charAt(i);
        month += currentLetter;
    }
    //day
    for (var i = 8; i < 10; i++){
        var currentLetter = badDate.charAt(i);
        day += currentLetter;
    }
    userDateFixed = year + "/" + month + "/" + day;
    console.log(userDateFixed);
    userDate = userDateFixed;
}

