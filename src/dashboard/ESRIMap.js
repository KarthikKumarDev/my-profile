import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic"

import Dashboard from "./Dashboard";

import "./ESRIMap.css";

function ESRIMap(props) {
  const mapDiv = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  let mapObjRef = useRef(null);

  let mapViewObjRef = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

       mapObjRef.current = new Map({
        basemap: "hybrid",
        layers: [],
      });

      mapViewObjRef.current = new MapView({
        container: mapDiv.current,
        center: [58.4217, 23.57947],
        zoom: 3,
        map: mapObjRef.current,
      });
      setIsMapLoaded(true)
    }
  }, []);

  const addGraphicsMarkerLayer = (markerData) =>{
    let customGraphicsList = []
    markerData.forEach(location=>{
      const point = {
        type: "point", // autocasts as new Point()
        longitude: location.geoCodes.longitude,
        latitude: location.geoCodes.latitude
      };
  
      // Create a symbol for drawing the point
      const markerSymbol = {
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
        url: location.picture.src,
        width: location.picture.width,
        height: location.picture.height
      };
  
      // Create a graphic and add the geometry and symbol to it
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });
      customGraphicsList.push(pointGraphic)
    })
    mapViewObjRef.current.graphics.addMany(customGraphicsList);
  }

  return <div className="mapDiv" ref={mapDiv}><Dashboard isMapLoaded={isMapLoaded} renderGraphicsLayer = {addGraphicsMarkerLayer} /></div>;
}

export default ESRIMap;
