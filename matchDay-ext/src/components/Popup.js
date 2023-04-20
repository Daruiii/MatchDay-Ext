import React, { useEffect, useState } from 'react';
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

export { PopupRoster}