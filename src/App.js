//@ts-check
import React, { useState } from "react";

import "./App.css";
import ESRIMap from "./dashboard/ESRIMap";
import Resume from "./resume/Resume";
import MapSelector from "./selector/MapSelector";
import Menu from "./menu/Menu";

export const MapTypes = ["satellite", "streets-vector", "gray-vector"];

function App() {
  const [mapType, setMapType] = useState(MapTypes[0]);
  const [mapMode, setMapMode] = useState(false);
  const [isResumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="App">
      <Menu />
      <MapSelector
        currentMode={mapMode}
        currentType={mapType}
        setMapType={(value) => setMapType(value)}
        setMapMode={(value) => setMapMode(value)}
        HandleOpenResume={(event) => setResumeOpen(true)}
      />
      <ESRIMap currentMode={mapType}></ESRIMap>
      <Resume
        isOpen={isResumeOpen}
        handleClose={(event) => setResumeOpen(false)}
      />
    </div>
  );
}

export default App;
