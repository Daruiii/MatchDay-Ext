import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import BdsImg from '../../img/teams_logo/BDS.png'
import '../../css/bds/Bds.css'
import '../../css/bds/NavbarEvents.css'
import '../../css/bds/events.css'
import '../../css/bds/footer.css'
import '../../css/all-teams/footer.css'
import Footer from '../../components/Footer'
import instaVIT from '../../img/footer-logo/vitality/instaVIT.png'
import twitterVIT from '../../img/footer-logo/vitality/twitterVIT.png'
import twitchVIT from '../../img/footer-logo/vitality/twitchVIT.png'
import youtubeVIT from '../../img/footer-logo/vitality/youtubeVIT.png'

export default function Bds() {

    return <div className="BDS">
        <div className="team-header">
        <img src={BdsImg} alt="BDS" width="50" className='team-logo' />
        </div>
        <NavbarEvents />
        <div className="container">
        <Routes>
            <Route path="/" element={<Upcoming />} />
            <Route path="/past" element={<Past />} />
        </Routes>
        </div>
        <Footer props={{
            logo1: twitterVIT,
            logo2: youtubeVIT,
            logo3: twitchVIT,
            logo4: instaVIT,
            link1: "https://twitter.com/TeamBDS",
            link2: "https://www.youtube.com/c/TeamBDS",
            link3: "https://www.twitch.tv/teambds",
            link4: "https://www.instagram.com/bds_esports/",
            linkShop: "https://teambds.gg/fr/",
            nameShop: "BDS-SHOP.COM"
        }} />
    </div>
}