const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=197f70e219a1414e8cf0a7ddc192d4f6";
//API key split into two sections, the team key should be inserted between them to find
//players for a given team


const urlStats = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2019?key=197f70e219a1414e8cf0a7ddc192d4f6"



var currentURL = window.location.href;
var url = new URL(currentURL);
var playerID = url.searchParams.get("id");

//Functions
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function getMonthString(month) {
	var monthString;
	switch (parseInt(month)) {
		case 1:
			monthString = "January";
			break;
		case 2:
			monthString = "February";
			break;
		case 3:
			monthString = "March";
			break;
		case 4:
			monthString = "April";
			break;
		case 5:
			monthString = "May";
			break;
		case 6:
			monthString = "June";
			break;
		case 7:
			monthString = "July";
			break;
		case 8:
			monthString = "August";
			break;
		case 9:
			monthString = "September";
			break;
		case 10:
			monthString = "October";
			break;
		case 11:
			monthString = "November";
			break;
		case 12:
			monthString = "December";
			break;
		default:
			montString = "default";
	}
	return monthString;
}


fetch(urlStats)
.then(resp=>resp.json())
.then(function(data){
    for(i=0;i<data.length;i++){
        if(data[i].PlayerID == playerID){
            makeBanner(data[i]);



            break;
        }
    }
})

function makeBanner(player){
    var headshot = document.getElementById("headshot"),
    number = document.getElementById("jerseyNumber"),
    DOB = document.getElementById("dob"),
    team = document.getElementById("team"),
    height = document.getElementById("height"),
    rebounds = document.getElementById("reb"),
    position = document.getElementById("pos"),
    weight = document.getElementById("weight");

    rebounds.innerHTML = player.Rebounds;
    position.innerHTML = player.Position;
    team.innerHTML = player.Team;
   


    fetch("https://api.sportsdata.io/v3/nba/stats/json/Players/"+player.Team+"?key=197f70e219a1414e8cf0a7ddc192d4f6")
    .then(response=>response.json())
    .then(function(data){
        for(i=0;i<data.length;i++){
            if(data[i].PlayerID==playerID){
                headshot.src = data[i].PhotoURL;
                number.innerHTML = data[i].Jersey;
                height.innerHTML = data[i].height +" in";
                weight.innerHTML= data[i].weight+" lbs";

                let date = data[i].BirthDate;
			    let month = date.substring(5, 7),
                day = date.substring(8, 10),
                year = date.substring(0,4);

                DOB.innerHTML = monthString(month) + " "+day+", "+year; 
            }
        }
    })



}

