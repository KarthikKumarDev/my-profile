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

//   console.log(languages);

  return languages;
};
