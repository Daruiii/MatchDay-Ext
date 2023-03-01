import {PastMatches} from "../../components/Matches"
import "../../css/all-teams/events.css"

export default function Past() {
    return <div className="events">
    <div className="events_title">
        <h5>COMPETITION</h5>
        <h5>MATCH</h5>
        <h5>RÉSULTAT</h5>
        <h5>DATE</h5>
    </div>
    <div className="my_events">
        <PastMatches teamNameLol={"solary"} teamNameLol2={""} teamNameValorant={""} teamNameCsGo={""} teamNameRL={"solary-rl"} />
    </div>
</div>
}
