import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Find from "./pages/Find";
import Suggest from "./pages/Suggest";

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path="/" element={<Find />} />
                <Route path="/suggest/:label" element={<Suggest />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
