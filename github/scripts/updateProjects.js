const fs = require('fs');
const axios = require('axios');

const username = 'esdrasfonsecag-code';
const readmePath = 'README.md';

async function getRepos() {
  const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
  return res.data;
}

async function updateReadme() {
  const repos = await getRepos();
  const projectSection = repos.map(repo => `- [${repo.name}](${repo.html_url}) - ${repo.description || 'No description'}`).join('\n');

  let readme = fs.readFileSync(readmePath, 'utf-8');
  readme = readme.replace(/<!-- Projects will be injected here by GitHub Action -->[\s\S]*?<\/div>/, `<!-- Projects will be injected here by GitHub Action -->\n${projectSection}\n</div>`);
  fs.writeFileSync(readmePath, readme);
}

updateReadme();
