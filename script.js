const APIURL = "https://api.github.com/users/"; 

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const repoForm = document.getElementById('repo-form');
const repoSearch = document.getElementById('repo-search');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    getUser(search.value);
});

repoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRepos(repoSearch.value);
});

async function searchRepos(repoName) {
    try {
        const { data } = await axios(APIURL + username + '/repos?q=' + repoName);
        addReposToCard(data);
    } catch (err){
        if (err.response.status = 404){
            createErrorCard("No repository with that name");
        }
    }
}

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (err){
        if (err.response.status = 404){
            createErrorCard("No profile with that user name");
        }
    }
}



function addReposToCard(data){
    const reposEl = document.getElementById("repos");
    const ourUL = document.createElement("ul"); 
    

    data.slice(0, 5).forEach((repo) => {
        const anc = document.createElement("a");
        anc.classList.add("repo");
        anc.target = "_blank";
        anc.innerText = repo.name;
        const repoEl = document.createElement("li").apppendChild(anc);
        ourUL.appendChild(repoEl);
    });
    reposEl.appendChild(ourUL);
}

function createErrorCard(message) {
    const cardHTML =`
    <div class="card">
        <h1>${message}</h1>
    </div>
   `;
    main.innerHTML = cardHTML;
}

function createUserCard(user) {
    const userID = user.login || user.name;
    const userBio = user.bio ? `<p>${user.bio}</p>` : "";
    const cardHTML =` 
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${userID}" class="avatars">
            </div>
            <div class="user-info">
                <h2>${userID}</h2>
                ${userBio}
                <ul>
                    <li>
                        ${user.followers}
                        <strong>Followers</strong>
                    </li>
                    <li>
                        ${user.following}
                        <strong>Following</strong>
                    </li>
                    <li>
                        ${user.public_repos}
                        <strong>Repos</strong>
                    </li>
                </ul>
                <div id="repos">
                </div>
            </div>
        </div>
`;

main.innerHTML = cardHTML;
}
