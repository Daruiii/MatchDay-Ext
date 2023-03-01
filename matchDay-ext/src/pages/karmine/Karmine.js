import NavbarEvents from '../../components/NavbarEvents'
import { Route, Routes } from 'react-router-dom';
import Upcoming from './Upcoming';
import Past from './Past';
import KarmineImg from '../../img/teams_logo/KC.png'
import '../../css/karmine/Karmine.css'
import '../../css/karmine/NavbarEvents.css'
import '../../css/karmine/events.css'

export default function Karmine() {

    return <div className="KARMINE">
        <div className="team-header">
        <img src={KarmineImg} alt="Karmine" width="50" className='team-logo' />
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