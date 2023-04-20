import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import KarmineImg from '../../img/teams_logo/KC.png'
import '../../css/karmine/Karmine.css'
import '../../css/karmine/NavbarEvents.css'
import '../../css/karmine/events.css'
import '../../css/karmine/footer.css'
import '../../css/all-teams/footer.css'
import Footer from '../../components/Footer'
import instaKC from '../../img/footer-logo/karmine/instaKC.png'
import twitterKC from '../../img/footer-logo/karmine/twitterKC.png'
import twitchKC from '../../img/footer-logo/karmine/twitchKC.png'
import youtubeKC from '../../img/footer-logo/karmine/youtubeKC.png'

export default function Karmine() {

    return <div className="KARMINE">
        <div className="team-header">
        <img src={KarmineImg} alt="Karmine" width="50" className='logo' />
        </div>
        <NavbarEvents />
        <div className="container">
        <Routes>
            <Route path="/" element={<Upcoming />} />
            <Route path="/past" element={<Past />} />
        </Routes>
        </div>
        <Footer props={{
            logo1: twitterKC,
            logo2: youtubeKC,
            logo3: twitchKC,
            logo4: instaKC,
            link1: "https://twitter.com/KarmineCorp",
            link2: "https://www.youtube.com/channel/UCW5Ma_xnAweFIXCGOAZECAA",
            link3: "https://www.twitch.tv/kamet0",
            link4: "https://www.instagram.com/karminecorp",
            linkShop: "https://karminecorp.fr",
            nameShop: "KARMINESHOP.COM"
        }} />
    </div>
}