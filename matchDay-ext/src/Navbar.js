import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useState } from 'react'
import Karmine from './img/teams_logo/KC.png'
import Solary from './img/teams_logo/SLY.png'
import Vitality from './img/teams_logo/VT.png'
import M8 from './img/teams_logo/M8.png'
import ExtLogo from './img/teams_logo/manette.png'
import Settings from './img/settings.png'
import Bds from './img/teams_logo/BDS.png'

export default function Navbar() {

        
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
            if (result.favoritesTeams.includes("Gentle Mates")) {
                setGm(true);
            }
    });

    const [vita, setVita] = useState(false);

    const [karm, setKarm] = useState(false);

    const [sol, setSol] = useState(false);

    const [bds, setBds] = useState(false);

    const [m8, setGm] = useState(false);

    function rotateCenter() {
        document.getElementById("ExtSettings").classList.toggle("rotate-center");
    }
    function slideTop() {
        document.getElementById("VitalityLogo").classList.toggle("slide-top");
    }

    return (
        <nav className="nav">
            <Link to="/popup.html" className='site-title'><img src={ExtLogo} alt="ExtLogo" width="30" /></Link>
            <ul id="link-team">
                {vita ? <CustomLink to="/vitality" id="VitalityLogo"><img src={Vitality} alt="Vitality" width="20" /></CustomLink> : null}
                {karm ? <CustomLink to="/karmine" id="KarmineLogo"><img src={Karmine} alt="Karmine" width="20" /></CustomLink> : null}
                {sol ? <CustomLink to="/solary" id="SolaryLogo"><img src={Solary} alt="Solary" width="20" /></CustomLink> : null}
                {bds ? <CustomLink to="/bds" id="BdsLogo"><img src={Bds} alt="Bds" width="20" /></CustomLink> : null}
                {m8 ? <CustomLink to="/gentle-mates" id="M8Logo"><img src={M8} alt="M8" width="20" /></CustomLink> : null}
            </ul>
            <ul>
                <CustomLink to="/settings" className="settings"><img src={Settings} alt="Settings" width="20" onClick={rotateCenter} id="ExtSettings"/></CustomLink>
            </ul>
        </nav >
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: false })

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    )
}


