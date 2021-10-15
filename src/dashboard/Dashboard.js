import schoolLogo from '../images/school-logo.png'
import { useEffect } from "react";
import * as rawData from "../data/Data.json";

const Data = rawData.default;

function Dashboard(props) {
  useEffect(() => {
    console.log(Data);
  }, []);

  useEffect(() => {
    if (props.isMapLoaded) {
     let markerData ={
        geoCodes: Data.data[0].geoCodes,
        picture: {
          src: schoolLogo,
          height: "50px",
          width: "175px"
        }
      }
      props.renderGraphicsLayer( markerData);
    }
  }, [props.isMapLoaded]);

  return false;
}

export default Dashboard;
