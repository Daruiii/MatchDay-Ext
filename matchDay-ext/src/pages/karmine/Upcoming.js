import "../../css/all-teams/events.css"
import {MatchesUpcoming} from "../../components/Matches"

export default function Upcoming() {
    return <div className="events">
            <div className="events_title">
                <h5>COMPETITION</h5>
                <h5>MATCH</h5>
                <h5>DATE</h5>
                <h5>HEURE</h5>
            </div>
            <div className="my_events">
                <MatchesUpcoming teamName={"karmine"} />
            </div>
        </div>
}