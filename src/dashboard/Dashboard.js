import { useEffect, useState } from "react";

import { getSheetValuesByName } from "../services/gSheet.services";
import { arrayToObject } from "../helpers/common.helpers";

function Dashboard(props) {
  const {
    isMapLoaded,
    // renderGraphicsLayer,
    renderClusterLayer,
    recenterMap,
    currentMapDataType,
    removeLayerByTitle,
  } = props;

  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    (async () => {
      const geoData = (await getSheetValuesByName("Geo")).data;
      setGeoData(arrayToObject(geoData.values));
    })();
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      let markerData = [];
      geoData.forEach((record) => {
        if (
          currentMapDataType === "All" ||
          currentMapDataType === record.DataType
        ) {
          markerData.push({
            geoCodes: {
              latitude: record.Latitude,
              longitude: record.Longitude,
            },
            attributes: {
              name: record.Name,
              city: record.City,
              state: record.State,
              popup: record.PopupStem,
              dataType: record.Type,
              picture: {
                src: record.Logo,
                height: record.LogoHeight,
                width: record.LogoWidth,
              },
            },
          });
        }
      });

      const geoCodes = markerData.map((record) => record.geoCodes);

      const layerTitle = "dashboard-graphics";
      removeLayerByTitle(layerTitle);

      if (geoCodes.length) {
        // renderGraphicsLayer(markerData, layerTitle);
        renderClusterLayer(markerData, layerTitle);
      }
      recenterMap(geoCodes);
    }
  }, [isMapLoaded, currentMapDataType]); // eslint-disable-line react-hooks/exhaustive-deps

  return false;
}

export default Dashboard;
