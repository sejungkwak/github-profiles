const form = document.getElementById('form');
const search = document.getElementById('search');
const API = 'https://api.github.com/users/';
const REPO_API = '/repos?sort=updated&direction=desc&per_page=5';

search.focus();

form.addEventListener('submit', (e) => {
  const searchName = search.value;
  
  e.preventDefault();

  if (document.body.lastElementChild.className === 'result') {
    document.body.lastElementChild.remove();
  }

  if ( searchName && searchName !== ' ' ) {
    getUser(API + searchName);
    search.value = '';
  } else {
    window.location.reload();
  }
});

function getUser(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const div = document.createElement('div');
    div.classList.add('result');
    
    if ( data.message === 'Not Found' ) {
      const h2 = document.createElement('h2');
      h2.innerText = 'No profile with this username.'
      div.appendChild(h2);
    } else {
      div.innerHTML = `
        <img class="avatar" src="${data.avatar_url}" alt="${data.name}" width="100" height="100">
        <div class="info">
          <h3 class="name">${data.name}</h3>
          <p id="bio" class="bio">${data.bio}</p>
          <div class="figures">
            <p class="figure"><span>${data.followers}</span> Followers</p>
            <p class="figure"><span>${data.following}</span> Following</p>
            <p class="figure"><span>${data.public_repos}</span> Repos</p>
          </div>
        </div>
      `
    }

    setTimeout(() => {
      processingNull()
    }, 100)

    document.body.appendChild(div);

    return fetch(url + REPO_API)

  }).then(res => res.json())
  .then(results => {
    const info = document.querySelector('.info')
    const div = document.createElement('div');
    div.classList.add('recent-repos');

    results.forEach(result => {
      div.innerHTML += `<small class="repo">${result.name}</small>`
    })
    info.appendChild(div);

  }).catch(err => console.log(err))
}

function processingNull() {
  const bio = document.getElementById('bio');
  if ( bio.textContent === 'null' ) {
    bio.textContent = 'No bio in this profile.'
  }
}