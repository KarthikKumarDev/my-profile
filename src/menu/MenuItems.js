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
      <div className="d-flex">
        {ProfileData.map((item, index) => {
          const indexToUpdate = currentMenuItem === index ? null : index;
          return (
            <div
              className={`menu-item ${
                index === currentMenuItem ? "selected-menu" : ""
              }`}
              onClick={(event) => setMenuItemIndex(indexToUpdate)}
            >
              <img src="./images/tech-icon.png" width="40px" alt="Menu Item" />
            </div>
          );
        })}
      </div>

      {rowToShow && (
        <>
          <div className="menu-panel">
            <div className="title">{rowToShow.topic}</div>
            {rowToShow.items.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MenuItem;
