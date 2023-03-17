import Footer from '../components/Footer';
import {NextMatch} from '../components/Matches';
import TournamentRunningsStandings from '../components/Tournaments';
import Github from '../img/footer-logo/basics/github.png';
import email from '../img/footer-logo/basics/email.png';
import twitter from '../img/footer-logo/basics/twitter.png';
import { useState } from 'react';
import SimpleSlider from '../components/Slide';

export default function Home() {

            /*global chrome*/
            chrome.storage.sync.get(['favoritesTeams'], function (result) {
                if (result.favoritesTeams.includes("Vitality")) {
                    setVita(true);
                }
                if (result.favoritesTeams.includes("Karmine")) {
                    setKarm(true);
                }
                if (result.favoritesTeams.includes("Solary")) {
                    setSol(true);
                }
                if (result.favoritesTeams.includes("BDS")) {
                    setBds(true);
                }
        });
    
        const [vita, setVita] = useState(false);
    
        const [karm, setKarm] = useState(false);
    
        const [sol, setSol] = useState(false);

        const [bds, setBds] = useState(false);

    return <div className="home">
        <h1 className="top_texte">Prochains matchs :</h1>
        <div className="events">
        <div className="my_events">
        {vita || karm || sol || bds ? "" : <h1 className="top_texte">Aucun matchs à venir</h1>}
        {vita ? <NextMatch teamNameLol={"vitality"} teamNameLol2={"vitality-bee"} teamNameValorant={"team-vitality-valorant"} teamNameCsGo={"vitality-cs-go"} teamNameRL={"vitality-rl"} /> : ""}
        {karm ? <NextMatch teamNameLol={"karmine-corp"} teamNameLol2={""} teamNameValorant={"karmine-corp-valorant"} teamNameCsGo={""} teamNameRL={"karmine-corp-rl"} /> : ""}
        {sol ? <NextMatch teamNameLol={"solary"} teamNameLol2={""} teamNameValorant={""} teamNameCsGo={""} teamNameRL={"solary-rl"} /> : ""}   
        {bds ? <NextMatch teamNameLol={"bds"} teamNameLol2={"bds-academy"} teamNameValorant={"team-bds-valorant"} teamNameCsGo={""} teamNameRL={"team-bds"} /> : ""}
        </div>   
        <div className="standings-tournaments">
            <SimpleSlider />
        </div>
        <Footer props={{
            logo1: Github,
            logo2: email,
            logo3: twitter,
            logo4: null,
            link1: "https://github.com/Daruiii",
            link2: "mailto:davidmgr93@gmail.com",
            link3: "https://twitter.com/davidmgr93",
            link4: "https://www.twitch.tv/daruiii_",
         
            nameShop: "MatchDay",
        }} />
    </div>
    </div>
}