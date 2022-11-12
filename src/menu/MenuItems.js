import "./Menu.scss";
import * as rawData from "../data/Profile.json";
import { useState } from "react";

import GitHubStats from "../stats/GitHubStats";

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
              <img
                src={`./images/${item.icon}.png`}
                width="40px"
                alt="Menu Item"
              />
            </div>
          );
        })}
      </div>

      {rowToShow && (
        <>
          <div className="menu-panel">
            {rowToShow?.items?.length ? (
              <div className="regular">
                <div className="title">{rowToShow.topic}</div>
                <ol>
                {rowToShow.items?.map((item) => (
                  <li>{item}</li>
                ))}
                </ol>
              </div>
            ) : (
              <><GitHubStats/></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MenuItem;
