import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import VitalityImg from '../../img/teams_logo/VT.png'
import '../../css/vitality/Vitality.css'
import '../../css/vitality/NavbarEvents.css'
import '../../css/vitality/events.css'

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
    </div>

}