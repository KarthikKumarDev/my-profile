//@ts-check
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

import About from "../dashboard/About";
import { MapTypes } from "../App";
import "./MapSelector.scss";

function MapSelector(props) {
  const [openInfo, setOpenInfo] = React.useState(false);

  const handleChange = (event) => {
    props.setMapType(event.target.value);
  };

  return (
    <div className="map-controls">
      <div className="radio-selector">
        <div>
          <input
            type="radio"
            name="rg1"
            checked={props.currentMode}
            onChange={() => props.setMapMode(true)}
          />
          Work
        </div>
        <div>
          <input
            type="radio"
            name="rg1"
            checked={!props.currentMode}
            onChange={() => props.setMapMode(false)}
          />
          Education
        </div>
        <PictureAsPdfIcon color="primary" onClick={props.HandleOpenResume} />
        <InfoIcon color="primary" onClick={(event) => setOpenInfo(true)} />
        <Dialog onClose={(event) => setOpenInfo(false)} open={openInfo}>
          <DialogTitle>
            <div className="info-panel">
              About this App
              <CloseIcon
                aria-label="close"
                onClick={(event) => setOpenInfo(false)}
              />
            </div>
          </DialogTitle>
          <About />
        </Dialog>
      </div>
      <div className="map-type">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Map Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.currentType}
            label="Map Type"
            onChange={handleChange}
          >
            {MapTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default MapSelector;
