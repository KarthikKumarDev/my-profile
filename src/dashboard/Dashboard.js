import { useEffect, useState } from "react";

import { getSheetValuesByName } from "../services/gSheet.services";
import { arrayToObject } from "../helpers/common.helpers";

function Dashboard(props) {
  const { isMapLoaded, renderGraphicsLayer, recenterMap } = props;

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
        markerData.push({
          geoCodes: {
            "latitude": record.Latitude,
            "longitude": record.Longitude
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
            Popup: record.PopupStem
          },
        });
      });

      const geoCodes = markerData.map((record) => record.geoCodes);

      renderGraphicsLayer(markerData);
      recenterMap(geoCodes);
    }
  }, [isMapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return false;
}

export default Dashboard;
