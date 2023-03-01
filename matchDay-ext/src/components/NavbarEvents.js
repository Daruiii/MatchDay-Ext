import '../css/all-teams/NavbarEvents.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const NavbarEvents = () => {
    // two button events ( upcoming and past )
    return (
        <div className="navbar_events">
            <ul>
                <CustomLink to={window.location.pathname + "/"} className="upcoming_events">ÉVENTS</CustomLink>
                <CustomLink to={window.location.pathname + "/past"} className="past_events">RÉSULTATS</CustomLink>
            </ul>
        </div>
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    )
}

export default NavbarEvents;
    