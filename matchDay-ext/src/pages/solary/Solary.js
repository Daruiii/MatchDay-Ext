import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import SolaryImg from '../../img/teams_logo/SLY.png'
import '../../css/solary/Solary.css'
import '../../css/solary/NavbarEvents.css'
import '../../css/solary/events.css'

export default function Solary() {

    return <div className="SOLARY">
        <div className="team-header">
        <img src={SolaryImg} alt="Solary" width="50" className='team-logo' />
        </div>
        <NavbarEvents />
        <div className="container">
        <Routes>
            <Route path="/" element={<Upcoming />} />
            <Route path="/past" element={<Past />} />
        </Routes>
        </div>
    </div>
}