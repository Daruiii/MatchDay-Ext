import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import VitalityImg from '../../img/teams_logo/VT.png'
import '../../css/vitality/Vitality.css'
import '../../css/vitality/NavbarEvents.css'
import '../../css/vitality/events.css'
import '../../css/vitality/footer.css'
import '../../css/all-teams/footer.css'
import Footer from '../../components/Footer'
import instaVIT from '../../img/footer-logo/vitality/instaVIT.png'
import twitterVIT from '../../img/footer-logo/vitality/twitterVIT.png'
import twitchVIT from '../../img/footer-logo/vitality/twitchVIT.png'
import youtubeVIT from '../../img/footer-logo/vitality/youtubeVIT.png'

export default function Vitality() {

    return <div className="VITALITY">
        <div className="team-header">
        <img src={VitalityImg} alt="Vitality" width="50" className='team-logo' />
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
            link1: "https://twitter.com/TeamVitality",
            link2: "https://www.youtube.com/channel/UCgjhed4ZWlmC25hS4Sgs7gw",
            link3: "https://www.twitch.tv/vitality",
            link4: "https://www.instagram.com/teamvitality/",
            linkShop: "https://shop.vitality.gg/",
            nameShop: "VITASHOP.COM"
        }} />
    </div>

}