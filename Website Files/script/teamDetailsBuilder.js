

const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=7fa0f5472c3a423ab41e7fd8920f3145";
//API key split into two sections, the team key should be inserted between them to find
//players for a given team
const urlDetails1 = "https://api.sportsdata.io/v3/nba/stats/json/Players/";
const urlDetails2 = "?key=7fa0f5472c3a423ab41e7fd8920f3145";

const teamRoster = document.getElementById("completeRoster");
const highlight = document.getElementById("mvp");

var currentURL = window.location.href;
var url = new URL(currentURL);
var teamName = url.searchParams.get("team");

//Functions
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

//Populate Page
fetch(urlTeam)
    .then(resp => resp.json())
    .then(function (data) {
        for (i = 0; i < 30; i++) {
            if (data[i].Name == teamName) {
                document.getElementById("title").innerHTML = data[i].City + " " + data[i].Name;
                document.getElementById("banner").style.background = "url(" + data[i].WikipediaLogoUrl + ")";
                var teamKey = data[i].Key;
                console.log(teamKey);
                const teamURL = urlDetails1 + teamKey + urlDetails2;
                fetch(teamURL)
                    .then(response => response.json())
                    .then(function (players) {

                        players.map(function (player) {
                            let playerEntry = createNode("tr"),
                                number = createNode("td"),
                                name = createNode("td"),
                                position = createNode("td"),
                                age = createNode("td"),
                                height = createNode("td"),
                                weight = createNode("td"),
                                status = createNode("td"),
                                nameSpan = createNode("span"),
                                posSpan = createNode("span");

                            number.innerHTML = player.Jersey;
                            nameSpan.innerHTML = player.FirstName + " " + player.LastName;
                            posSpan.innerHTML = player.Position;
                            var today = new Date();
                            var thisYear = today.getFullYear();
                            if (player.BirthDate != null) {
                                var playerAge = (thisYear - player.BirthDate.substr(0, 4));
                                age.innerHTML = playerAge;
                            } else { age.innerHTML = "NA"; }

                            height.innerHTML = player.Height + " in";
                            weight.innerHTML = player.Weight + " lbs";

                            status.innerHTML = player.Status;

                            append(name, nameSpan);
                            append(position, posSpan);
                            append(playerEntry, number);
                            append(playerEntry, name);
                            append(playerEntry, position);
                            append(playerEntry, age);
                            append(playerEntry, height);
                            append(playerEntry, weight);
                            append(playerEntry, status);
                            append(teamRoster, playerEntry)
                        })
                        var top4 = players.sort((a, b) => b.Salary - a.Salary);
                        top4 = top4.slice(0, 4);
                        top4.map(function (mvp) {
                            let li = createNode("li"),
                                fig = createNode("figure"),
                                a = createNode("a"),
                                img = createNode("img"),
                                figCaption = createNode("figcaption"),
                                span1 = createNode("span"),
                                hThree = createNode("h3"),
                                nameSpan = createNode("span");

                                li.className = "col-md-3";
                                a.href = "playerDetails.html?id="+ mvp.PlayerID;
                                img.src = mvp.PhotoUrl;
                                
                                span1.innerHTML = mvp.Jersey;
                                hThree.innerHTML = mvp.FirstName+" ";
                                nameSpan.innerHTML = mvp.LastName;
                                append(hThree, nameSpan);
                                append(figCaption, span1);
                                append(figCaption, hThree);
                                append(a, img);
                                append(fig,a);
                                append(fig,figCaption);
                                append(li, fig);
                                append(highlight,li);

                            // <li class="col-md-3">
                            //   <figure>
                            //      <a href="player-detail.html"><img src="extra-images/modern-player-img1.jpg" alt=""></a>
                            //         <figcaption>
                            //            <span>10</span>
                            //            <h3>Darren <span>Nick</span></h3>
                            //         </figcaption>
                            //   </figure>
                            // </li>
                        })

                    })
                break;
            }
        }
    })

