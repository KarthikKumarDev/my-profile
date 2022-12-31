import { useEffect, useState } from "react";
import { getUserRepos } from "../services/gitHub.services";
import { getLanguageStats } from "../helpers/gitHub.helpers";

import LanguageStats from "./LanguageStats";
import CircularStats from "./CircularStats";
import "./GitHubStats.scss";

function GitHubStats() {
  const [reposData, setReposData] = useState([]);
  const [languageStats, setLanguageStats] = useState([]);

  useEffect(() => {
    (async () => {
      const repoData = (await getUserRepos()).data;
      setReposData(repoData);
    })();
  }, []);

  useEffect(() => {
    setLanguageStats(getLanguageStats(reposData));
  }, [reposData]);

  return (
    <div className="large-panel">
      <div className="title">GitHub Stats</div>
      <div className="circular-stats">
        <CircularStats value={reposData.length} desc={"Total Repos"} />
      </div>
      <LanguageStats stats={languageStats} />
    </div>
  );
}

export default GitHubStats;
