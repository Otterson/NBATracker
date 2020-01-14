const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=f55abad313104d79be697b3b6d7d5dfe";
//API key split into two sections, the team key should be inserted between them to find
//players for a given team


const urlStats = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2019?key=f55abad313104d79be697b3b6d7d5dfe"
const urlCurrSeason = "https://api.sportsdata.io/v3/nba/scores/json/Games/2020?key=f55abad313104d79be697b3b6d7d5dfe"
const urlPlayer1 = "https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByPlayer/";
// Game date and player ID should be inserted between links 1 and 2 in the format shown here: 2019-NOV-20/20000544
const urlPlayer2 = "?key=f55abad313104d79be697b3b6d7d5dfe"

const urlPlayerSeason = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2019/"
//insert key between url key
const urlPlayerSeason2 = "?key=f55abad313104d79be697b3b6d7d5dfe"


var currentURL = window.location.href;
var url = new URL(currentURL);
var playerID = url.searchParams.get("id");
var playerTeam;

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

function getMonthAbbreviation(month) {
	var monthString;
	switch (parseInt(month)) {
		case 1:
			monthString = "JAN";
			break;
		case 2:
			monthString = "FEB";
			break;
		case 3:
			monthString = "MARM";
			break;
		case 4:
			monthString = "APR";
			break;
		case 5:
			monthString = "MAY";
			break;
		case 6:
			monthString = "JUN";
			break;
		case 7:
			monthString = "JUL";
			break;
		case 8:
			monthString = "AUG";
			break;
		case 9:
			monthString = "SEP";
			break;
		case 10:
			monthString = "OCT";
			break;
		case 11:
			monthString = "NOV";
			break;
		case 12:
			monthString = "DEC";
			break;
		default:
			montString = "default";
	}
	return monthString;
}



fetch(urlStats)
	.then(resp => resp.json())
	.then(function (data) {
		for (i = 0; i < data.length; i++) {
			if (data[i].PlayerID == playerID) {
				makeBanner(data[i]);
				makeStatsTable();
			
				break;
			}
		}
	})


	window.onload =function makeBars(){

			let div1 = createNode("div"),
			div2 = createNode("div"),
			div3 = createNode("div"),
			title1 = createNode("h6"),
			title2 = createNode("h6"),
			title3 = createNode("h6"),
			perc1 = createNode("span"),
			perc2 = createNode("span"),
			perc3 = createNode("span"),
			bar1 = createNode("div"),
			bar2 = createNode("div"),
			bar3 = createNode("div");

			bar1.className = "progressbar1";
			bar2.className = "progressbar1";
			bar3.className = "progressbar1";

			div1.className = "skillst";
			div2.className = "skillst";
			div3.className = "skillst";

			title1.innerHTML = "Two-Point Accuracy";
			title2.innerHTML = "Three-Point Accuracy";
			title3.innerHTML = "Free Throw Accuracy";


			

			fetch(urlPlayerSeason + playerID + urlPlayerSeason2)
			.then(resp=>resp.json())
			.then(function(data){
				perc1.innerHTML = data.TwoPointersPercentage;
				console.log(data.TwoPointersPercentage);
				perc2.innerHTML = data.ThreePointersPercentage;
				perc3.innerHTML = data.FreeThrowsPercentage;
			})

			this.append(div1, title1);
			this.append(div1, perc1);
			this.append(div1, bar1);

			this.append(div2, title2);
			this.append(div2, perc2);
			this.append(div2, bar2);

			this.append(div3, title3);
			this.append(div3, perc3);
			this.append(div3, bar3);

			let bars = document.getElementById("progBars");

			append(bars, div1);
			append(bars, div2);
			append(bars, div3);

			// <div class="skillst">
            //                                 <h6>Free Throw Accuracy</h6>
            //                                 <span id="ftAcc">72%</span>
            //                                 <div id="barFT" class="progressbar1" ></div>
            //                             </div> -->
	}


function makeBanner(player) {
	var headshot = document.getElementById("headshot"),
		number = document.getElementById("jerseyNumber"),
		DOB = document.getElementById("dob"),
		team = document.getElementById("team"),
		height = document.getElementById("height"),
		rebounds = document.getElementById("reb"),
		position = document.getElementById("pos"),
		weight = document.getElementById("weight"),
		name = document.getElementById("name");

	rebounds.innerHTML = player.Rebounds;
	position.innerHTML = player.Position;
	team.innerHTML = player.Team;
	playerTeam = player.Team;



	fetch("https://api.sportsdata.io/v3/nba/stats/json/Players/" + player.Team + "?key=f55abad313104d79be697b3b6d7d5dfe")
		.then(response => response.json())
		.then(function (data) {
			for (i = 0; i < data.length; i++) {
				if (data[i].PlayerID == playerID) {
					headshot.src = data[i].PhotoUrl;
					number.innerHTML = data[i].Jersey;
					height.innerHTML = data[i].Height + " in";
					weight.innerHTML = data[i].Weight + " lbs";
					name.innerHTML = data[i].FirstName + "<br/><span/>" + data[i].LastName + "</spam/>";
					let date = data[i].BirthDate;
					let month = date.substring(5, 7),
						day = date.substring(8, 10),
						year = date.substring(0, 4);

					DOB.innerHTML = getMonthString(month) + " " + day + ", " + year;
				}
			}
		})


}


function makeStatsTable() {
	fetch(urlCurrSeason)
		.then(resp => resp.json())
		.then(function (data) {
			data = data.filter(function (item) {
				if ((item.HomeTeam == playerTeam || item.AwayTeam == playerTeam) && (item.HomeTeamScore != null)) { return true; }
				else { return false; }
			})
			data = data.reverse();
			data = data.slice(0, 7);

			data.map(function (game) {
				let dateBlock = createNode("td"),
					teamInfo = createNode("td"),
					row = createNode("tr"),
					fig = createNode("figure"),
					logo = createNode("img"),
					div = createNode("div"),
					againstName = createNode("h6"),
					againstCity = createNode("span"),
					score = createNode("td"),
					blk = createNode("td"),
					stl = createNode("td"),
					pf = createNode("td"),
					to = createNode("td"),
					a1 = createNode("a"),
					pts = createNode("td");

				div.className = "player-stats-text";
				if (game.HomeTeam == playerTeam) {
					againstName.innerHTML = game.AwayTeam;
					if (game.HomeTeamScore > game.AwayTeamScore) {
						score.innerHTML = game.AwayTeamScore + " - " + game.HomeTeamScore + "<span/>W</span/>";
					} else {
						score.innerHTML = game.AwayTeamScore + " - " + game.HomeTeamScore + "<span/>L</span/>";
					}
				} else {
					againstName.innerHTML = game.HomeTeam;
					if (game.AwayTeamScore > game.HomeTeamScore) {
						score.innerHTML = game.HomeTeamScore + " - " + game.AwayTeamScore + "<span/>W</span/>";
					} else {
						score.innerHTML = game.HomeTeamScore + " - " + game.AwayTeamScore + "<span/>L</span/>";
					}
				}

				let teamKey = againstName.innerHTML;
				fetch(urlTeam)
					.then((response) => response.json())
					.then(function (data) {
						let teams = data;
						for (i = 0; i < teams.length; i++) {
							if (teams[i].Key == teamKey) {
								console.log("found");
								logo.src = teams[i].WikipediaLogoUrl;
								againstCity.innerHTML = teams[i].City;
								a1.href = "Website Files/teamDetails.html?team=" + teams[i].Name;
								break;
							}
						}

					})

				let date = game.DateTime;
				let year = date.substring(0, 4),
					month = date.substring(5, 7),
					day = date.substring(8, 10);

				
				var monthabr = getMonthAbbreviation(month);
				dateBlock.innerHTML = monthabr + " " + day + ", " + year;

				

				fetch(urlPlayer1+year+"-"+monthabr+"-"+day+"/"+playerID+urlPlayer2)
				.then(response=>response.json())
				.then(function(data){
					blk.innerHTML = data.BlockedShots;
					stl.innerHTML = data.Steals;
					pf.innerHTML = data.PersonalFouls;
					to.innerHTML = data.Turnovers;
					pts.innerHTML = data.Points;
				})
				append(row,dateBlock);
				append(div,againstName);
				append(div, againstCity);
				append(a1,div);
				append(fig,logo);
				append(teamInfo,fig);
				append(teamInfo, a1);
				append(row, teamInfo);
				append(row, score);
				append(row, blk);
				append(row,stl);
				append(row, pf);
				append(row, to);
				append(row, pts);
				const table = document.getElementById("playerStatsTable");
				append(table,row);
			})
		})


	// < tr >
	// 	<td>Mar 24, 2017</td>
	// 	<td>
	// 		<figure><img src="extra-images/player-stats-img1.jpg" alt=""></figure>
	// 			<div class="player-stats-text">
	// 				<h6>Ocean Kings</h6>
	// 				<span>Patrick’s Institute</span>
	// 			</div>
	//     </td>
	// 		<td>113 - 110  <span>W</span></td>
	// 		<td>01</td>
	// 		<td>02</td>
	// 		<td>00</td>
	// 		<td>02</td>
	// 		<td>11</td>
	// </tr>
}

