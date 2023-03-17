import "../css/settings.css"
import "../css/config.css";
import Karmine from '../img/teams_logo/KC.png'
import Solary from '../img/teams_logo/SLY.png'
import Vitality from '../img/teams_logo/VT.png'
import BDS from "../img/teams_logo/BDS.png"
import Footer from '../components/Footer';
import Github from '../img/footer-logo/basics/github.png';
import email from '../img/footer-logo/basics/email.png';
import twitter from '../img/footer-logo/basics/twitter.png';

export default function Settings() {

    /*global chrome*/
    chrome.storage.sync.get(['favoritesTeams'], function (result) {
        if (result.favoritesTeams.includes("Vitality")) {
            document.getElementById("Vitality").checked = true;
        }
        if (result.favoritesTeams.includes("Karmine")) {
            document.getElementById("Karmine").checked = true;
        }
        if (result.favoritesTeams.includes("Solary")) {
            document.getElementById("Solary").checked = true;
        }
        if (result.favoritesTeams.includes("BDS")) {
            document.getElementById("BDS").checked = true;
        }
    });

    chrome.storage.sync.get(['token'], function (result) {
        document.querySelector(".input-token").value = result.token;
    });

    function saveToken() {
        const token = document.querySelector(".input-token").value;
        chrome.storage.sync.set({ token: token });
        console.log("token saved");
        window.close();
    }

    return <div className="SETTINGS">
        <h2>Choose your favorite teams</h2>
        <div className="all-switch">
            <div className="switch-container">
        <img src={Karmine} alt="Karmine" width="30" />
        <h3>Karmine  :</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 

        chrome.storage.sync.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Karmine")) {
                chrome.storage.sync.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Karmine") });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
                    console.log("Karmine was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Karmine").checked = false;
                }
                )
            } else {
                chrome.storage.sync.set({ favoritesTeams: [...result.favoritesTeams, "Karmine"] });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
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
        <img src={Solary} alt="Solary" width="30" />
        <h3>Solary  :</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 

        chrome.storage.sync.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Solary")) {
                chrome.storage.sync.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Solary") });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
                    console.log("Solary was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Solary").checked = false;
                }
                )
            } else {
                chrome.storage.sync.set({ favoritesTeams: [...result.favoritesTeams, "Solary"] });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
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
        <img src={Vitality} alt="Vitality" width="30" />
        <h3>Vitality  :</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 

        chrome.storage.sync.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("Vitality")) {
                chrome.storage.sync.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "Vitality") });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
                    console.log("Vitality was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("Vitality").checked = false;
                }
                )
            } else {
                chrome.storage.sync.set({ favoritesTeams: [...result.favoritesTeams, "Vitality"] });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
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
            <div className="switch-container">
        <img src={BDS} alt="BDS" width="30" />
        <h3>BDS  :</h3>
        <label className="switch">
        <input type="checkbox" onChange={() => 

        chrome.storage.sync.get(['favoritesTeams'], function (result) {
            if (result.favoritesTeams.includes("BDS")) {
                chrome.storage.sync.set({ favoritesTeams: result.favoritesTeams.filter(team => team !== "BDS") });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
                    console.log("BDS was in the array, now deleted :")
                    console.log(result.favoritesTeams)
                    document.getElementById("BDS").checked = false;
                }
                )
            } else {
                chrome.storage.sync.set({ favoritesTeams: [...result.favoritesTeams, "BDS"] });
                chrome.storage.sync.get(['favoritesTeams'], function (result) {
                    console.log("BDS was not in the array, now added :")
                    console.log(result.favoritesTeams)
                    document.getElementById("BDS").checked = true;
                }
                )
            }
            window.close();
        })
        } checked="" id="BDS" />
        <span></span>
        </label>
            </div>
            </div>
        <h2>Configure your token</h2>
        <div className="token-container">
        <input className="input-token" type="text" placeholder="PandaScore Token" />
            <button className="btn-save-token" onClick={saveToken}>Sauvegarder</button>
        </div>
            <Footer props={{
            logo1: Github,
            logo2: email,
            logo3: twitter,
            logo4: null,
            link1: "https://github.com/Daruiii",
            link2: "mailto:davidmgr93@gmail.com",
            link3: "https://twitter.com/davidmgr93",
            link4: "https://www.twitch.tv/daruiii_",
            nameShop: "MatchDay",
        }} />
    </div>
}