export const getLanguageStats = (repoData) => {
  let languages = {};
  repoData.forEach((repo) => {
    if (languages[repo.language]) {
      languages[repo.language] += 1;
    } else{
        languages[repo.language] = 1;
    }
  });
  delete languages["null"];

  var languagesList = Object.keys(languages).map(item => { return {key: item, value: languages[item]}})
  return languagesList.sort((a, b) => b.value - a.value);
};

