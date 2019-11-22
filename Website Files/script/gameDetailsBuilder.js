const urlCurrSeason = "https://api.sportsdata.io/v3/nba/scores/json/Games/2020?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlStadium = "https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlRankings = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=197f70e219a1414e8cf0a7ddc192d4f6"
var currentURL = window.location.href;
var url = new URL(currentURL);
var gameID = url.searchParams.get("gameID");

const resultsBanner = document.getElementById("results");

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
            monthString = "default";
    }
    return monthString;
}



//get data for selected game
fetch(urlCurrSeason)
    .then(resp => resp.json())
    .then(function (data) {
        var game;
        for (i = 0; i < data.length; i++) {

            if (data[i].GameID == gameID) {
                game = data[i];
                console.log(game);
                makeResults(game);
                makeInfo(game);
                break;
            }
        }

    })

function makeInfo(game){
    const dateBlock = document.getElementById("date");
    const time = document.getElementById("time");
    const stadium =document.getElementById("stadium");
    console.log(game.GameID);

    fetch(urlStadium)
    .then(resp => resp.json())
    .then(function (data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].StadiumID == game.StadiumID) {
                stadium.innerHTML = data[i].Name + ", " + data[i].State;
                break;
            }
        }
    })

    let date = `${game.DateTime}`;
            let year = date.substring(0, 4),
                month = date.substring(5, 7),
                day = date.substring(8, 10),
                hour = date.substring(11, 13),
                min = date.substring(14, 16);

                if (parseInt(hour) - 12 <= 0) {
                    ampm = "AM"
                }
                else {
                    ampm = "PM";
                    hour = (parseInt(hour) - 12).toString();
                }
            
            monthString = getMonthString(month);
            dateBlock.innerHTML = monthString + " " + day + ", " + year;
            time.innerHTML = hour+":"+min +" "+ampm;
}

function makeResults(game) {

    let div11 = createNode("div"),
        div12 = createNode("div"),
        fig1 = createNode("figure"),
        logo1 = createNode("img"),
        section1 = createNode("section"),
        name1 = createNode("h4"),
        city1 = createNode("span"),

        divMid1 = createNode("div"),
        divMid2 = createNode("div"),
        matchup = createNode("h4"),
        finalscore = createNode("span"),
        score = createNode("p"),
        br = createNode("br"),

        div21 = createNode("div"),
        div22 = createNode("div"),
        fig2 = createNode("figure"),
        logo2 = createNode("img"),
        section2 = createNode("section"),
        name2 = createNode("h4"),
        city2 = createNode("span");
    div11.className = "col-md-4";
    div12.className = "sportsmagazine-thumb-team-one";
    div21.className = "col-md-4";
    div22.className = "sportsmagazine-thumb-team-one";
    divMid1.className = "col-md-4";
    divMid2.className = "sportmagazine-score-counter";

    let team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;

    fetch(urlTeam)
        .then((response) => response.json())
        .then(function (data) {
            let teams = data;
            var team1, team2;
            for (i = 0; i < teams.length; i++) {
                var key1, key2;
                if (teams[i].TeamID == team1Key) {
                    logo1.src = teams[i].WikipediaLogoUrl;
                    //teamName1.innerHTML = teams[i].Key;
                    city1.innerHTML = teams[i].City;
                    team1 = teams[i].Name;
                    name1.innerHTML = teams[i].Key
                    //a1.href = "teamDetails.html?team="+teams[i].Name;
                }
                if (teams[i].TeamID == team2Key) {
                    logo2.src = teams[i].WikipediaLogoUrl;
                    // teamName2.innerHTML = teams[i].Key;
                    city2.innerHTML = teams[i].City;
                    team2 = teams[i].Name;
                    name2.innerHTML = teams[i].Key;
                    //a2.href = "teamDetails.html?team="+teams[i].Name;
                }
                if (team1 != null && team2 != null) {
                    matchup.innerHTML = team1 + "<span/>vs</span/>" + team2;
                    break;
                }
            }
        })
    finalscore.innerHTML = "Final Score";
    score.innerHTML = "<span/>" + game.HomeTeamScore + "</span/><small/>:</small/>" + game.AwayTeamScore;
    console.log(score.innerHTML);

    append(fig1, logo1);
    append(section1, name1);
    append(section1, city1);
    append(div12, fig1);
    append(div12, section1);
    append(div11, div12);

    append(divMid2, matchup);
    append(divMid2, finalscore);
    append(divMid2, score);
    append(divMid1, divMid2);

    append(fig2, logo2);
    append(section2, name2);
    append(section2, city2);
    append(div22, fig2);
    append(div22, section2);
    append(div21, div22);

    append(resultsBanner, div11);
    append(resultsBanner, divMid1);
    append(resultsBanner, div21);

    // <div class="col-md-4">
    //     <div class="sportsmagazine-thumb-team-one">
    //         <figure><img src="extra-images/thumb-team-oneimg.png" alt=""></figure>
    //             <section>
    //                <h4>Yorkshire</h4>
    //               <span>03 Mark Baily (21) </span>

    //             </section>
    //      </div>
    // </div>
    // <div class="col-md-4">
    //     <div class="sportmagazine-score-counter">
    //         <h4>Yorkshire<span>vs</span>Sharks</h4>
    //         <span>Final Score</span><br>
    //             <p><span>79</span> <small>:</small> 73</p>
    //      </div>
    // </div>
    // <div class="col-md-4">
    //     <div class="sportsmagazine-thumb-team-one">
    //         <figure><img src="extra-images/thumb-team-twoimg.png" alt=""></figure>
    //             <section>
    //                  <h4>Sharks Club</h4>
    //                  <span>03 Mark Baily (21) </span>
    //              </section>
    //     </div>
    // </div>
}

