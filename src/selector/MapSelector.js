import "./MapSelector.css";

function MapSelector(props) {
  return (
    <div className="radio-selector">
      <input type="radio" name="rg1" checked={props.currentMode} onChange= {() => props.setMapMode(true)} /> Professional Space
      <input type="radio" name="rg1" checked={!props.currentMode} onChange= {() => props.setMapMode(false)} /> Personal Space
    </div>
  );
}

export default MapSelector;
