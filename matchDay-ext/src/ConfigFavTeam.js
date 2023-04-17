import { useState } from 'react';

                const FavoriteTeams = () => {
                    /*global chrome*/
                    chrome.storage.sync.get(['favoritesTeams'], function (result) {
                        if (result.favoritesTeams.includes("Vitality")) {
                            setVita(true);
                        }
                        if (result.favoritesTeams.includes("Karmine")) {
                            setKarm(true);
                        }
                        if (result.favoritesTeams.includes("Solary")) {
                            setSol(true);
                        }
                        if (result.favoritesTeams.includes("BDS")) {
                            setBds(true);
                        }
                        if (result.favoritesTeams.includes("Gentle Mates")) {
                            setGm(true);
                        }
                });

                const [vita, setVita] = useState(false);
    
                const [karm, setKarm] = useState(false);
            
                const [sol, setSol] = useState(false);
        
                const [bds, setBds] = useState(false);
        
                const [m8, setGm] = useState(false);
            
                return {vita, karm, sol, bds, m8}
            }

            export default FavoriteTeams;