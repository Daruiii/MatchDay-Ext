import React, { useEffect, useState } from 'react';
import "../css/all-teams/events.css"
import { PopupRoster } from "./Popup.js";
import { PopupTournament } from "./Popup.js";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer '
    }
};
/*global chrome*/
chrome.storage.sync.get(['token'], function (result) {
    options.headers.authorization = 'Bearer ' + result.token;
});

const optionsRefresh = {
    method: 'PUT',
    headers: {
        accept: 'application/x-www-form-urlencoded',
        authorization: 'Bearer '
    }
};
/*global chrome*/
chrome.storage.sync.get(['token'], function (result) {
optionsRefresh.headers.authorization = 'Bearer ' + result.token;
});

// function for open popup
const openPopup = (teamId) => {
    const popup = PopupRoster(teamId);
}

const openPopupTournament = (tournamentId, currentTeamSlug, tournamentFullName) => {
    const popup = PopupTournament(tournamentId, currentTeamSlug, tournamentFullName);
}

const MatchesUpcoming = ({ teamName }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        const dataError = { error: "" };
        const slugOfTheTeam = [];
        const getAllSlugFromTheTeam = await fetch('https://api.pandascore.co/teams?search[slug]=' + teamName, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    dataError.error = data.error;
                    setError(dataError.error);
                    setLoaded(true);
                }
                data.forEach((team) => {
                    slugOfTheTeam.push(team.slug);
                }
                )
            })
            .catch(err => {
                console.log("dataError: ", dataError.error);
            });

        await Promise.all(getAllSlugFromTheTeam).catch(err => {
            console.log("dataError: ", dataError.error);
        }
        );
        if (dataError.error !== "") {
            setError(dataError.error);
            setLoaded(true);
            return;
        }
        for (let i = 0; i < slugOfTheTeam.length; i++) {
            const getPastMatch = await fetch(`https://api.pandascore.co/teams/${slugOfTheTeam[i]}/matches?sort=&page=number=1&size=50&per_page=20`, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        dataError.error = data.error;
                        setError(dataError.error);
                        setLoaded(true);
                    }
                    // add the data with all the previous data in the state 
                    if (data.length > 0 && data[0].videogame.name !== "Dota 2") {
                        setData((prevData) => {
                            if (prevData) {
                                return [...prevData, ...data];
                            } else {
                                return data;
                            }
                        });
                    }
                    setLoaded(true);
                })
                .catch(err => {
                    console.log("dataError: ", dataError.error);
                });
            await Promise.all(getPastMatch).catch(err => {
                console.log("dataError: ", dataError.error);
            }
            );
            if (dataError.error !== "") {
                setError(dataError.error);
                setLoaded(true);
                return;
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const mapData = () => {
        const allData = [];
        if (data) {
            data.forEach((match) => {
                allData.push(match);
            });
        }
        // show only matches with status "not_started" and "running"
        return allData.filter((match) => match.status === "not_started" || match.status === "running");
    }

    const now = new Date(new Date().setHours(new Date().getHours() + 2)).toISOString().slice(11, 16);
    const refresh = async () => {
        const tokenrefresh = await fetch('https://registration.pandascore.co/dashboard_api/users/me/access_token', optionsRefresh)
            .then((res) => res.json())
            .then((data) => {
                chrome.storage.sync.set({ token: data.data.token }, function () {
                });
            })
            .catch(err => {
                console.log("dataError: ", err);
            });
        await Promise.all(tokenrefresh).catch(err => {
            console.log("dataError: ", err);
        }
        );
        window.close();
    }

    if (error === "Too many requests") refresh();
    if (error) return (<>
        <div className="error">
            <h2> {error} </h2>
            {error === "Invalid credentials" ? <p> Please check your Panda Score  <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> copy and replace your key in settings </p> : error === "Too many requests" ? <p> You have reached the maximum number of requests per hour, please wait a few minutes and try again or check your Panda Score <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> for more information </p> : ""}</div>
    </>);
    if (!loaded) return <div className="events_content">
        <h5 className="events_content_error">Loading...</h5>
    </div>;
    if (mapData().length === 0) return <div className="events_content">
    <h5 className="events_content_error">No upcoming matches for {teamName}</h5>
</div>;
    else return (
        <>
            {
                mapData().sort((a, b) => (a.begin_at > b.begin_at) ? 1 : -1).map((match) => {
                    return (
                        <div key={match.id} className="events_content">
                            <h5 className="events_content_competition" title={match.videogame.name + " - " + match.serie.full_name} onClick={() => openPopupTournament(match.tournament_id? match.tournament_id : "", match.opponents[0]?.opponent.slug.includes(teamName) ? match.opponents[0]?.opponent.slug : match.opponents[1]?.opponent.slug, match.videogame.name + " - " + match.serie.full_name)}>{match.league.name}</h5>
                            <div className="events_content_match">
                                <img src={match.opponents[0]?.opponent.image_url} alt={match.opponents[0]?.opponent.name} width="20" title={match.opponents[0]?.opponent.name} className='team-logo' onClick={() => openPopup(match.opponents[0]?.opponent.id)} />
                                <h5 className="events_content_match_vs">VS</h5>
                                <img src={match.opponents[1]?.opponent.image_url} alt={match.opponents[1]?.opponent.name} width="20" title={match.opponents[1]?.opponent.name} className='team-logo' onClick={() => openPopup(match.opponents[1]?.opponent.id)} />
                            </div>
                            {/* date + 1 pour verifier si le match est demain */}
                            {match.begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Aujourd'hui</h5> : match.begin_at?.slice(0, 10).replace(/-/g, '/') === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Demain</h5> : <h5 className="events_content_date">{match.begin_at?.slice(0, 10).replace(/-/g, '/')}</h5>}
                            {
                                match.status === "running" ? <a className='events_content_hour' href={match.streams_list[0]?.raw_url} target="_blank" rel="noreferrer"> <h5 className="">en cours</h5></a> : <h5 className="events_content_hour">{new Date(new Date(match.begin_at).setHours(new Date(match.begin_at).getHours() + 2)).toISOString().slice(11, 16)}</h5>
                            }
                        </div>
                    )
                })
            }
        </>
    );

}

const PastMatches = ({ teamName }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getData = async () => {

        const dataError = { error: "" };
        const slugOfTheTeam = [];
        const getAllSlugFromTheTeam = await fetch('https://api.pandascore.co/teams?search[slug]=' + teamName, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    dataError.error = data.error;
                    setError(dataError.error);
                    setLoaded(true);
                }
                data.forEach((team) => {
                    slugOfTheTeam.push(team.slug);
                }
                )
            })
            .catch(err => {
                console.log("dataError: ", dataError.error);
            });

        await Promise.all(getAllSlugFromTheTeam).catch(err => {
            console.log("dataError: ", dataError.error);
        }
        );
        if (dataError.error !== "") {
            setError(dataError.error);
            setLoaded(true);
            return;
        }
        for (let i = 0; i < slugOfTheTeam.length; i++) {
            const getPastMatch = await fetch(`https://api.pandascore.co/teams/${slugOfTheTeam[i]}/matches?sort=&page=number=1&size=50&per_page=20`, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        dataError.error = data.error;
                        setError(dataError.error);
                        setLoaded(true);
                    }
                    // add the data with all the previous data in the state 
                    if (data.length > 0 && data[0].videogame.name !== "Dota 2") {
                        setData((prevData) => {
                            if (prevData) {
                                return [...prevData, ...data];
                            } else {
                                return data;
                            }
                        });
                    }
                    setLoaded(true);
                })
                .catch(err => {
                    console.log("dataError: ", dataError.error);
                });
            await Promise.all(getPastMatch).catch(err => {
                console.log("dataError: ", dataError.error);
            }
            );
            if (dataError.error !== "") {
                setError(dataError.error);
                setLoaded(true);
                return;
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const mapData = () => {
        const allData = [];
        if (data) {
            data.forEach((match) => {
                allData.push(match);
            });
        }
        return allData.filter((match) => match.status === "finished");
    }
    const refresh = async () => {
        const tokenrefresh = await fetch('https://registration.pandascore.co/dashboard_api/users/me/access_token', optionsRefresh)
            .then((res) => res.json())
            .then((data) => {
                chrome.storage.sync.set({ token: data.data.token }, function () {
                    console.log('Value is set to ' + data.data.token);
                });
            })
            .catch(err => {
                console.log("dataError: ", err);
            });
        await Promise.all(tokenrefresh).catch(err => {
            console.log("dataError: ", err);
        }
        );
        window.close();
    }

    if (error === "Too many requests") refresh();
    if (error) return (<>
        <div className="error">
            <h2> {error} </h2>
            {error === "Invalid credentials" ? <p> Please check your Panda Score  <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> copy and replace your key in settings </p> : error === "Too many requests" ? <p> You have reached the maximum number of requests per hour, please wait a few minutes and try again or check your Panda Score <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> for more information </p> : ""}</div>
    </>);
    if (!loaded) return <div className="events_content">
    <h5 className="events_content_error">Loading...</h5>
</div>;
    else return (
        <>
            {
                // mapdata most recent first and display
                mapData().sort((a, b) => (a.begin_at < b.begin_at) ? 1 : -1).map((match) => {
                    return (
                        <div key={match.id} className="events_content">
                            <h5 className="events_content_competition" title={match.videogame.name + " - " + match.serie.full_name} onClick={() => openPopupTournament(match.tournament_id? match.tournament_id : "", match.opponents[0]?.opponent.slug.includes(teamName) ? match.opponents[0]?.opponent.slug : match.opponents[1]?.opponent.slug, match.videogame.name + " - " + match.serie.full_name)}>{match.league.name}</h5>
                            <div className="events_content_match">
                                <img src={match.opponents[0]?.opponent.image_url} alt={match.opponents[0]?.opponent.name} width="20" title={match.opponents[0]?.opponent.name} className='team-logo' onClick={() => openPopup(match.opponents[0]?.opponent.id)} />
                                <h5 className="events_content_match_vs">VS</h5>
                                <img src={match.opponents[1]?.opponent.image_url} alt={match.opponents[1]?.opponent.name} width="20" title={match.opponents[1]?.opponent.name} className='team-logo' onClick={() => openPopup(match.opponents[1]?.opponent.id)} />
                            </div>
                            <div className="events_content_score">
                                {match.winner?.slug.includes(teamName) ?
                                    (
                                        match.results[0]?.score !== null ?
                                            <h5 className="events_content_score_win">{match.results[0]?.score} - {match.results[1]?.score}</h5>
                                            :
                                            <h5 className="events_content_score_win">WIN</h5>
                                    )
                                    :
                                    (
                                        match.results[0]?.score !== null ?
                                            <h5 className="events_content_score_lose">{match.results[0]?.score} - {match.results[1]?.score}</h5>
                                            :
                                            <h5 className="events_content_score_lose">LOSE</h5>
                                    )
                                }
                            </div>
                            <h5 className="events_content_date">{match.begin_at?.slice(0, 10).replace(/-/g, '/')}</h5>
                        </div>
                    )
                })
            }
        </>
    );
}

const NextMatch = ({ teamName }) => {
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
            const dataError = { error: "" };
            const slugOfTheTeam = [];
            const getAllSlugFromTheTeam = await fetch('https://api.pandascore.co/teams?search[slug]=' + teamName, options)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        dataError.error = data.error;
                        setError(dataError.error);
                        setLoaded(true);
                    }
                    data.forEach((team) => {
                        slugOfTheTeam.push(team.slug);
                    }
                    )
                    setLoaded(true);
                })
                .catch(err => {
                    console.log("dataError: ", dataError.error);
                });

            await Promise.all(getAllSlugFromTheTeam).catch(err => {
                console.log("dataError: ", dataError.error);
            }
            );
            if (dataError.error !== "") {
                setError(dataError.error);
                setLoaded(true);
                return;
            }
            for (let i = 0; i < slugOfTheTeam.length; i++) {
                const getPastMatch = await fetch(`https://api.pandascore.co/teams/${slugOfTheTeam[i]}/matches?sort=&page=number=1&size=50&per_page=10`, options)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            dataError.error = data.error;
                            setError(dataError.error);
                            setLoaded(true);
                        }
                        // add the data with all the previous data in the state 
                        if (data.length > 0 && data[0].videogame.name !== "Dota 2") {
                            setData((prevData) => {
                                if (prevData) {
                                    return [...prevData, ...data];
                                } else {
                                    return data;
                                }
                            });
                        }
                        setLoaded(true);
                    })
                    .catch(err => {
                        console.log("dataError: ", dataError.error);
                    });
                await Promise.all(getPastMatch).catch(err => {
                    console.log("dataError: ", dataError.error);
                }
                );
                if (dataError.error !== "") {
                    setError(dataError.error);
                    setLoaded(true);
                    return;
                }
            }
        }

        useEffect(() => {
            getData();
        }, []);

        const mapData = () => {
            const allData = [];
        if (data) {
            data.forEach((match) => {
                allData.push(match);
            });
        }
            // get the match that is next and return it to be displayed

            return allData.sort((a, b) => (a.begin_at > b.begin_at) ? 1 : -1).filter((match) => match.status === "not_started" || match.status === "running")[0];
        }
       
                
        const refresh = async () => {
            const tokenrefresh = await fetch('https://registration.pandascore.co/dashboard_api/users/me/access_token', optionsRefresh)
                .then((res) => res.json())
                .then((data) => {
                    chrome.storage.sync.set({ token: data.data.token }, function () {
                        console.log('Value is set to ' + data.data.token);
                    });
                })
                .catch(err => {
                    console.log("dataError: ", err);
                });
            await Promise.all(tokenrefresh).catch(err => {
                console.log("dataError: ", err);
            }
            );
            window.close();
        }

        if (error === "Too many requests") refresh();
        const now = new Date(new Date().setHours(new Date().getHours() + 2)).toISOString().slice(11, 16);
        
        if (error) return (<>
            <div className="error">
                <h2> {error} </h2>
                {error === "Invalid credentials" ? <p> Please check your Panda Score  <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> copy and replace your key in settings </p> : error === "Too many requests" ? <p> You have reached the maximum number of requests per hour, please wait a few minutes and try again or check your Panda Score <a href="https://app.pandascore.co/dashboard/main" target="_blank" rel="noreferrer"> Dashboard</a> for more information </p> : ""}</div>
        </>)
        if (!loaded) return <div className="events_content">
        <h5 className="events_content_error">Loading...</h5>
    </div>;
        else return (
            <>
                {
                    mapData() ?
                        <div key={mapData().id} className="events_content">
                            <h5 className="events_content_competition" title={mapData().videogame.name + " - " + mapData().serie.full_name} onClick={() => openPopupTournament(mapData().tournament_id? mapData().tournament_id : "", mapData().opponents[0]?.opponent.slug.includes(teamName) ? mapData().opponents[0]?.opponent.slug : mapData().opponents[1]?.opponent.slug, mapData().videogame.name + " - " + mapData().serie.full_name)}>{mapData().league.name}</h5>
                            <div className="events_content_match">
                                <img src={mapData().opponents[0]?.opponent.image_url} alt={mapData().opponents[0]?.opponent.name} width="20" title={mapData().opponents[0]?.opponent.name} className='team-logo' onClick={() => openPopup(mapData().opponents[0]?.opponent.id)} />
                                <h5 className="events_content_match_vs">VS</h5>
                                <img src={mapData().opponents[1]?.opponent.image_url} alt={mapData().opponents[1]?.opponent.name} width="20" title={mapData().opponents[1]?.opponent.name} className='team-logo' onClick={() => openPopup(mapData().opponents[1]?.opponent.id)} />
                            </div>
                            {/* Date + 1 pour vérifier si date = demain */}
                            {mapData().begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Aujourd'hui</h5> : mapData().begin_at?.slice(0, 10).replace(/-/g, '/') === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Demain</h5> : <h5 className="events_content_date">{mapData().begin_at?.slice(0, 10).replace(/-/g, '/')}</h5>}
                            {
                                mapData().status === "running" ? <a className='events_content_hour' href={mapData().streams_list[0]?.raw_url} target="_blank" rel="noreferrer"> <h5 className="">en cours</h5></a> : <h5 className="events_content_hour">{new Date(new Date(mapData().begin_at).setHours(new Date(mapData().begin_at).getHours() + 2)).toISOString().slice(11, 16)}</h5>
                            }
                        </div> : <div className="events_content">
                            <h5 className="events_content_error">No upcoming matches for {teamName}</h5>
                        </div>
                }
            </>
        );

    }

    export { PastMatches, MatchesUpcoming, NextMatch };