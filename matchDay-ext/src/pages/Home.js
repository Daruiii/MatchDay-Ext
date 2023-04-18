import Footer from '../components/Footer';
import {NextMatch} from '../components/Matches';
import TournamentRunningsStandings from '../components/Tournaments';
import Github from '../img/footer-logo/basics/github.png';
import email from '../img/footer-logo/basics/email.png';
import twitter from '../img/footer-logo/basics/twitter.png';
import { useState } from 'react';
import SimpleSlider from '../components/Slide';
import FavoriteTeams from '../ConfigFavTeam'

export default function Home() {

    const {vita, karm, sol, bds, m8} = FavoriteTeams()

    return <div className="home">
        <h1 className="top_texte">Prochains matchs :</h1>
        <div className="events">
        <div className="my_events">
        {vita || karm || sol || bds || m8 ? "" : <h1 className="top_texte">Aucun matchs à venir</h1>}
        {vita ? <NextMatch teamName={"vitality"} /> : ""}
        {karm ? <NextMatch teamName={"karmine"} /> : ""}
        {sol ? <NextMatch teamName={"solary"} /> : ""}
        {bds ? <NextMatch teamName={"bds"} /> : ""}
        {m8 ? <NextMatch teamName={"gentle-mates"} /> : ""}
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