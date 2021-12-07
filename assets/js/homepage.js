// servers -  A server is a piece of hardware set up to provide resources to other devices (often called clients).

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repo-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value form input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl = "";
    }
    else {
        alert("Please enter a Github username.");
    }
    
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append "titleEl" to "div" container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>" + repos[i].open_issues_count + " issue(s)";
        }

        // append "statusEl" to "div" container
        repoEl.appendChild(statusEl);

        // append "div" container to dom (repoContainerEl)
        repoContainerEl.appendChild(repoEl);
        
    }

    // logs an array of the users repos
    console.log(repos);
    // logs the username, since we're using it to search for repos
    console.log(searchTerm);
};

// create a var that gets user repos
var getUserRepos = function(user){

    // format the github api url
    var apiUrl = "https://api.github.com/users/"+ user +"/repos";
    
    // fetch from app and a response came from GitHub's server.
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        
        // json is used here, but sometimes "text() would be used if resources return non-json data"
        response.json().then(function(data) {
            displayRepos(data, user);
        });
        // console.log("inside", response);
    });
    
    // console.log("outside");
};

userFormEl.addEventListener("submit", formSubmitHandler);