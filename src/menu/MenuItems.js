import "./Menu.scss";
import * as rawData from "../data/Profile.json";
import { useState } from "react";

const ProfileData = rawData.default.profile;

function MenuItem(props) {
  const [currentMenuItem, setMenuItemIndex] = useState(null);

  const rowToShow =
    currentMenuItem != null ? ProfileData[currentMenuItem] : false;
  return (
    <div className="menu-wrapper">
      {ProfileData.map((item, index) => {
        const indexToUpdate = currentMenuItem === index ? null : index;
        return (
          <div
            className="menu-item"
            onClick={(event) => setMenuItemIndex(indexToUpdate)}
          > Icon {index + 1}</div>
        );
      })}

      {rowToShow && <div className="menu-panel">{rowToShow.topic}</div>}
    </div>
  );
}

export default MenuItem;
