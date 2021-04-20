# GitHub Profiles

![screen recording](https://media.giphy.com/media/d1j9jXtviKkexfbGo6/giphy.gif)

#### project notes

1. HTML

- input: text for searchbox "Search a GitHub User"
- no result: "No profile with this username"

2. CSS

3. JavaScript

- fetch GitHub API, use profile data(picture, name, bio, number of followers, number of following, number of repos, latest 5 repos), display them in a card

- Challenge from Brad Traversy & Florin Pop on Udemy '50 Projects in 50 Days'

#### Takeaways from the instructor

1. HTML

- figure data in ul / li

2. CSS

- media query

3. JavaScript

- (forgot to add figure data)
- click event on a repository name to land the repository
- used axios library: get cdn and paste it above script file tag in .html

```
const APIURL = 'https://api.github.com/users/';
const form = document.getElementId('form');
const search = document.getElementId('search');
const main = document.getElementId('main');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getRepost(username);
  } catch(err) {
    if ( err.response.status === 404 ) {
      createErrorCard('No profile with this username.');
    }
  }
}

async function getRepos(username) {
    try {
    const { data } = await axios(APIURL + username + '/repos?sort=created');
    addReposToCard(data);
  } catch(err) {
    createErrorCard('Problem fetching repos');
  }
}

function createUserCard(user) {
  const cardHTML = `
  /*--------------------
  HTML tags except repos
  --------------------*/
  `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos
    .slice(0, 5)
    .forEach(repo => {
    const repoLink = document.createElement('a')
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;
  if ( user ) {
    getUser(user);
    search.value = '';
  }
})

function createErrorCard(msg) {
  const cardHTML = `<div class="card"> <h1>${msg}</h1> </div>`
  main.innerHTML = cardHTML;
}
```
