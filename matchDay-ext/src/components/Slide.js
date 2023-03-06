import React, { Component } from "react";
import { useState } from 'react';
import Slider from "react-slick";
import "../css/slide.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TournamentRunningsStandings from "./Tournaments";

const SimpleSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
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
        if (result.favoritesTeams.includes("BDS")) {
            setBds(true);
        }
    });

    const [vita, setVita] = useState(false);

    const [karm, setKarm] = useState(false);

    const [sol, setSol] = useState(false);

    const [bds, setBds] = useState(false);
    return (
        <Slider {...settings} className="slide">
            {vita ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamNameLol={"vitality"} teamNameLol2={"vitality-bee"} teamNameValorant={"team-vitality-valorant"} teamNameCsGo={"vitality-cs-go"} teamNameRL={"vitality-rl"} />
                </div> : ""}
            {karm ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamNameLol={"karmine-corp"} teamNameLol2={""} teamNameValorant={"karmine-corp-valorant"} teamNameCsGo={""} teamNameRL={"karmine-corp-rl"} />
                </div> : ""}
            {sol ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamNameLol={"solary"} teamNameLol2={""} teamNameValorant={""} teamNameCsGo={""} teamNameRL={"solary-rl"} />
                </div> : ""}
            {bds ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamNameLol={"bds"} teamNameLol2={"bds-academy"} teamNameValorant={"team-bds-valorant"} teamNameCsGo={""} teamNameRL={"team-bds"} />
                </div> : ""}
        </Slider>
    );
}

export default SimpleSlider;
