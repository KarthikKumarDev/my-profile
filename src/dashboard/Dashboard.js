import { useEffect } from "react";
import * as rawData from "../data/Data.json";
const Data = rawData.default;

function Dashboard(props) {
  useEffect(() => {
    console.log(Data);
  }, []);

  useEffect(() => {
    if (props.isMapLoaded) {
      props.renderGraphicsLayer(Data.data[0].geoCodes);
    }
  }, [props.isMapLoaded]);

  return false;
}

export default Dashboard;
