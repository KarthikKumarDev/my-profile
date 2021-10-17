import schoolLogo from '../images/school-logo.png'
import collegeLogo from '../images/college-logo.png'
import { useEffect } from "react";
import * as rawData from "../data/Data.json";

const Data = rawData.default;

function Dashboard(props) {
  useEffect(() => {
    console.log(Data);
  }, []);

  useEffect(() => {
    if (props.isMapLoaded) {
     let markerData =[{
        geoCodes: Data.data[0].geoCodes,
        picture: {
          src: schoolLogo,
          height: "30px",
          width: "105px"
        }
      },{
        geoCodes: Data.data[1].geoCodes,
        picture: {
          src: collegeLogo,
          height: "30px",
          width: "105px"
        }
      }]
      props.renderGraphicsLayer( markerData);
    }
  }, [props.isMapLoaded]);

  return false;
}

export default Dashboard;
