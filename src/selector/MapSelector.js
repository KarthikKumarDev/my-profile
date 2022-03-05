import "./MapSelector.scss";

function MapSelector(props) {
  return (
    <div className="radio-selector">
      <input
        type="radio"
        name="rg1"
        checked={props.currentMode}
        onChange={() => props.setMapMode(true)}
      />
      Professional
      <input
        type="radio"
        name="rg1"
        checked={!props.currentMode}
        onChange={() => props.setMapMode(false)}
      />
      Personal
    </div>
  );
}

export default MapSelector;
