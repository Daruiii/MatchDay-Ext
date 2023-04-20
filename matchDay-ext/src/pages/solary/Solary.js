import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import SolaryImg from '../../img/teams_logo/SLY.png'
import '../../css/solary/Solary.css'
import '../../css/solary/NavbarEvents.css'
import '../../css/solary/events.css'
import '../../css/solary/footer.css'
import '../../css/all-teams/footer.css'
import Footer from '../../components/Footer'
import instaVIT from '../../img/footer-logo/vitality/instaVIT.png'
import twitterVIT from '../../img/footer-logo/vitality/twitterVIT.png'
import twitchVIT from '../../img/footer-logo/vitality/twitchVIT.png'
import youtubeVIT from '../../img/footer-logo/vitality/youtubeVIT.png'

export default function Solary() {

    return <div className="SOLARY">
        <div className="team-header">
        <img src={SolaryImg} alt="Solary" width="50" className='logo' />
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
            link1: "https://twitter.com/SolaryTV",
            link2: "https://www.youtube.com/channel/UCb3c6rB0Ru1i9EUcc-a5ZJw",
            link3: "https://www.twitch.tv/Solary",
            link4: "https://www.instagram.com/solarytv/",
            linkShop: "https://solaryshop.com/",
            nameShop: "SLYSHOP.COM"
        }} />
    </div>
}