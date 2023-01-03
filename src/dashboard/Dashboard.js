import { useEffect } from "react";
import * as rawData from "../data/Data.json";

const Data = rawData.default;

function Dashboard(props) {
  const { isMapLoaded, renderGraphicsLayer, recenterMap } = props;

  useEffect(() => {
    if (isMapLoaded) {
      let markerData = [];
      Data.data.forEach((record) => {
        markerData.push({
          geoCodes: record.geoCodes,
          picture: {
            src: record.logo,
            height: "50px",
            width: "50px",
          },
          attributes: {
            name: record.name,
            city: record.city,
            state: record.state,
          },
        });
      });

      const geoCodes = Data.data.map((dataItem) => dataItem.geoCodes);

      renderGraphicsLayer(markerData);
      recenterMap(geoCodes);
    }
  }, [isMapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return false;
}

export default Dashboard;
