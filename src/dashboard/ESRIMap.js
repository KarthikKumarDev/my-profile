import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Basemap from "@arcgis/core/Basemap";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";

import {
  generateGeoJSON,
  generateJSONBlobURL,
  generateUniqueValueInfos,
  getClusterIconSVG,
  generateSVGBlobURL
} from "../helpers/map.helpers";

import Dashboard from "./Dashboard";

import "./ESRIMap.scss";

function ESRIMap(props) {
  const mapDiv = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  let mapObjRef = useRef(null);

  let mapViewObjRef = useRef(null);
  const { currentMapType } = props;
  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      mapObjRef.current = new Map({
        basemap: currentMapType,
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

      mapViewObjRef.current.popup.autoOpenEnabled = false;

      mapViewObjRef.current.on("click", (event) => {
        mapViewObjRef.current.hitTest(event).then((response) => {
          // only get the graphics returned from myLayer
          const graphicHits = response.results?.filter(
            (hitResult) =>
              hitResult.type === "graphic" &&
              hitResult.graphic.layer.title !== "Hybrid Reference Layer"
          );
          if (graphicHits?.length > 0) {
            mapViewObjRef.current.popup.open({
              location: event.mapPoint,
              content: graphicHits[0].graphic.attributes.popup || "",
              title: graphicHits[0].graphic.attributes.city || "Location",
            });

            document.getElementById("style-span").innerHTML =
              graphicHits[0].graphic.attributes.popup;
          }
        });
      });

      setTimeout(function () {
        setIsMapLoaded(true);
      }, mapViewObjRef.current.spatialReferenceWarningDelay);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mapDiv.current && mapObjRef.current) {
      mapObjRef.current.basemap = Basemap.fromId(props.currentMapType);

      setTimeout(function () {
        setIsMapLoaded(true);
      }, mapViewObjRef.current.spatialReferenceWarningDelay);
    }
  }, [props.currentMapType]);

  const recenterMap = (locations, zoomLevel) => {
    let options = {
      duration: 2000,
      animate: true,
      easing: "ease",
    };

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

        mapViewObjRef.current.goTo(
          {
            target: graphic.geometry,
          },
          options
        );
        mapViewObjRef.current.zoom = zoomLevel
          ? zoomLevel
          : mapViewObjRef.current.zoom - 1;
      } else {
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

  const addGraphicsMarkerLayer = (markerData, layerTitle = "mylayer") => {
    let customGraphicsList = [];

    if (markerData?.length) {
      markerData.forEach((location) => {
        const point = {
          type: "point", // autocasts as new Point()
          longitude: location.geoCodes.longitude,
          latitude: location.geoCodes.latitude,
        };

        // Create a symbol for drawing the point
        const markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: location.attributes.picture.src,
          width: location.attributes.picture.width,
          height: location.attributes.picture.height,
        };

        // Create a graphic and add the geometry and symbol to it
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
        });
        pointGraphic.attributes = location.attributes;
        customGraphicsList.push(pointGraphic);
      });

      let graphicLayer = new GraphicsLayer({
        graphics: customGraphicsList,
        title: layerTitle,
      });
      mapObjRef.current.layers.push(graphicLayer);
    }
  };

  const addClusterMarkerLayer = (markerData, layerTitle = "myClusterlayer") => {
    if (markerData?.length) {
      const clusterConfig = {
        type: "cluster",
        clusterRadius: "100px",
        // {cluster_count} is an aggregate field containing
        // the number of features comprised by the cluster
        popupTemplate: {
          title: "Cluster summary",
          content: "This cluster represents {cluster_count} locations.",
          fieldInfos: [
            {
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true,
              },
            },
          ],
        },
        clusterMinSize: "50px",
        clusterMaxSize: "50px",
        labelingInfo: [
          {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')",
            },
            symbol: {
              type: "text",
              color: "#FFFFFF",
              yoffset: 3,
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "18px",
              },
            },
            labelPlacement: "center-center",
          },
        ],
      };

      const clusterLayer = new GeoJSONLayer({
        title: layerTitle,
        url: generateJSONBlobURL(generateGeoJSON(markerData)),
        copyright: "Karthik Kumar",

        featureReduction: clusterConfig,

        renderer: {
          type: "unique-value", // autocasts as new UniqueValueRenderer()
          field: "name",
          defaultSymbol: {
            type: "picture-marker",
            url: generateSVGBlobURL(getClusterIconSVG()),
            width: 50,
            height: 50
          },
          uniqueValueInfos: generateUniqueValueInfos(markerData),
        },
      });
      mapObjRef.current.layers.push(clusterLayer);
    }
  };

  const removeLayerByTitle = (title) => {
    mapViewObjRef?.current?.popup?.close();
    mapObjRef.current.remove(
      mapObjRef.current.allLayers.find((layer) => layer.title === title)
    );
  };

  return (
    <div className="mapDiv" ref={mapDiv}>
      <Dashboard
        isMapLoaded={isMapLoaded}
        renderGraphicsLayer={addGraphicsMarkerLayer}
        renderClusterLayer={addClusterMarkerLayer}
        recenterMap={recenterMap}
        currentMapDataType={props.currentMapDataType}
        removeLayerByTitle={removeLayerByTitle}
      />
    </div>
  );
}

export default ESRIMap;
