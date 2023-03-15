import React, { useEffect, useState } from 'react';
import "../css/all-teams/tournament.css";

const options = {
    method: 'GET',
    headers: {
        // account api key 1 : lAB9KFwFOoCKffaEatGjngrAiXlWHYVIJCjIb9Yql_lV-RDwOS8
        // account api key 2 : 4mS96b9jPR7yltpub_ljRk70SkiN6te68vKqxlxNWdtwAf8_jLQ
        accept: 'application/json',
        authorization: 'Bearer '
    }
};
 /*global chrome*/
 chrome.storage.local.get(['token'], function (result) {
    options.headers.authorization = 'Bearer ' + result.token;
});

const TournamentRunningsStandings = ({ teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL }) => {

    const [tournamentsStandings, setTournamentsStandings] = useState([]);
    const [tournamentsIDplusName, setTournamentsIDplusName] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const getData = async () => {
        const allProps = [teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL];
        const allIdsPlusNames = [{ id: "", name: "" , date: "", status: "" }];
        const allTournamentsStandings = [{ name: "", standings: "", date: "", status: "" }];
        const lastTournament = [{ name: "", standings: "" , currentTeam: ""}];
        const dataError = { error: "" };
        
        // test api request is ok 
        const test = await fetch(`https://api.pandascore.co/teams/${teamNameLol}/matches?sort=&page=number=1&size=50&per_page=1`, options)
            .then(response => response.json())
            .then(data => {
                // if data return an error, return an error 
                if (data.error) {
                    dataError.error = data.error;
                    setError(dataError.error);
                    setLoaded(true);
                }
            })
            await Promise.all(test).catch(err => {
                console.log("dataError: ", dataError.error);
            });

            if (dataError.error !== "") {
                setError(dataError.error);
                setLoaded(true);
                return;
            }

        const requests = allProps
            .filter(prop => prop !== "")
            .map(prop =>
                // veruify if fetch request is ok and if the tournament id is not undefined 
                fetch(`https://api.pandascore.co/teams/${prop}/matches?sort=&page=number=1&size=50&per_page=1`, options)
                    .then(response => response.json())
                    .then(data => {
                        if (data[0].tournament_id !== undefined) {
                            allIdsPlusNames.push({ id: data[0].tournament_id, name: data[0].league.name + " " + data[0].serie.full_name + " " + data[0].tournament.name , date: data[0].begin_at, status: data[0].status });
                        }
                    }).catch(err => {
                        setError(err);
                        setLoaded(true);
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
                                        setLoaded(true);
                                    }
                                })
                        }
                    })
                    .catch(err => {
                        setError(err);
                        setLoaded(true);
                    }
                    )
            )
        
        await Promise.all(requests);
        if (allTournamentsStandings.length > 1) {
            lastTournament[0] = allTournamentsStandings?.sort((a, b) => (a.date > b.date) ? 1 : -1).filter((match) => match.status === "not_started" || match.status === "running")[0];
            if (lastTournament[0].standings.map((standing) => standing.team.slug).includes(teamNameLol)) {
                lastTournament[0].currentTeam = teamNameLol;
            }
            else if (lastTournament[0].standings.map((standing) => standing.team.slug).includes(teamNameLol2)) {
                lastTournament[0].currentTeam = teamNameLol2;
            }
            else if (lastTournament[0].standings.map((standing) => standing.team.slug).includes(teamNameValorant)) {
                lastTournament[0].currentTeam = teamNameValorant;
            }
            else if (lastTournament[0].standings.map((standing) => standing.team.slug).includes(teamNameCsGo)) {
                lastTournament[0].currentTeam = teamNameCsGo;
            }
            else if (lastTournament[0].standings.map((standing) => standing.team.slug).includes(teamNameRL)) {
                lastTournament[0].currentTeam = teamNameRL;
            }
        }
        await Promise.all(lastTournament).catch(err => {
            setError(err);
            setLoaded(true);
        });
        setTournamentsStandings(lastTournament);
        setTournamentsIDplusName(allIdsPlusNames);
    
        return allTournamentsStandings;
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) {
        return (
            <><div className="error">
                <h2> {error} </h2>
                { error === "Invalid credentials" ? <p> Please check your Panda Score  <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> copy and replace your key in settings </p> : error === "Too many requests" ? <p> You have reached the maximum number of requests per hour, please wait a few minutes and try again or check your Panda Score <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> for more information </p> : ""}
            </div>
            </>
        )
    } else if (!loaded) {
        return <div>Loading...</div>;
    } else {

    return (<>
        {tournamentsStandings ? tournamentsStandings.map((tournament, index) => {
            return (
                <div key={index} className="my-tournament">
                    <h3 className="tournament-name">{tournament.name}</h3>
                    <div className="tournament-standings">
                        {tournament.standings?.map((standing, index) => {
                            if (standing.team.slug === tournament.currentTeam) {
                                return (
                                    <div key={index} className="tournament-standings-current-team">
                                        <h5 className="team-rank"> {standing.rank} </h5>
                                        <h5 className="team-name"> {standing.team.name} </h5>
                            {standing.wins !== null && standing.losses !== null ? <h5 className="team-wins-losses"> {standing.wins} - {standing.losses} </h5> : <h5 className="team-wins-losses"> - </h5>}
                            </div>
                                )
                            }
                            else {
                            return (
                               <div key={index} className="tournament-standings-team">
                            <h5 className="team-rank"> {standing.rank} </h5>
                            <h5 className="team-name"> {standing.team.name} </h5>
                            {standing.wins !== null && standing.losses !== null ? <h5 className="team-wins-losses"> {standing.wins} - {standing.losses} </h5> : <h5 className="team-wins-losses"> - </h5>}
                            </div>
                            )
                        }
                        })}
                    </div>
                </div>
            )
        }) : "Classment indisponible"}
    </>)
}
}

export default TournamentRunningsStandings;