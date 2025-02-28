// Get All Variables
let inputRepo = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let showRepo = document.querySelector(".show-data span");
// [1]
getButton.addEventListener("click", getRepos);
// [2] Get Repos
function getRepos() {
  if (inputRepo.value == "") {
    showRepo.innerHTML = "Please Enter a Valid Repository Name";
  } else {
    fetch(`https://api.github.com/users/${inputRepo.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        showRepo.innerHTML = "";
        // Check if repo is not found
        if (data.length === 0) {
          showRepo.innerHTML = "No repositories found for this user :(";
          return;
        }
        // Create User Info
        const userInfoDiv = document.createElement("div");
        userInfoDiv.className = "user-info";
        // 1
        const imgUser = document.createElement("img");
        imgUser.src = data[0].owner.avatar_url;
        imgUser.alt = "User Avatar";
        imgUser.classList.add("img-user");
        // 2
        const userName = document.createElement("p");
        userName.textContent = data[0].owner.login;
        userName.classList.add("user-name");
        // 3
        userInfoDiv.appendChild(imgUser);
        userInfoDiv.appendChild(userName);
        // 4
        showRepo.appendChild(userInfoDiv);
        //   Looping in Data
        data.forEach((repo) => {
          //   Create a Main Div
          let mainDiv = document.createElement("div");
          // Repo Name
          const repoName = document.createElement("p");
          repoName.textContent = repo.name;
          mainDiv.appendChild(repoName);
          // Url Repository
          let urlDiv = document.createElement("div");
          let urlRepo = document.createElement("a");
          let urlRepoText = document.createTextNode("See Repository");
          urlRepo.appendChild(urlRepoText);
          urlRepo.href = `https://github.com/${repo.full_name}`;
          urlRepo.target = "_blank";
          urlDiv.appendChild(urlRepo);
          mainDiv.appendChild(urlDiv);
          //Creat Stars Count
          let spanStars = document.createElement("span");
          let spanStarsText = document.createTextNode(
            repo.stargazers_count + " " + "⭐"
          );
          spanStars.appendChild(spanStarsText);
          urlDiv.appendChild(spanStars);
          mainDiv.appendChild(urlDiv);
          mainDiv.className = "repo-div";

          showRepo.appendChild(mainDiv);
        });
      });
  }
}
