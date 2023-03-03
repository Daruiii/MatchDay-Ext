import Navbar from "./Navbar";
import Home from "./pages/Home";
import Vitality from "./pages/vitality/Vitality";
import Karmine from "./pages/karmine/Karmine";
import Solary from "./pages/solary/Solary";
import Bds from "./pages/bds/Bds";
import Settings from "./pages/Settings";
import { Route, Routes } from 'react-router-dom';
const App = () => {

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
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
