import React, { useState } from "react";

import "./App.css";
import ESRIMap from "./dashboard/ESRIMap";
import MapSelector from "./selector/MapSelector";

export const MapTypes = ["satellite", "streets-vector", "gray-vector"];

function App() {
  const [mapType, setMapType] = useState(MapTypes[0]);

  return (
    <div className="App">
      <MapSelector
        currentMode={mapType}
        setMapMode={(value) => setMapType(value)}
      />
      <ESRIMap currentMode={mapType}></ESRIMap>
    </div>
  );
}

export default App;
