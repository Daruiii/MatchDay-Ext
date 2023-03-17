import "./css/config.css";

const Config = () => {

    /*global chrome*/
    function saveToken() {
        const token = document.querySelector(".input-token").value;
        chrome.storage.sync.set({ token: token });
        console.log("token saved");
        window.location.reload();
    }

    return (
        <div className="config-page">
            <div className="title-config">
            <h1>Configuration du token Panda</h1><h1 className="scoreColor">Score</h1></div>
            <h3>Rendez vous sur <a href="https://app.pandascore.co/login" target="_blank" rel="noreferrer">pandascore.co</a> pour générer un token</h3>
            <h3>Une fois le token généré, copiez le et collez le dans le champ ci-dessous</h3>
            <input className="input-token" type="text" placeholder="Token PandaScore" />
            <button className="btn-save-token" onClick={saveToken}>Sauvegarder</button>
        </div>
    )
}

export default Config;
