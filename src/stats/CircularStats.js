import "./GitHubStats.scss";

const CircularStats = (props) => {
  return (
    <div>
      <div className="circle"> {props.value}</div>
      {props?.desc && <div className="circle-desc">{props?.desc}</div>}
    </div>
  );
};

export default CircularStats;
