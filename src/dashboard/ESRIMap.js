import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import Basemap from "@arcgis/core/Basemap";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";

import Dashboard from "./Dashboard";

import "./ESRIMap.css";

function ESRIMap(props) {
  const mapDiv = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  let mapObjRef = useRef(null);

  let mapViewObjRef = useRef(null);
  const {currentMode} = props;
  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      mapObjRef.current = new Map({
        basemap: currentMode,
        layers: [],
      });

      mapViewObjRef.current = new MapView({
        container: mapDiv.current,
        center: [58.4217, 23.57947],
        zoom: 3,
        map: mapObjRef.current,
      });

      // Widget Positions
      mapViewObjRef.current.ui.move("zoom", "bottom-right");

      setTimeout(function () {
        setIsMapLoaded(true);
    }, mapViewObjRef.current.spatialReferenceWarningDelay);
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mapDiv.current && mapObjRef.current) {

       mapObjRef.current.basemap = Basemap.fromId(props.currentMode);

      setTimeout(function () {
        setIsMapLoaded(true);
    }, mapViewObjRef.current.spatialReferenceWarningDelay);
    }
  }, [props.currentMode]);

  const recenterMap = (locations, zoomLevel) => {
    if (mapViewObjRef.current && locations && locations.length > 0) {
      if (locations.length > 1 || zoomLevel) {
        const allCoordinatesArea = [];
        locations.forEach((element) => {
          const latLong = webMercatorUtils.lngLatToXY(
            element.longitude,
            element.latitude
          );
          allCoordinatesArea.push(latLong);
        });
        const globalePolygon = new Polygon({
          type: "polygon",
          rings: allCoordinatesArea,
          spatialReference: mapViewObjRef.current.spatialReference,
        });
        const graphic = new Graphic({
          geometry: globalePolygon,
        });
        mapViewObjRef.current.extent = graphic.geometry.extent;
        mapViewObjRef.current.zoom = zoomLevel
          ? zoomLevel
          : mapViewObjRef.current.zoom - 1;
      } else {
        let options = {
          duration: 1000,
          animate: true,
          easing: "ease",
        };
        let pt = new Point({
          longitude: locations[0].longitude,
          latitude: locations[0].latitude,
        });
        mapViewObjRef.current.goTo(
          {
            target: pt,
            zoom: 14,
          },
          options
        );
      }
    }
  };

  const addGraphicsMarkerLayer = (markerData) => {
    let customGraphicsList = [];
    
    markerData.forEach((location) => {
      const point = {
        type: "point", // autocasts as new Point()
        longitude: location.geoCodes.longitude,
        latitude: location.geoCodes.latitude,
      };

      // Create a symbol for drawing the point
      const markerSymbol = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: location.picture.src,
        width: location.picture.width,
        height: location.picture.height,
      };

      // Create a graphic and add the geometry and symbol to it
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });
      customGraphicsList.push(pointGraphic);
    });
    mapViewObjRef.current.graphics.addMany(customGraphicsList);
  };

  return (
    <div className="mapDiv" ref={mapDiv}>
      <Dashboard
        isMapLoaded={isMapLoaded}
        renderGraphicsLayer={addGraphicsMarkerLayer}
        recenterMap={recenterMap}
      />
    </div>
  );
}

export default ESRIMap;
