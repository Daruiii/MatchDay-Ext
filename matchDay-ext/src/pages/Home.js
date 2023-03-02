import Footer from '../components/Footer';
import {NextMatch} from '../components/Matches';
import Github from '../img/footer-logo/basics/github.png';
import email from '../img/footer-logo/basics/email.png';
import twitter from '../img/footer-logo/basics/twitter.png';
import twitch from '../img/footer-logo/basics/twitch.png';
import { useState } from 'react';

export default function Home() {

            /*global chrome*/
            chrome.storage.local.get(['favoritesTeams'], function (result) {
                if (result.favoritesTeams.includes("Vitality")) {
                    setVita(true);
                }
                if (result.favoritesTeams.includes("Karmine")) {
                    setKarm(true);
                }
                if (result.favoritesTeams.includes("Solary")) {
                    setSol(true);
                }
        });
    
        const [vita, setVita] = useState(false);
    
        const [karm, setKarm] = useState(false);
    
        const [sol, setSol] = useState(false);

    return <div className="home">
        <h1 className="top_texte">Prochain match de tes équipes favorites</h1>
        {vita ? <NextMatch teamNameLol={"vitality"} teamNameLol2={"vitality-bee"} teamNameValorant={"team-vitality-valorant"} teamNameCsGo={"vitality-cs-go"} teamNameRL={"vitality-rl"} /> : ""}
        {karm ? <NextMatch teamNameLol={"karmine-corp"} teamNameLol2={""} teamNameValorant={"karmine-corp-valorant"} teamNameCsGo={""} teamNameRL={"karmine-corp-rl"} /> : ""}
        {sol ? <NextMatch teamNameLol={"solary"} teamNameLol2={""} teamNameValorant={""} teamNameCsGo={""} teamNameRL={"solary-rl"} /> : ""}         
        <Footer props={{
            logo1: Github,
            logo2: email,
            logo3: twitter,
            logo4: null,
            link1: "https://github.com/Daruiii",
            link2: "mailto:davidmgr93@gmail.com",
            link3: "https://twitter.com/davidmgr93",
            link4: "https://www.twitch.tv/daruiii_",
            linkShop: "",
            nameShop: "My Portfolio"
        }} />
    </div>
}