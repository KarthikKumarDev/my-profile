export const getLanguageStats = (repoData) => {
  let languages = {};
  repoData.forEach((repo) => {
    if (languages[repo.language]) {
      languages[repo.language] += 1;
    } else {
      languages[repo.language] = 1;
    }
  });
  delete languages["null"];

  var languagesList = Object.keys(languages).map((item) => {
    return { key: item, value: languages[item] };
  });
  return languagesList.sort((a, b) => b.value - a.value);
};

export const getActiveRepos = (eventData) => {
  const myEvents = eventData.filter(event => event.actor.id === 24319113 && event.type !== "WatchEvent");

  const result = myEvents.reduce((total, value) => {
    total[value.repo.name] = (total[value.repo.name] || 0) + 1;
    return total;
  }, {});

  return Object.keys(result).length;
};
