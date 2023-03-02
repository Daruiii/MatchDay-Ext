import React, { useEffect, useState } from 'react';
import "../css/all-teams/events.css"

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer 4mS96b9jPR7yltpub_ljRk70SkiN6te68vKqxlxNWdtwAf8_jLQ'
    }
};

const MatchesUpcoming = ({ teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL }) => {
    const [dataLol, setData] = useState();
    const [dataLol2, setDataLol2] = useState();
    const [dataValorant, setDataValorant] = useState();
    const [dataCsGo, setDataCsGo] = useState();
    const [dataRL, setDataRL] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        if (teamNameLol) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setData(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameLol2) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol2 + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataLol2(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameValorant) {
            fetch('https://api.pandascore.co/teams/' + teamNameValorant + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataValorant(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameRL) {
            fetch('https://api.pandascore.co/teams/' + teamNameRL + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataRL(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>Error!</p>;
    if (!loaded) return <p>Loading...</p>;

    const mapData = () => {
        const allData = [];
        if (dataLol) {
            dataLol.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataLol2) {
            dataLol2.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataValorant) {
            dataValorant.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataRL) {
            dataRL.forEach((data) => {
                allData.push(data);
            });
        }
        console.log(allData);
        return allData;
    }

    const now = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(11, 16);

    return (
        <>
            {
                mapData().sort((a, b) => (a.begin_at > b.begin_at) ? 1 : -1).map((match) => {
                    return (
                        <div key={match.id} className="events_content">
                            <h5 className="events_content_competition">{match.league.name}</h5>
                            <div className="events_content_match">
                                <img src={match.opponents[0]?.opponent.image_url} alt={match.opponents[0]?.opponent.name} width="20" title={match.opponents[0]?.opponent.name} className='team-logo' />
                                <h5 className="events_content_match_vs">VS</h5>
                                <img src={match.opponents[1]?.opponent.image_url} alt={match.opponents[1]?.opponent.name} width="20" title={match.opponents[1]?.opponent.name} className='team-logo' />
                            </div>
                            {match.begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Aujourd'hui</h5> : match.begin_at?.slice(0, 10).replace(/-/g, '/') === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Demain</h5> : <h5 className="events_content_date">{match.begin_at?.slice(0, 10).replace(/-/g, '/')}</h5>}
                            {
                                // if now is under match.begin_at and match.begin_at + 1h then match is in progress + is the same day
                                match.begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') && match.begin_at?.slice(11, 16) <= now && now <= new Date(new Date(match.begin_at).setHours(new Date(match.begin_at).getHours() + 1)).toISOString().slice(11, 16) ? <a className='events_content_hour' href={match.streams_list[0]?.raw_url} target="_blank"> <h5 className="">en cours</h5></a> : <h5 className="events_content_hour">{match.begin_at?.slice(11, 16)}</h5>
                            }
                        </div>
                    )
                })
            }
        </>
    );

}

const PastMatches = ({ teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL }) => {
    const [dataLol, setData] = useState();
    const [dataLol2, setDataLol2] = useState();
    const [dataValorant, setDataValorant] = useState();
    const [dataCsGo, setDataCsGo] = useState();
    const [dataRL, setDataRL] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        if (teamNameLol) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol + '/matches?filter[future]=false&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setData(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameLol2) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol2 + '/matches?filter[future]=false&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataLol2(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameValorant) {
            fetch('https://api.pandascore.co/teams/' + teamNameValorant + '/matches?filter[future]=false&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataValorant(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameCsGo) {
            fetch('https://api.pandascore.co/teams/' + teamNameCsGo + '/matches?filter[future]=false&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataCsGo(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameRL) {
            fetch('https://api.pandascore.co/teams/' + teamNameRL + '/matches?filter[future]=false&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataRL(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>Error!</p>;
    if (!loaded) return <p>Loading...</p>;

    const mapData = () => {
        const allData = [];
        if (dataLol) {
            dataLol.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataLol2) {
            dataLol2.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataValorant) {
            dataValorant.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataRL) {
            dataRL.forEach((data) => {
                allData.push(data);
            });
        }
        console.log(allData);
        return allData;
    }

    return (
        <>
            {
                // mapdata most recent first and display
                mapData().sort((a, b) => (a.begin_at < b.begin_at) ? 1 : -1).map((match) => {
                    return (
                        <div key={match.id} className="events_content">
                            <h5 className="events_content_competition">{match.league.name}</h5>
                            <div className="events_content_match">
                                <img src={match.opponents[0]?.opponent.image_url} alt={match.opponents[0]?.opponent.name} width="20" title={match.opponents[0]?.opponent.name} className='team-logo' />
                                <h5 className="events_content_match_vs">VS</h5>
                                <img src={match.opponents[1]?.opponent.image_url} alt={match.opponents[1]?.opponent.name} width="20" title={match.opponents[1]?.opponent.name} className='team-logo' />
                            </div>
                            <div className="events_content_score">
                                {match.winner?.slug === teamNameLol || match.winner?.slug === teamNameLol2 || match.winner?.slug === teamNameValorant || match.winner?.slug === teamNameCsGo || match.winner?.slug === teamNameRL ?
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

const NextMatch = ({ teamNameLol, teamNameLol2, teamNameValorant, teamNameCsGo, teamNameRL }) => {
    const [dataLol, setData] = useState();
    const [dataLol2, setDataLol2] = useState();
    const [dataValorant, setDataValorant] = useState();
    const [dataCsGo, setDataCsGo] = useState();
    const [dataRL, setDataRL] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        if (teamNameLol) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setData(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameLol2) {
            fetch('https://api.pandascore.co/teams/' + teamNameLol2 + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataLol2(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameValorant) {
            fetch('https://api.pandascore.co/teams/' + teamNameValorant + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=10', options)
                .then(res => res.json())
                .then((result) => {
                    setDataValorant(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
        if (teamNameRL) {
            fetch('https://api.pandascore.co/teams/' + teamNameRL + '/matches?filter[future]=true&sort=&page=number=1&size=50&per_page=50', options)
                .then(res => res.json())
                .then((result) => {
                    setDataRL(result);
                    setLoaded(true);
                },
                    (error) => {
                        setError(error);
                        setLoaded(true);
                    }
                )
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>Error!</p>;
    if (!loaded) return <p>Loading...</p>;

    const mapData = () => {
        const allData = [];
        if (dataLol) {
            dataLol.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataLol2) {
            dataLol2.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataValorant) {
            dataValorant.forEach((data) => {
                allData.push(data);
            });
        }
        if (dataRL) {
            dataRL.forEach((data) => {
                allData.push(data);
            });
        }

        // set allData[0] to the match with the closest date
        allData.sort((a, b) => (a.begin_at < b.begin_at) ? 1 : -1).reverse();
        
        return allData[0];
    }

    const now = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(11, 16);

    return (
        <>
            {
                mapData() ?
                    <div key={mapData().id} className="events_content">
                        <h5 className="events_content_competition">{mapData().league.name}</h5>
                        <div className="events_content_match">
                            <img src={mapData().opponents[0]?.opponent.image_url} alt={mapData().opponents[0]?.opponent.name} width="20" title={mapData().opponents[0]?.opponent.name} className='team-logo' />
                            <h5 className="events_content_match_vs">VS</h5>
                            <img src={mapData().opponents[1]?.opponent.image_url} alt={mapData().opponents[1]?.opponent.name} width="20" title={mapData().opponents[1]?.opponent.name} className='team-logo' />
                        </div>
                        {mapData().begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Aujourd'hui</h5> : mapData().begin_at?.slice(0, 10).replace(/-/g, '/') === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10).replace(/-/g, '/') ? <h5 className="events_content_date">Demain</h5> : <h5 className="events_content_date">{mapData().begin_at?.slice(0, 10).replace(/-/g, '/')}</h5>}
                        {
                            // if now is under mapData().begin_at and mapData().begin_at + 1h then match is in progress + is the same day
                            mapData().begin_at?.slice(0, 10).replace(/-/g, '/') === new Date().toISOString().slice(0, 10).replace(/-/g, '/') && mapData().begin_at?.slice(11, 16) <= now && now <= new Date(new Date(mapData().begin_at).setHours(new Date(mapData().begin_at).getHours() + 1)).toISOString().slice(11, 16) ? <a className='events_content_hour' href={mapData().streams_list[0]?.raw_url} target="_blank"> <h5 className="">en cours</h5></a> : <h5 className="events_content_hour">{mapData().begin_at?.slice(11, 16)}</h5>
                        }
                    </div> : <p>pas de matchs à venir</p>
            }
        </>
    );

}
// export Past Matches and Upcoming Matches components
export { PastMatches, MatchesUpcoming, NextMatch };