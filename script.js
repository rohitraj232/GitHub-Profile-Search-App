let apiURL = `https://api.github.com/users/`;
const mainId = document.querySelector("#main");
const reposId = document.querySelector("#repos");
const loader = document.querySelector("#loader");

const getUser = async (username) => {
  try {
    loader.style.display = "block"; // Show loader while fetching data
    let userUrl = apiURL + username;
    const response = await fetch(userUrl);
    const data = await response.json();
    let userRepoData = await (
      await fetch(userUrl + "/repos?ref=codesnippet.io")
    ).json();
    console.log(userRepoData);

    const card = `
        <div class="head-container">
            <div class="left">
                <img id="avatar" src="${data.avatar_url}" alt="fgh" />
                <p class="github-url">${data.url}</p>
            </div>  

            <div class="right">
                <h3>${data.name}</h3>
                <p class="details">${data.bio}</p>
                <p class="details">${data.location}</p>        
                <p class="details">Twitter: ${data.twitter_username}</p>
            </div>
        </div>  
    `;

    const repo = `
    <div class="repositories">
            ${userRepoData
              .map((item, index) => {
                return `
                <div class="repoItem"> 
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="topics">${item.topics
                      .map((topic) => `<span class="topic">${topic}</span>`)
                      .join("")}</p>
                </div>
              `;
              })
              .join("")}
            </div>
    `;

    mainId.innerHTML = card;
    reposId.innerHTML = repo;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loader.style.display = "none"; // Hide loader after data is loaded
  }
};

getUser("timmywheels");

function formSubmit() {
  const userId = document.querySelector("#search");
  if (userId.value !== "") {
    getUser(userId.value);
    userId.value = "";
  }
  return false;
}
