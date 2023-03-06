import React, { useEffect, useState } from 'react';
import "../css/all-teams/tournament.css"

const options = {
    method: 'GET',
    headers: {
        // account api key 1 : lAB9KFwFOoCKffaEatGjngrAiXlWHYVIJCjIb9Yql_lV-RDwOS8
        // account api key 2 : 4mS96b9jPR7yltpub_ljRk70SkiN6te68vKqxlxNWdtwAf8_jLQ
        accept: 'application/json',
        authorization: 'Bearer 4mS96b9jPR7yltpub_ljRk70SkiN6te68vKqxlxNWdtwAf8_jLQ'
    }
};

const TournamentRunningsStandings = ({ teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL }) => {
    const [tournamentsStandings, setTournamentsStandings] = useState([]);
    const [tournamentsIDplusName, setTournamentsIDplusName] = useState([]);

    const getData = async () => {
        const allProps = [teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL];
        const allIdsPlusNames = [{ id: "", name: "" , date: "", status: "" }];
        const allTournamentsStandings = [{ name: "", standings: "", date: "", status: "" }];
        const sortedTournamentsStandings = [{ name: "", standings: "" , currentTeam: ""}];
    
        const requests = allProps
            .filter(prop => prop !== "")
            .map(prop =>
                fetch(`https://api.pandascore.co/teams/${prop}/matches?sort=&page=number=1&size=50&per_page=1`, options)
                    .then(response => response.json())
                    .then(data => {
                        if (data[0].tournament_id !== undefined) {
                            allIdsPlusNames.push({ id: data[0].tournament_id, name: data[0].league.name + " " + data[0].serie.full_name + " " + data[0].tournament.name , date: data[0].begin_at, status: data[0].status });
                        }
                    })
                    .then(() => {
                        // add the current tournament standings to the allTournamentsStandings array not the allIdsPlusNames array
                        if (allIdsPlusNames[allIdsPlusNames.length - 1].id !== undefined) {
                            let currentTournamentIdAndName = allIdsPlusNames[allIdsPlusNames.length - 1];
                            return fetch(`https://api.pandascore.co/tournaments/${currentTournamentIdAndName.id}/standings`, options)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.length > 1) {
                                        allTournamentsStandings.push({ name: currentTournamentIdAndName.name, standings: data , date: currentTournamentIdAndName.date, status: currentTournamentIdAndName.status });
                                    }
                                })
                                .catch(err => console.error(err));
                        }
                    })
                    .catch(err => console.error(err))
            );
        await Promise.all(requests);
        sortedTournamentsStandings[0].standings = allTournamentsStandings?.sort((a, b) => (a.begin_at > b.begin_at) ? 1 : -1).filter((match) => match.status === "not_started" || match.status === "running")[0].standings;
        sortedTournamentsStandings[0].name = allTournamentsStandings?.sort((a, b) => (a.begin_at > b.begin_at) ? 1 : -1).filter((match) => match.status === "not_started" || match.status === "running")[0].name;
        if (sortedTournamentsStandings[0].standings.map((standing) => standing.team.slug).includes(teamNameLol)) {
            sortedTournamentsStandings[0].currentTeam = teamNameLol;
        } else if (sortedTournamentsStandings[0].standings.map((standing) => standing.team.slug).includes(teamNameLol2)) {
            sortedTournamentsStandings[0].currentTeam = teamNameLol2;
        } else if (sortedTournamentsStandings[0].standings.map((standing) => standing.team.slug).includes(teamNameValorant)) {
            sortedTournamentsStandings[0].currentTeam = teamNameValorant;
        } else if (sortedTournamentsStandings[0].standings.map((standing) => standing.team.slug).includes(teamNameCsGo)) {
            sortedTournamentsStandings[0].currentTeam = teamNameCsGo;
        } else if (sortedTournamentsStandings[0].standings.map((standing) => standing.team.slug).includes(teamNameRL)) {
            sortedTournamentsStandings[0].currentTeam = teamNameRL;
        }
        await Promise.all(sortedTournamentsStandings);
        setTournamentsStandings(sortedTournamentsStandings);
        setTournamentsIDplusName(allIdsPlusNames);
    
        return allTournamentsStandings;
    };

    useEffect(() => {
        getData();
    }, []);

    console.log("tournamentsStandings outside", tournamentsStandings);
    console.log("tournamentsIDplusName outside", tournamentsIDplusName);
    
    return (<>
        {tournamentsStandings ? tournamentsStandings.map((tournament, index) => {
            return (
                <div key={index} className="my-tournament">
                    <h3 className="tournament-name">{tournament.name}</h3>
                    <div className="tournament-standings">
                        {tournament.standings?.map((standing, index) => {
                            return (
                               <div key={index} className="tournament-standings-team">
                            <h5 className="team-rank"> {standing.rank} </h5>
                            {standing.team.slug === tournament.currentTeam ? <h5 className="team-name-current"> {standing.team.name} </h5> : <h5 className="team-name"> {standing.team.name} </h5>}
                            {standing.wins !== null && standing.losses !== null ? <h5 className="team-wins-losses"> {standing.wins} - {standing.losses} </h5> : <h5 className="team-wins-losses"> - </h5>}
                            </div>
                            )
                        })}
                    </div>
                </div>
            )
        }) : "Classment indisponible"}
    </>)
}

export default TournamentRunningsStandings;