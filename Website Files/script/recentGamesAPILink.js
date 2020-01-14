
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

//API links
const urlCurrSeason = "https://api.sportsdata.io/v3/nba/scores/json/Games/2020?key=f55abad313104d79be697b3b6d7d5dfe"
const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=f55abad313104d79be697b3b6d7d5dfe"
const urlStadium = "https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=f55abad313104d79be697b3b6d7d5dfe"
const urlRankings = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=f55abad313104d79be697b3b6d7d5dfe"

const gamesGrid = document.getElementById("gamesGrid");


fetch(urlCurrSeason)
    .then(resp => resp.json())
    .then(function (data) {
        let games = data.filter(function (item) {
            if (item.HomeTeamScore == null) {
                return false;
            } else { return true; }
        });

        let recentGames = games.reverse().slice(0, 40);
        recentGames.map(function (game) {
            let li = createNode("li"),
                divOutter1 = createNode("div"),
                divOutter2 = createNode("div"),
                a1 = createNode("a"),
                a2 = createNode("a"),

                divTeam1 = createNode("div"),
                fig1 = createNode("fig"),
                logo1 = createNode("img"),
                section1 = createNode("section"),
                teamName1 = createNode("h6"),
                city1 = createNode("span"),

                divMatchText = createNode("div"),
                title = createNode("h5"),
                time = createNode("time"),
                divClear = createNode("div"),
                spanVS = createNode("span"),
                place = createNode("h6"),
                a = createNode("a"),

                divTeam2 = createNode("div"),
                fig2 = createNode("fig"),
                logo2 = createNode("img"),
                section2 = createNode("section"),
                teamName2 = createNode("h6"),
                city2 = createNode("span");

            li.className = "col-md-6";
            divOutter1.className = "sportsmagazine-modren-fixture-wrap";
            divOutter2.className = "sportsmagazine-modren-fixture-text";
            divTeam1.className = "sportsmagazine-modren-team-one";
            divTeam2.className = "sportsmagazine-modren-team-two";
            divMatchText.className = "sportsmagazine-modren-match-text";
            divClear.className = "clearfix";

            
            a.className = "ticket-buy-btn";
            a.innerHTML = "Details";


            let team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;
            var team1, team2;
            //get team data
            fetch(urlTeam)
                .then((response) => response.json())
                .then(function (data) {
                    let teams = data;
                    for (i = 0; i < teams.length; i++) {
                        var key1, key2;
                        if (teams[i].TeamID == team1Key) {
                            logo1.src = teams[i].WikipediaLogoUrl;
                            //teamName1.innerHTML = teams[i].Key;
                            city1.innerHTML = teams[i].City;
                            team1 = teams[i].Name;
                            key1 = teams[i].Key
                            a1.href = "teamDetails.html?team="+teams[i].Name;
                        }
                        if (teams[i].TeamID == team2Key) {
                            logo2.src = teams[i].WikipediaLogoUrl;
                           // teamName2.innerHTML = teams[i].Key;
                            city2.innerHTML = teams[i].City;
                            team2 = teams[i].Name;
                            key2 = teams[i].Key;
                            a2.href = "teamDetails.html?team="+teams[i].Name;
                        }
                        if (team1 != null && team2 != null) {
                            title.innerHTML = team1 + " v " + team2;
                        }
                        if(game.HomeTeamScore > game.AwayTeamScore){
                            teamName1.innerHTML = key1 + " (W)";
                            teamName2.innerHTML = key2;
                        }else{
                            teamName2.innerHTML = key2 + " (W)"
                            teamName1.innerHTML = key1;
                        }
                    }

                })

            fetch(urlStadium)
                .then(resp => resp.json())
                .then(function (stadium) {
                    for (i = 0; i < stadium.length; i++) {
                        if (stadium[i].StadiumID == game.StadiumID) {
                            place.innerHTML = stadium[i].Name + ", " + stadium[i].State;
                            break;
                        }
                    }
                })

            let date = `${game.DateTime}`;
            let year = date.substring(0, 4),
                month = date.substring(5, 7),
                day = date.substring(8, 10);
            
                a.href = "gameDetails.html?gameID="+game.GameID;
                console.log(a.href);
            monthString = getMonthString(month);
            time.innerHTML = monthString + " " + day + ", " + year;
            spanVS.innerHTML = "VS";

            logo1.style.height = "60px";
            logo1.style.width = "60px";

            logo2.style.height = "60px";
            logo2.style.width = "60px";

           

            append(fig1, logo1);
            append(section1, teamName1);
            append(section1, city1);
            append(divTeam1, fig1);
            append(divTeam1, section1);
            append(a1, divTeam1);

            append(divMatchText, title);
            append(divMatchText, time);
            append(divMatchText, divClear);
            append(divMatchText, spanVS);
            append(divMatchText, place);
            append(divMatchText, a);

            append(fig2, logo2);
            append(section2, teamName2);
            append(section2, city2);
            append(divTeam2, fig2);
            append(divTeam2, section2);
            append(a2, divTeam2);

            append(divOutter2, a1);
            append(divOutter2, divMatchText);
            append(divOutter2, a2);
            append(divOutter1, divOutter2);
            append(li, divOutter1);
            append(gamesGrid, li);

        })





    })

{/* <li class="col-md-6">

<div class="sportsmagazine-modren-fixture-wrap">
    
    <div class="sportsmagazine-modren-fixture-text">

        <div class="sportsmagazine-modren-team-one">
            <figure><img src="extra-images/fixture-classic-img1.png" alt=""></figure>
            <section>
                <h6>Yorkshire</h6>
                <span>Bepop institute</span>
            </section>
           
        </div>

        <div class="sportsmagazine-modren-match-text">
            <h5>Pool Match # 1</h5>
            <time datetime="2008-02-14 20:00">August 21st, 2017</time>
            <div class="clearfix"></div>
            <span>VS</span>
            <h6>Country Durham, UK</h6>
            <a href="fixture.html" class="ticket-buy-btn">Buy Ticket</a>
        </div>

        <div class="sportsmagazine-modren-team-two">
            <figure><img src="extra-images/fixture-classic-img2.png" alt=""></figure>
            <section>
                <h6>Sharks Club</h6>
                <span>Icarus College</span>
            </section>
           
        </div>
    </div>
</div>
</li> */}