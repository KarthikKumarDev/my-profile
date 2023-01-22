import { useEffect, useState } from "react";

import { getSheetValuesByName } from "../services/gSheet.services";
import { arrayToObject } from "../helpers/common.helpers";

function Dashboard(props) {
  const {
    isMapLoaded,
    renderGraphicsLayer,
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
        if (currentMapDataType?.toString() === record.DataType) {
          markerData.push({
            geoCodes: {
              latitude: record.Latitude,
              longitude: record.Longitude,
            },
            picture: {
              src: record.Logo,
              height: "50px",
              width: "50px",
            },
            attributes: {
              name: record.Name,
              city: record.City,
              state: record.State,
              popup: record.PopupStem,
              dataType: record.Type,
            },
          });
        }
      });

      const geoCodes = markerData.map((record) => record.geoCodes);

      const layerTitle = "dashboard-graphics";
      removeLayerByTitle(layerTitle);
      renderGraphicsLayer(markerData, layerTitle);
      recenterMap(geoCodes);
    }
  }, [isMapLoaded, currentMapDataType]); // eslint-disable-line react-hooks/exhaustive-deps

  return false;
}

export default Dashboard;
