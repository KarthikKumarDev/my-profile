import { CircularProgress } from "@mui/material";
import "./GitHubStats.scss";

const CircularStats = (props) => {
  return (
    <div>
      {props.showLoader && <CircularProgress size={120} color="inherit" />}
      {!props.showLoader && <div className="circle"> {props.value}</div>}
      {props?.desc && <div className="circle-desc">{props?.desc}</div>}
    </div>
  );
};

export default CircularStats;
