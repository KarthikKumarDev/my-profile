import { useEffect, useState } from "react";
import { getUserRepos, getUserEvents } from "../services/gitHub.services";
import { getLanguageStats, getActiveRepos } from "../helpers/gitHub.helpers";

import LanguageStats from "./LanguageStats";
import CircularStats from "./CircularStats";
import "./GitHubStats.scss";

function GitHubStats() {
  const [reposData, setReposData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [languageStats, setLanguageStats] = useState([]);
  const [forkCount, setForkCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    (async () => {
      const repoData = (await getUserRepos()).data;
      setReposData(repoData);
      
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const events  = (await getUserEvents()).data;
      setEventsData(events);
    })();
  }, []);

  useEffect(() => {
    const forkCount = reposData.filter(repo => repo.fork === true).length
    setForkCount(forkCount);
    setLanguageStats(getLanguageStats(reposData));
  }, [reposData]);

  useEffect(() =>{
    setActiveCount(getActiveRepos(eventsData));
  }, [eventsData])

  return (
    <div className="large-panel">
      <div className="title">GitHub Stats</div>
      <div className="circular-stats">
        <CircularStats value={reposData.length - forkCount} desc={"Total Repos"} />
        <CircularStats value={forkCount} desc={"Forked Repos"} />
        <CircularStats value={activeCount} desc={"Active Repos"} />
      </div>
      {languageStats && <LanguageStats stats={languageStats} />}
    </div>
  );
}

export default GitHubStats;
