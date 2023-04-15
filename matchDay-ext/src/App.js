import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Vitality from "./pages/vitality/Vitality";
import Karmine from "./pages/karmine/Karmine";
import Solary from "./pages/solary/Solary";
import Bds from "./pages/bds/Bds";
import M8 from "./pages/m8/M8";
import Settings from "./pages/Settings";
import { Route, Routes } from 'react-router-dom';
import Config from "./ConfigPandaScore";

const App = () => {
  const [tokenPandaScore, setTokenPandaScore] = useState("");
  /*global chrome*/
  useEffect(() => {
    chrome.storage.sync.get(['token'], function (result) {
      setTokenPandaScore(result.token);
    });
  }, []);

  if (!tokenPandaScore) {
    return (
      <>
        <div className="container">
          <Config />
        </div>
      </>
    )
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/popup.html" element={<Home />} />
          <Route path="/vitality/*" element={<Vitality />} />
          <Route path="/karmine/*" element={<Karmine />} />
          <Route path="/solary/*" element={<Solary />} />
          <Route path="/bds/*" element={<Bds />} />
          <Route path="/gentle-mates/*" element={<M8 />} />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
