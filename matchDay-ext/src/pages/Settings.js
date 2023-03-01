import "../css/settings.css"
import Karmine from '../img/teams_logo/KC.png'
import Solary from '../img/teams_logo/SLY.png'
import Vitality from '../img/teams_logo/VT.png'

export default function Settings() {

    /*global chrome*/
    chrome.storage.local.get(['favoritesTeams'], function (result) {
        if (result.favoritesTeams.includes("Vitality")) {
            document.getElementById("Vitality").checked = true;
        }
        if (result.favoritesTeams.includes("Karmine")) {
            document.getElementById("Karmine").checked = true;
        }
        if (result.favoritesTeams.includes("Solary")) {
            document.getElementById("Solary").checked = true;
        }
    });

    return <div className="SETTINGS">
        <h2>Choose your favorite teams</h2>
        <div className="all-switch">
            <div className="switch-container">
        <img src={Karmine} alt="Karmine" width="50" />
        <h3>Karmine</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 
        /*global chrome*/
        chrome.storage.local.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Karmine")) {
                chrome.storage.local.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Karmine") });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Karmine was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Karmine").checked = false;
                }
                )
            } else {
                chrome.storage.local.set({ favoritesTeams: [...result.favoritesTeams, "Karmine"] });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Karmine was not in the array, now added :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Karmine").checked = true;
                }
                )
            }
            window.close();
        })
        } checked="" id="Karmine" />
        <span></span>
        </label>
            </div>
            <div className="switch-container">
        <img src={Solary} alt="Solary" width="50" />
        <h3>Solary</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 
        /*global chrome*/
        chrome.storage.local.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Solary")) {
                chrome.storage.local.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Solary") });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Solary was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Solary").checked = false;
                }
                )
            } else {
                chrome.storage.local.set({ favoritesTeams: [...result.favoritesTeams, "Solary"] });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Solary was not in the array, now added :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Solary").checked = true;
                }
                )
            }
            window.close();
        })
        } checked="" id="Solary" />
        <span></span>
        </label>
            </div>

            <div className="switch-container">
        <img src={Vitality} alt="Vitality" width="50" />
        <h3>Vitality</h3>
        <label className="switch">
        <p>Vitality</p>
        <input type="checkbox" onChange={() => 
        /*global chrome*/
        chrome.storage.local.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Vitality")) {
                chrome.storage.local.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Vitality") });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Vitality was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Vitality").checked = false;
                }
                )
            } else {
                chrome.storage.local.set({ favoritesTeams: [...result.favoritesTeams, "Vitality"] });
                chrome.storage.local.get(['favoritesTeams'], function (result) {
                    console.log("Vitality was not in the array, now added :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Vitality").checked = true;
                }
                )
            }
            window.close();
        })
        } checked="" id="Vitality" />
        <span></span>
        </label>
            </div>
        </div>
    </div>
}