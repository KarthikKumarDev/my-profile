import "./Menu.scss";
import * as rawData from "../data/Profile.json";
import { useState } from "react";

import GitHubStats from "../stats/GitHubStats";

const ProfileData = rawData.default.profile;

function MenuItem(props) {
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [currentSubMenuItem, setCurrentSubMenuItem] = useState(null);

  const rowToShow =
    currentMenuItem != null ? ProfileData[currentMenuItem] : false;
  // const htmlContent = {__html: rowToShow.items[currentSubMenuItem].stem};
  return (
    <div className="menu-wrapper">
      <div className="d-flex">
        {ProfileData.map((item, index) => {
          const indexToUpdate = currentMenuItem === index ? null : index;
          return (
            <div
              key={index}
              className={`menu-item ${
                index === currentMenuItem ? "selected-menu" : ""
              }`}
              onClick={(event) => setCurrentMenuItem(indexToUpdate)}
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
                  {rowToShow.items?.map((item, index) => (
                    <li
                      className="list"
                      onClick={(event) =>
                        setCurrentSubMenuItem(
                          currentSubMenuItem == item.id ? null : item.id
                        )
                      }
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <>
                <GitHubStats />
              </>
            )}
          </div>
        </>
      )}
      {currentMenuItem == 0 && currentSubMenuItem != null && (
        <div className="sub-menu-panel">
          <div className="regular">
          <div className="title">{rowToShow?.itemHeader}</div>
            <div className="html-container">
              <span
                dangerouslySetInnerHTML={{
                  __html: rowToShow?.items[currentSubMenuItem]?.stem,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
