
const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=197f70e219a1414e8cf0a7ddc192d4f6"
const urlRankings = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=197f70e219a1414e8cf0a7ddc192d4f6"

const rankingsTable = document.getElementById("rankingsTable");



function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}



fetch(urlRankings)
		.then(resp => resp.json())
		.then(function (data) {
			let rankings = data.sort((a, b) => b.Percentage - a.Percentage);
			var rankNumber = 1;
			rankings.map(function (ranking) {
                let entry = createNode("tr"),
                a = createNode("a"),
                    rank = createNode("td"),
                    teamDetails = createNode("td"),
                    figure = createNode("figure"),
                    logo = createNode("img"),
                    div = createNode("div"),
                    teamName = createNode("h6"),
                    city = createNode("span"),
                    w = createNode("td"),
                    l = createNode("td"),
                    pct = createNode("td"),
                    home = createNode("td"),
                    road = createNode("td"),
                    ppg = createNode("td"),
                    OP = createNode("td"),
                    dif = createNode("td"),
                    strk= createNode("td"),
                    l10g = createNode("td");
                    var teamKey = ranking.Key;
				fetch(urlTeam)
					.then((response) => response.json())
					.then(function (data) {
						let teams = data;
						for (i = 0; i < teams.length; i++) {
							if (teams[i].Key == teamKey) {
								logo.src = teams[i].WikipediaLogoUrl;
                                teamName.innerHTML = teams[i].Name;
                                city.innerHTML =teams[i].City;
                                a.href = "teamDetails.html?team="+teams[i].Name;
                                break;
							}
						}
                    })

                    div.className = "player-stats-text";
                    rank.innerHTML = rankNumber.toString();
                    w.innerHTML = ranking.Wins;
                    l.innerHTML = ranking.Losses;
                    pct.innerHTML = ranking.Percentage;
                    home.innerHTML = (ranking.HomeWins / (ranking.HomeWins + ranking.HomeLosses)).toFixed(3);
                    road.innerHTML = (ranking.AwayWins / (ranking.AwayWins + ranking.AwayLosses)).toFixed(3);
                    dif.innerHTML = (ranking.PointsPerGameFor - ranking.PointsPerGameAgainst).toFixed(3);
                    ppg.innerHTML = ranking.PointsPerGameFor;
                    OP.innerHTML = ranking.PointsPerGameAgainst;
                    strk.innerHTML = ranking.Streak;
                    l10g.innerHTML  = ranking.LastTenWins;
                 

                    append(figure,logo);
                    append(div, teamName);
                    append(div,city);
                    append(teamDetails, figure);
                    append(a,div);
                    append(teamDetails, a);
                    append(entry, rank);
                    append(entry, teamDetails);
                    append(entry, w);
                    append(entry,l);
                    append(entry,pct);
                    append(entry,home);
                    append(entry, road);
                    append(entry, ppg);
                    append(entry, OP);
                    append(entry, dif);
                    append(entry, strk);
                    append(entry, l10g);
                    append(rankingsTable, entry);
                    rankNumber++;
                })
            })
                    