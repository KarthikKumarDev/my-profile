//@ts-check
import React, { useState } from "react";

import "./App.css";
import ESRIMap from "./dashboard/ESRIMap";
import Resume from "./resume/Resume";
import MapSelector from "./selector/MapSelector";
import Menu from "./menu/Menu";

export const MapDataTypes = ["All", "Educational", "Professional"];

export const MapTypes = [
  { label: "Open Street Map", value: "osm" },
  { label: "Geo-Hybrid", value: "hybrid" },
  { label: "Nat Geo", value: "national-geographic" },
  { label: "Streets Vector", value: "streets-vector" },
  { label: "Gray Vector", value: "gray-vector" },
];

function App() {
  const [mapType, setMapType] = useState(MapTypes[0]);
  const [mapDataType, setMapDataType] = useState(MapDataTypes[0]);
  const [isResumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="App">
      <Menu />
      <MapSelector
        currentMapDataType={mapDataType}
        currentMapType={mapType}
        setMapType={(value) =>
          setMapType(
            MapTypes.find((item) => item.value === value) || MapTypes[0]
          )
        }
        setMapDataType={(value) => setMapDataType(value)}
        HandleOpenResume={(event) => setResumeOpen(true)}
      />
      <ESRIMap
        currentMapType={mapType.value}
        currentMapDataType={mapDataType}
      ></ESRIMap>
      <Resume
        isOpen={isResumeOpen}
        handleClose={(event) => setResumeOpen(false)}
      />
      <span id="style-span" style={{ display: "none" }} />
    </div>
  );
}

export default App;
