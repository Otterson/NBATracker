
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

//API links
const urlCurrSeason = "https://api.sportsdata.io/v3/nba/scores/json/Games/2020?key=f55abad313104d79be697b3b6d7d5dfe"
const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=f55abad313104d79be697b3b6d7d5dfe"
const urlStadium = "https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=f55abad313104d79be697b3b6d7d5dfe"
const urlRankings = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=f55abad313104d79be697b3b6d7d5dfe"

const schedule = document.getElementById("schedule");

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


fetch(urlCurrSeason)
    .then((response) => response.json())
    .then(function (data) {
        let games = data.filter(function (item) {
            var today = new Date();
            let todDay = today.getDate(),
                todMonth = today.getMonth() + 1;
            todHour = today.getHours(),
                todMin = today.getMinutes();
            console.log("today: " + todDay + ", " + todMonth);

            let date = `${item.DateTime}`;
            let month = date.substring(5, 7),
                day = date.substring(8, 10),
                hour = date.substring(11, 13),
                min = date.substring(14, 16);

            //filter out previous games for upcoming section
            if (parseInt(month) >= todMonth) {
                if (todMonth == month) {
                    if (day < todDay) {
                        return false;
                    }
                    if (day == todDay) {
                        if (hour < todHour) { return false; }
                        if (hour == todHour) {
                            if (min < todMin) { return false; }
                        }
                    }
                }
                return true;
            } else {
                return false;
            }

        });

        games = games.slice(0, 20);
        var gameNumber = 1;
        games.map(function (game) {
            let li = createNode("li"),
                divMain = createNode("div"),
                divTeams = createNode("div"),

                divTeam1 = createNode("div"),
                a1 = createNode("a"),
                fig1 = createNode("figure"),
                img1 = createNode("img"),
                divInfo1 = createNode("div"),
                hSix1 = createNode("h6"),
                span1 = createNode("span"),

                divTeam2 = createNode("div"),
                a2 = createNode("a"),
                fig2 = createNode("figure"),
                img2 = createNode("img"),
                divInfo2 = createNode("div"),
                hSix2 = createNode("h6"),
                span2 = createNode("span"),

                divMid = createNode("div"),
                hFive = createNode("h5"),
                spanMid = createNode("span"),

                divTicketMain = createNode("div"),
                divTicket = createNode("div"),
                hFiveTicket = createNode("h5"),
                time = createNode("time"),
                ticketButton = createNode("a");

            li.className = "col-md-12";
            divMain.className = "sportsmagazine-fixture-wrap";
            divTeams.className = "sportsmagazine-teams-match";
            divTeam1.className = "sportsmagazine-first-team";
            divInfo1.className = "sportsmagazine-first-team-info";
            divMid.className = "sportsmagazine-match-view";
            divTeam2.className = "sportsmagazine-second-team";
            divInfo2.className = "sportsmagazine-second-team-info";
            divTicketMain.className = "sportsmagazine-buy-ticket";
            divTicket.className = "sportsmagazine-buy-ticket-text";
            time.datetime = "2008-02-14 20:00";
            ticketButton.className = "ticket-buy-btn";

            let team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;
            //get team data
			
            fetch(urlTeam)
                .then((response) => response.json())
                .then(function (data) {
					let hometeam = "";
					let awayteam = "";
                    let teams = data;
                    for (i = 0; i < teams.length; i++) {
                        if (teams[i].TeamID == team1Key) {
                            img1.src = teams[i].WikipediaLogoUrl;
                            hSix1.innerHTML = teams[i].Name;
                            span1.innerHTML = teams[i].City;
                            a1.href = "teamDetails.html?team="+teams[i].Name
							let citybefore1 = teams[i].City.replace(/\s/g,"-");
							let namebefore1 = teams[i].Name.replace(/\s/g,"-");
							//hometeam = teams[i].City + "-" + teams[i].Name;
							hometeam = citybefore1 + "-" + namebefore1;
                        }
                        if (teams[i].TeamID == team2Key) {
                            img2.src = teams[i].WikipediaLogoUrl;
                            hSix2.innerHTML = teams[i].Name;
                            span2.innerHTML = teams[i].City;
                            a2.href = "teamDetails.html?team="+teams[i].Name
							let citybefore2 = teams[i].City.replace(/\s/g,"-");
							let namebefore2 = teams[i].Name.replace(/\s/g,"-");
							//awayteam = teams[i].City + "-" + teams[i].Name; 
							awayteam = citybefore2 + "-" + namebefore2; 
                        }
                    }
					let urlteam = "https://api.seatgeek.com/2/events?performers[home_team].slug=" + hometeam + "&performers.slug=" + awayteam + "&client_id=MTk1MTc5OTV8MTU3NDA1MzExNy43&client_secret=cdd923c98fdd7cff1b1e5f61f1dc9d4c44ef8f92891e8f5f6ac22c8c333f2807";
					fetch(urlteam)
					.then((resp) => resp.json())
					.then(function(getid){
					let eventid = getid.events[0].id;
					let urlseat = "https://api.seatgeek.com/2/events/" + eventid + "?client_id=MTk1MTc5OTV8MTU3NDA1MzExNy43&client_secret=cdd923c98fdd7cff1b1e5f61f1dc9d4c44ef8f92891e8f5f6ac22c8c333f2807"; 
					fetch(urlseat)
					.then((resp) => resp.json())
					.then(function(gamebutton){
						ticketButton.href = gamebutton.url;
						ticketButton.innerHTML = gamebutton.stats.listing_count + " seats remaining";
					})
					})
                })
			//const urlteam = 'https://api.seatgeek.com/2/events?performers[home_team].slug=cleveland-cavaliers&performers.slug=detroit-pistons&client_id=MTk1MTc5OTV8MTU3NDA1MzExNy43&client_secret=cdd923c98fdd7cff1b1e5f61f1dc9d4c44ef8f92891e8f5f6ac22c8c333f2807';
			
			
			hFive.innerHTML = "Game " + gameNumber.toString();
            spanMid.innerHTML = "VS";

            fetch(urlStadium)
                .then(resp => resp.json())
                .then(function (stadium) {
                    for (i = 0; i < stadium.length; i++) {
                        if (stadium[i].StadiumID == game.StadiumID) {
                            hFiveTicket.innerHTML = stadium[i].City + ", " + stadium[i].State;
                            hFiveTicket.style.marginLeft = "0px";
                            break;
                        }
                    }
                })

            //process and format date data
            let date = `${game.DateTime}`;
            let year = date.substring(0, 4),
                month = date.substring(5, 7),
                day = date.substring(8, 10),
                hour = date.substring(11, 13),
                minute = date.substring(14, 16);
            let monthString = "",
                ampm = "";

            monthString = getMonthString(month);
            if (parseInt(hour) - 12 <= 0) {
                ampm = "AM"
            }
            else {
                ampm = "PM";
                hour = (parseInt(hour) - 12).toString();
            }

            time.innerHTML = monthString + " " + day + ", " + year +
                " <span />@" + hour + ":" + minute + " " + ampm + "</span />";
            time.style.marginLeft = "0px";
            //ticketButton.innerHTML = "Buy Ticket";

            append(fig1, img1);
            append(divInfo1, hSix1);
            append(divInfo1,span1);
            append(divTeam1, fig1);
            append(divTeam1, divInfo1);
            append(a1, divTeam1);

            append(divMid, hFive);
            append(divMid, spanMid);

            append(fig2, img2);
            append(divInfo2, hSix2);
            append(divInfo2,span2);
            append(divTeam2, fig2);
            append(divTeam2, divInfo2);
            append(a2, divTeam2)

            append(divTicket, hFiveTicket);
            append(divTicket, time);
            append(divTicketMain, ticketButton);
            append(divTicketMain, divTicket);

            append(divTeams, a1);
            append(divTeams, divMid);
            append(divTeams, a2);
            append(divMain, divTeams);
            append(divMain, divTicketMain);
            append(li, divMain);
            append(schedule,li);

            gameNumber++;
        })
    })
