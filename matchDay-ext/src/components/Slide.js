import React, { Component } from "react";
import { useState } from 'react';
import Slider from "react-slick";
import "../css/slide.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TournamentRunningsStandings from "./Tournaments";
import FavoriteTeams from '../ConfigFavTeam'

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
    const {vita, karm, sol, bds, m8} = FavoriteTeams()

    return (
        <Slider {...settings} className="slide">
            {vita ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamName={"vitality"} />
                </div> : ""}
            {karm ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamName={"karmine-corp"}  />
                </div> : ""}
            {sol ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamName={"solary"}  />
                </div> : ""}
            {bds ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamName={"bds"}  />
                </div> : ""}
            {m8 ?
                <div className="slide-each">
                    <TournamentRunningsStandings teamName={"gentle-mates"}  />
                </div> : ""}
        </Slider>
    );
}

export default SimpleSlider;
