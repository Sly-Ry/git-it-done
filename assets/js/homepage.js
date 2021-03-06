// servers -  A server is a piece of hardware set up to provide resources to other devices (often called clients).
// HTTP header - Allows the client and the server to pass additional information with an HTTP request or response. 
// calling an API syntax - 'q=SEARCH_KEYWORD_1+SEARCH_KEYWORD_N+QUALIFIER_1+QUALIFIER_N'
// 'q=javascript+html+css+is:featured'

// status code:
// 200 status - the HTTP request was successful
// 400s status - the server received the HTTP request but is missing information
// 500s status - an error with the server/possible lack of internet connection

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repo-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("div");
languageButtonsEl.setAttribute("id", "language-buttons");

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
    
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // link to the other html page, added query parameter "?repo" and equaled it repoName in order for the link to follow the searched repo
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

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
    fetch(apiUrl)
    .then(function(response) {

        // an if statement in case of 404 status on username search
        if (response.ok) {

            // json is used here, but sometimes "text() would be used if resources return non-json data"
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        }
        else {
            alert("Github User Not Found!");
        }
        // console.log("inside", response);
    })
    .catch(function(error) {
        
        // notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to Github");
    });
    // console.log("outside");
};
var getFeaturedRepos = function(language) {
    // "featured&sort" - the '&' character separates parameters
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                
                displayRepos(data.items, language);
            });
        }
        else {
            alert("Error: Github User Not Found");
        }
    });
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");
    if(language) {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    };
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);