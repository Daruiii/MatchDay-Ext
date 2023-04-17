import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import M8Img from '../../img/teams_logo/M8.png'
import '../../css/m8/M8.css'
import '../../css/m8/NavbarEvents.css'
import '../../css/m8/events.css'
import '../../css/m8/footer.css'
import '../../css/all-teams/footer.css'
import Footer from '../../components/Footer'
import instaVIT from '../../img/footer-logo/vitality/instaVIT.png'
import twitterVIT from '../../img/footer-logo/vitality/twitterVIT.png'
import tiktok from '../../img/footer-logo/basics/tiktok.png'
import twitchVIT from '../../img/footer-logo/vitality/twitchVIT.png'
import youtubeVIT from '../../img/footer-logo/vitality/youtubeVIT.png'

export default function M8() {

    return <div className="M8">
        <div className="team-header">
        <img src={M8Img} alt="M8" width="50" className='team-logo' />
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
            link1: "https://twitter.com/gentlemates",
            link2: "https://www.youtube.com/@teamgentlemates",
            link3: "https://www.twitch.tv/gotaga",
            link4: "https://www.instagram.com/gentlemates/",
            linkShop: "https://gentlemates.com/fr/shop/",
            nameShop: "M8-SHOP.COM"
        }} />
    </div>
}