import "./Menu.scss";
import { useEffect, useState } from "react";

import GitHubStats from "../stats/GitHubStats";
import { getSheetValuesByName } from "../services/gSheet.services";
import { arrayToObject } from "../helpers/common.helpers";

function MenuItem(props) {
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [currentSubMenuItem, setCurrentSubMenuItem] = useState(null);
  const [contentData, setContentData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);

  useEffect(() => {
    (async () => {
      const contentData = (await getSheetValuesByName("Content")).data;
      setContentData(arrayToObject(contentData.values));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const topicsData = (await getSheetValuesByName("Topics")).data;
      setTopicsData(arrayToObject(topicsData.values));
    })();
  }, []);

  const menuToShow =
    currentMenuItem != null
      ? topicsData.find((item) => item.Id === currentMenuItem)
      : false;

  const subMenusToShow =
    currentMenuItem != null
      ? contentData.filter((item) => item.TopicId === currentMenuItem)
      : false;

  const selectedSubMenu = contentData.find(
    (item) => item.Id === currentSubMenuItem
  );

  return (
    <div className="menu-wrapper">
      <div className="level-1-menu">
        {topicsData.map((item, index) => {
          const indexToUpdate = currentMenuItem === item.Id ? null : item.Id;
          return (
            <div
              key={index}
              className={`menu-item ${
                item.Id === currentMenuItem ? "selected-menu" : ""
              }`}
              onClick={(event) => setCurrentMenuItem(indexToUpdate)}
            >
              <img
                src={`./images/${item.Icon}.png`}
                width="40px"
                alt="Menu Item"
              />
            </div>
          );
        })}
      </div>

      {menuToShow && (
        <>
          <div className="menu-panel">
            {menuToShow.SubMenu === "TRUE" && subMenusToShow.length ? (
              <div className="regular">
                <div className="title">{menuToShow.Name}</div>
                <ol>
                  {subMenusToShow?.map((item, index) => (
                    <li
                      className={`list ${
                        currentSubMenuItem === item.Id ? "selected" : ""
                      }`}
                      onClick={(event) =>
                        setCurrentSubMenuItem(
                          currentSubMenuItem === item.Id ? null : item.Id
                        )
                      }
                      key={index}
                    >
                      {item.ContentTitle}
                    </li>
                  ))}
                </ol>
              </div>
            ) : menuToShow.Id === "2" ? (
              <>
                <GitHubStats />
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      {selectedSubMenu && menuToShow.SubMenu === "TRUE" && (
        <div className="sub-menu-panel">
          <div className="regular">
            <div className="title">{selectedSubMenu.ContentTitle}</div>
            <div className="html-container">
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedSubMenu?.Stem,
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
