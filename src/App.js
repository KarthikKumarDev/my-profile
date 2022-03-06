//@ts-check
import React, { useState } from "react";

import "./App.css";
import ESRIMap from "./dashboard/ESRIMap";
import Resume from "./resume/Resume";
import MapSelector from "./selector/MapSelector";

export const MapTypes = ["satellite", "streets-vector", "gray-vector"];

function App() {
  const [mapType, setMapType] = useState(MapTypes[0]);
  const [isResumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="App">
      <MapSelector
        currentMode={mapType}
        setMapMode={(value) => setMapType(value)}
        HandleOpenResume= {(event) => setResumeOpen(true)}
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
