import "../css/all-teams/popup.css";
import profilePicture  from "../img/user.png";
// popup component
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer '
    }
};

/*global chrome*/
chrome.storage.sync.get(['token'], function (result) {
    options.headers.authorization = 'Bearer ' + result.token;
});
// function for destroy popup
const destroyPopup = async () => {
    const popup = document.getElementById("popup");
    popup.id = "popup-destroy";
    await new Promise(r => setTimeout(r, 300));
    const allPopup = document.getElementById("all-popup");
    allPopup.parentNode.removeChild(allPopup);
}

const PopupRoster = async (teamId) => {
    const teamData = [];
    await fetch('https://api.pandascore.co/teams/' + teamId, options)
        .then(response => response.json())
        .then((data) => {
            teamData.push(data);
        })
        .catch((error) => {
            console.log(error);
        });

        console.log(teamData);
        console.log(teamData[0].players);
    const allPopup = document.createElement("div");
    allPopup.id = "all-popup";
    const popupBg = document.createElement("div");
    popupBg.id = "popup-bg";
    const popup = document.createElement("div");
    popup.id = "popup";
    // create popup title with will contain team name we get from api with teamId props
    const popupTitle = document.createElement("h2");
    popupTitle.id = "popup-title";
    popupTitle.innerHTML = teamData[0].name;
    const popupContent = document.createElement("div");
    popupContent.id = "popup-content";
    if (teamData[0].players?.length === 0) {
        popupContent.innerHTML = `
        <br>
        <br>
        <br>
        <br>
            <div class="roster-container">
                <div class="player">
                    <img src="${profilePicture}" alt="player">
                    <p>Player not found</p>
                </div>
            </div>
        `}
    else {
    popupContent.innerHTML = `
    <br>
    <br>
    <br>
    <br>
        <div class="roster-container">
        ` +
        teamData[0].players?.map((player) => {
            return `
            <hr>
            <div class="player">
                <p>${player.first_name} "${player.name}" ${player.last_name}  ${player.nationality ? `(${player.nationality})` : ''} </p>
                <img src="${player.image_url? player.image_url : profilePicture}" alt="player">
                ${player.role ? `<p>Rôle: ${player.role}</p>` : ''}
            </div>
            `
        }).join('')
         + `
        </div>
    `;
    }
    document.body.appendChild(allPopup);
    allPopup.appendChild(popupBg);
    allPopup.appendChild(popup);
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);

    popupBg.onclick = () => {
        destroyPopup();
    }

}

const PopupTournament = async (tournamentId, currentTeamSlug,tournamentFullName) => {
    const tournamentData = [];
    if (tournamentId) {
    await fetch('https://api.pandascore.co/tournaments/' + tournamentId + '/standings', options)
        .then(response => response.json())
        .then((data) => {
            tournamentData.push(data);
        })
        .catch((error) => {
            console.log(error);
            tournamentData.push('Record not found');
        }
        );
    }
    console.log('tournamentData', tournamentData);
    const allPopup = document.createElement("div");
    allPopup.id = "all-popup";
    const popupBg = document.createElement("div");
    popupBg.id = "popup-bg";
    const popup = document.createElement("div");
    popup.id = "popup";
    const popupTitle = document.createElement("h2");
    popupTitle.id = "popup-title";
    popupTitle.innerHTML = tournamentFullName;
    const popupContent = document.createElement("div");
    popupContent.id = "popup-content";
    if (tournamentData[0].error !== "Record not found") {
        popupContent.innerHTML = `
        <br>
        <br>
        <br>
        <br>
        <div class="roster-container">
        <div class="my-tournament">
        <div class="tournament-standings">
        ` +
        tournamentData[0].map((standing, index) => {
            if (standing.team.slug.includes(currentTeamSlug)) {
                return `
                <div key=${index} class="tournament-standings-current-team">
                    <h5 class="team-rank"> ${standing.rank} </h5>
                    <h5 class="team-name"> ${standing.team.name} </h5>
                    ${standing.wins? `<h5 class="team-wins-losses"> ${standing.wins} - ${standing.losses} </h5>` : `<h5 class="team-wins-losses"> - </h5>`}
                </div>
                `} else {
                return `
                <div key=${index} class="tournament-standings-team">
                    <h5 class="team-rank"> ${standing.rank} </h5>
                    <h5 class="team-name"> ${standing.team.name} </h5>
                    ${standing.wins? `<h5 class="team-wins-losses"> ${standing.wins} - ${standing.losses} </h5>` : `<h5 class="team-wins-losses"> - </h5>`}
                </div>
                `
                }
        }).join('')
            + `
        </div>
        </div>
        </div>
        `
    }
    else {
        popupContent.innerHTML = `
        <br>
        <br>
        <br>
        <br>
        <div class="roster-container">
        <div class="my-tournament">
        <div class="tournament-standings">
        <div class="tournament-standings-team">
        <h5 class="team-rank"> - </h5>
        <h5 class="team-name"> Classement indisponible </h5>
        <h5 class="team-wins-losses"> - </h5>
        </div>
        </div>
        </div>
        </div>
        `
    }
    document.body.appendChild(allPopup);
    allPopup.appendChild(popupBg);
    allPopup.appendChild(popup);
    popup.appendChild(popupTitle);
    popup.appendChild(popupContent);

    popupBg.onclick = () => {
        destroyPopup();
    }
}

export { PopupRoster, PopupTournament };