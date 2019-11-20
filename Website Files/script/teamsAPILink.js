const urlTeam = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=7fa0f5472c3a423ab41e7fd8920f3145"

const teamGrid = document.getElementById("teamGrid");


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(urlTeam)
    .then(resp => resp.json())
    .then(function (data) {
        data.map(function (team) {
            let li = createNode("li"),
                fig = createNode("figure"),
                box = createNode("a"),
                icon = createNode("i"),
                figcaption = createNode("figcaption"),
                hSix = createNode("h6"),
                logo = createNode("img"),
                overlay = createNode("a");

            overlay.innerHTML = team.City + " " + team.Name;
            box.className = "fancybox";
            box.href = "teamDetails.html?team="+team.Name;
            logo.src = team.WikipediaLogoUrl;
            logo.style.width = "300px";
            logo.style.height = "300px";
            icon.clasName = "icon-signs23";
            fig.ID = team.Name;

            append(hSix, overlay);
            append(figcaption, hSix);
            append(box, logo);
            append(box, icon);
            append(fig, box);
            append(fig, figcaption);
            append(li, fig);
            append(teamGrid, li);


            // <li>
            //     <figure>
            //         <a data-fancybox-group="group" href="img1.jpg" class="fancybox"><img src="img.jpg" alt=""><i class="icon-signs23"></i></a>
            //             <figcaption>
            //                 <h6><a href="teamDetails.html">Rockets</a></h6>
            //             </figcaption>
            //     </figure>
            //</li>



                })
})