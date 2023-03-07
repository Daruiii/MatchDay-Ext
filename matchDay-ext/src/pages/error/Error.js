import NavbarEvents from '../../components/NavbarEvents'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Footer from '../../components/Footer'
import Github from '../../img/footer-logo/basics/github.png';
import email from '../../img/footer-logo/basics/email.png';
import twitter from '../../img/footer-logo/basics/twitter.png';

export default function Error() {

    return <div className="ERROR">
        <NavbarEvents />
        <div className="container">
            <h1>404</h1>
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
            linkShop: "https://github.com/Daruiii/MatchDay",
            nameShop: "MatchDay",
        }} />
    </div>
}