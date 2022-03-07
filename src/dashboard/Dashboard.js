import schoolLogo from "../images/school-logo.png";
import collegeLogo from "../images/college-logo.png";
import { useEffect } from "react";
import * as rawData from "../data/Data.json";

const Data = rawData.default;

function Dashboard(props) {

  const {isMapLoaded, renderGraphicsLayer, recenterMap} = props;

  useEffect(() => {
    if (isMapLoaded) {
      let markerData = [
        {
          geoCodes: Data.data[0].geoCodes,
          picture: {
            src: schoolLogo,
            height: "65px",
            width: "250px",
          },
        },
        {
          geoCodes: Data.data[1].geoCodes,
          picture: {
            src: collegeLogo,
            height: "65px",
            width: "250px",
          },
        },
      ];
      const geoCodes = Data.data.map((dataItem) => dataItem.geoCodes);
      renderGraphicsLayer(markerData);
      recenterMap(geoCodes);
    }
  }, [isMapLoaded]);

  return false;
}

export default Dashboard;
