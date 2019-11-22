
function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

//index.html sections
const scrollingSchedule = document.getElementById("sportsmagazine-fixture-slider");
const matchingsTable = document.getElementById("matchingstable")
const nextMatch = document.getElementById("nextMatch");
const rankingsTable = document.getElementById("rankingsTable");
const lastGame = document.getElementById("lastGame");

//API links
const urlCurrSeason = "https://api.sportsdata.io/v3/nba/scores/json/Games/2020?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlStadium = "https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlRankings = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=197f70e219a1414e8cf0a7ddc192d4f6"


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



//Get game schedule / call section build functions
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

		//find most recent game played
		var lastGame;
		for (i = 0; i < data.length; i++) {
			if (data[i].HomeTeamScore == null) {
				lastGame = data[i - 1];
				break;
			}
		}
		makeLastGame(lastGame);
		makeScrollingSchedule(games.slice(0,25));

		//pull next 7 games for matchings table
		let fixtures = games.slice(0, 7);
		makeMatchingsTable(fixtures);

		//get data for next match
		let nextGame = fixtures[0];
		makeNextMatchSections(nextGame);

		//create rankings table
		makeRankingsTable();
	})


//Build scrolling schedule function
function makeScrollingSchedule(schedule) {
	schedule.map(function (game) {
		//create div elements
		let time = createNode('time'),
			div = createNode('div'),
			ul = createNode('ul'),
			li = createNode('li'),
			span1 = createNode('span'),
			li2 = createNode('li'),
			span2 = createNode('span'),
			arrowLeft = createNode("span"),
			arrowRight = createNode("span"),
			iLeft = createNode("i"),
			iRight = createNode("i");

			arrowLeft.className = "slick-arrow-left slick-arrow";
			iLeft.className = "fa fa-angle-left";
			arrowRight.className = "slick-arrow-right slick-arrow";
			iRight.className = "fa fa-angle-right";

		//set tags
		div.className = "sportsmagazine-fixture-slider-layer ";
		ul.className = "sportsmagazine-bgcolor";
		li.className = "first-child";
		
		li.innerHTML = game.HomeTeam;
		li2.innerHTML = game.AwayTeam;

		//process and format date data
		let date = `${game.DateTime}`;
		let month = date.substring(5, 7),
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

		time.innerHTML = monthString + " " + day + ", " + hour + ":" + minute + " " + ampm;
		time.datetime = "2008-02-14 20:00";
		span1.innerHTML = "Home";
		span2.innerHTML = "Away";

		//build arrows
		append(arrowLeft, iLeft);
		append(arrowRight,iRight);
		//build game block div
		append(li, span1);
		append(li2, span2);
		append(ul, li);
		append(ul, li2);
		append(div, time);
		append(div, ul);
		//append(scrollingSchedule, arrowLeft);
		append(scrollingSchedule, div);
		//append(scrollingSchedule, arrowRight);
	})
}


function makeMatchingsTable(schedule) {
	schedule.map(function (game) {
		let date = `${game.DateTime}`;
		let month = date.substring(5, 7),
			day = date.substring(8, 10),
			monthString = getMonthString(month);

		let tr = createNode("tr"),
		a1 = createNode("a"),
		a2 = createNode("a"),
			tdDate = createNode("td"),
			td1 = createNode("td"),
			tdV = createNode("td"),
			spanV = createNode("span"),
			td2 = createNode("td"),
			fig1 = createNode("figure"),
			img1 = createNode("img"),
			div1 = createNode("div"),
			hSix1 = createNode("h6"),
			spanInner1 = createNode("span"),
			fig2 = createNode("figure"),
			img2 = createNode("img"),
			div2 = createNode("div"),
			hSix2 = createNode("h6"),
			spanInner2 = createNode("span");

		tdDate.innerHTML = monthString + " " + day;
		div1.className = "player-stats-text", div2.className = "player-stats-text";
		spanV.innerHTML = "VS";
		append(tdV, spanV);

		let team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;

		fetch(urlTeam)
			.then((response) => response.json())
			.then(function (data) {
				let teams = data;
				for (i = 0; i < teams.length; i++) {
					if (teams[i].TeamID == team1Key) {

						img1.src = teams[i].WikipediaLogoUrl;
						hSix1.innerHTML = teams[i].Name;
						spanInner1.innerHTML = teams[i].City;
						a1.href = "Website Files/teamDetails.html?team="+teams[i].Name;
					}
					if (teams[i].TeamID == team2Key) {
						img2.src = teams[i].WikipediaLogoUrl;
						hSix2.innerHTML = teams[i].Name;
						spanInner2.innerHTML = teams[i].City;
						a2.href = "Website Files/teamDetails.html?team="+teams[i].Name;
					}
				}

			})
		//build team1
		append(fig1, img1);
		append(div1, hSix1);
		append(div1, spanInner1);
		append(a1,div1);
		append(td1, fig1);
		append(td1, a1);

		//build team2
		append(fig2, img2);
		append(div2, hSix2);
		append(div2, spanInner2);
		append(a2, div2);
		append(td2, fig2);
		append(td2, a2);

		//build row
		append(tr, tdDate);
		append(tr, td1);
		append(tr, tdV);
		append(tr, td2);

		append(matchingstable, tr);
	})
}

function makeNextMatchSections(game) {
	//call banner elements
	var bannerTeam1 = document.getElementById("indexBannerTeam1"),
		bannerTeam2 = document.getElementById("indexBannerTeam2"),
		bannerimg1 = document.getElementById("indexBannerImg1"),
		bannerimg2 = document.getElementById("indexBannerImg2");

	//create section elements
	let div1 = createNode("div"),
	a1 = createNode("a"),
	a2 = createNode("a"),
		div2 = createNode("div"),
		divCountDown = createNode("div"),
		fig1 = createNode("figure"),
		fig2 = createNode("figure"),
		img1 = createNode("img"),
		img2 = createNode("img"),
		section1 = createNode("section"),
		section2 = createNode("section"),
		hFour1 = createNode("h4"),
		hFour2 = createNode("h4"),
		span1 = createNode("span"),
		span2 = createNode("span"),
		hSix = createNode("h6"),
		divTime = createNode("div"),
		time = createNode("time"),
		spanTime = createNode("span"),
		spanStadium = createNode("span"),
		br = createNode("br");

	div1.className = "sportsmagazine-result-one",
		div2.className = "sportsmagazine-result-one sportsmagazine-result-two",
		divTime.className = "sportsmagazine-next-game-text",
		hSix.className = "game-countdown-heading",
		divCountDown.className = "sportsmagazine-game-countdown",
		divCountDown.id = "sportsmagazine-game-countdown",
		hSix.innerHTML = "Game Countdown",
		time.datetime = "2008-02-14 20:00";

	//get Date data
	let date = `${game.DateTime}`;
	let month = date.substring(5, 7),
		day = date.substring(8, 10),
		hour = date.substring(11, 13),
		min = date.substring(14, 16),
		ampm = "",
		monthString = getMonthString(month);
	if (parseInt(hour) - 12 <= 0) {
		ampm = "AM"
	}
	else {
		ampm = "PM";
		hour = (parseInt(hour) - 12).toString();
	}
	monthString = getMonthString(month);
	time.innerHTML = monthString + " " + day;
	spanTime.innerHTML = hour + ":" + min + " " + ampm;

	let team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;

	fetch(urlTeam)
		.then((response) => response.json())
		.then(function (data) {
			let teams = data;
			for (i = 0; i < teams.length; i++) {
				if (teams[i].TeamID == team1Key) {

					img1.src = teams[i].WikipediaLogoUrl;
					hFour1.innerHTML = teams[i].Name;
					span1.innerHTML = teams[i].City;
					a1.href = "Website Files/teamDetails.html?team="+teams[i].Name;
					bannerTeam1.innerHTML = teams[i].City + "<br />" + teams[i].Name;
					bannerimg1.src = teams[i].WikipediaLogoUrl;
				}
				if (teams[i].TeamID == team2Key) {
					img2.src = teams[i].WikipediaLogoUrl;
					hFour2.innerHTML = teams[i].Name;
					span2.innerHTML = teams[i].City;
					a2.href = "Website Files/teamDetails.html?team="+teams[i].Name;
					bannerTeam2.innerHTML = teams[i].City + "<br />" + teams[i].Name;
					bannerimg2.src = teams[i].WikipediaLogoUrl;
				}
			}

		})

	fetch(urlStadium)
		.then(resp => resp.json())
		.then(function (data) {
			for (i = 0; i < data.length; i++) {
				if (data[i].StadiumID == game.StadiumID) {
					spanStadium.innerHTML = data[i].Name;
				}
			}
		})

	append(section1, hFour1);
	append(section1, span1);
	append(fig1, img1);
	append(div1, fig1);
	append(div1, section1);

	append(section2, hFour2);
	append(section2, span2);
	append(fig2, img2);
	append(div2, fig2);
	append(div2, section2);

	append(time, br);
	append(time, spanTime);
	append(divTime, time);
	append(divTime, spanStadium);
		append(a1, div1);
		append(a2,div2);
	append(nextMatch, a1);
	append(nextMatch, divTime);
	append(nextMatch, a2);
	append(nextMatch, hSix);
}

function makeRankingsTable() {
	fetch(urlRankings)
		.then(resp => resp.json())
		.then(function (data) {
			let rankings = data.sort((a, b) => b.Percentage - a.Percentage).slice(0, 6);
			var rank = 1;
			rankings.map(function (ranking) {
				let tr = createNode("tr"),
					a = createNode("a"),
					tdInfo = createNode("td"),
					spanRank = createNode("span"),
					fig = createNode("figure"),
					img = createNode("img"),
					divTeam = createNode("div"),
					hSix = createNode("h6"),
					tdP = createNode("td"),
					tdW = createNode("td"),
					tdL = createNode("td"),
					tdPct = createNode("td"),
					tdPoints = createNode("td");

				spanRank.innerHTML = rank.toString();
				var teamKey = ranking.TeamID;
				fetch(urlTeam)
					.then((response) => response.json())
					.then(function (data) {
						let teams = data;
						for (i = 0; i < teams.length; i++) {
							if (teams[i].TeamID == teamKey) {
								img.src = teams[i].WikipediaLogoUrl;
								hSix.innerHTML = teams[i].Name;
								a.href = "teamDetails.html?team="+teams[i].Name;
								break;
							}
						}
					})
				tdP.innerHTML = (ranking.Wins + ranking.Losses).toString();
				tdPct.innerHTML = ranking.Percentage;
				tdW.innerHTML = ranking.Wins;
				tdL.innerHTML = ranking.Losses;

				append(fig, img);
				append(divTeam, hSix);
				append(tdInfo, spanRank);
				append(tdInfo, fig);
				append(a, divTeam),
				append(tdInfo, a);
				append(tr, tdInfo);
				append(tr, tdP);
				append(tr, tdW);
				append(tr, tdL);
				append(tr, tdPct)

				append(tr, tdPoints);
				
				append(rankingsTable, tr);
				rank++;
			})


		})


}

function makeLastGame(game) {
	let div1 = createNode("div"),
		a1 = createNode("a"),
		fig1 = createNode("figure"),
		img1 = createNode("img"),
		section1 = createNode("section"),
		hFour1 = createNode("h4"),
		span1 = createNode("span"),

		divDateTime = createNode("div"),
		divdate = createNode("div"),
		hFourDate = createNode("h4"),
		time = createNode("time"),
		divscore = createNode("div"),
		hFive = createNode("h5"),
		spanScore = createNode("span"),
		icon = createNode("i"),

		div2 = createNode("div"),
		a2 = createNode("a"),
		fig2 = createNode("figure"),
		img2 = createNode("img"),
		section2 = createNode("section"),
		hFour2 = createNode("h4"),
		span2 = createNode("span");

	div1.className = "sportsmagazine-result-one",
		div2.className = "sportsmagazine-result-one sportsmagazine-result-two",
		divDateTime.className = "sportsmagazine-result-text",
		divdate.className = "sportsmagazine-match-date",
		divscore.className = "sportsmagazine-score-result",
		hFive.innerHTML = "FINAL SCORE",
		icon.className = "icon-play3";

		let date = `${game.DateTime}`;
	let month = date.substring(5, 7),
		day = date.substring(8, 10),
		hour = date.substring(11, 13);
		monthString = getMonthString(month);
	
	monthString = getMonthString(month);
	time.innerHTML = monthString + " " + day;
	//get team data
	var team1Key = game.HomeTeamID, team2Key = game.AwayTeamID;
	fetch(urlTeam)
		.then((response) => response.json())
		.then(function (data) {
			let teams = data;
			var team1name, team2name;
			for (i = 0; i < teams.length; i++) {
				if (teams[i].TeamID == team1Key) {
					img1.src = teams[i].WikipediaLogoUrl;
					hFour1.innerHTML = teams[i].Key;
					team1name = teams[i].Name;
					a1.href = "teamDetails.html?team="+teams[i].Name;
					span1.innerHTML = teams[i].City;
				}
				if (teams[i].TeamID == team2Key) {
					img2.src = teams[i].WikipediaLogoUrl;
					hFour2.innerHTML = teams[i].Key;
					team2name = teams[i].Name;
					a2.href = "teamDetails.html?team="+teams[i].Name;
					span2.innerHTML = teams[i].City;
				}
				if(team1name != null && team2name != null){
					hFourDate.innerHTML = team1name+" VS " + team2name;
				}
			}
		})
		
		append(spanScore, icon);
		spanScore.innerHTML = game.HomeTeamScore + "<small />:</small />"+ game.AwayTeamScore;

		append(section1, hFour1);
		append(section1, span1);
		append(fig1, img1);
		append(div1, fig1);
		append(div1, section1);

		append(divdate, hFourDate);
		append(divdate, time);
		append(divscore, hFive);
		append(divscore, spanScore);
		append(divDateTime, divdate);
		append(divDateTime, divscore);

		append(section2, hFour2);
		append(section2, span2);
		append(fig2, img2);
		append(div2, fig2);
		append(div2, section2);
		append(a1, div1);
		append(a2,div2);
		append(lastGame, a1);
		append(lastGame, divDateTime);
		append(lastGame, a2);







}