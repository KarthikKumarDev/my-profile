//@ts-check
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { MapTypes } from "../App";
import "./MapSelector.scss";

function MapSelector(props) {

  const handleChange = (event) => {
    props.setMapMode(event.target.value);
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
        <PictureAsPdfIcon color="primary" onClick={props.HandleOpenResume}/>
      </div>
      <div className="map-type">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Map Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.currentMode}
            label="Map Type"
            onChange={handleChange}
          >
            {MapTypes.map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default MapSelector;
