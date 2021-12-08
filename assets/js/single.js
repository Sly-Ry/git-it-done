var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    
    // grab repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    
    if (repoName) {
        
        // display repo name on page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
    else {
        
        // if no repo was given, redirect to homepage
        document.location.replace("./index.html");
    }
};

var getRepoIssues = function(repo) {
    // the ?direction=asc option reverses order to return oldest->newest, otherwise the order will be newest->oldest
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl)
    .then(function(response) {
        
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            
                // pass response data to dom function
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        
        // an 'html_url' property links to the full issue on GitHub
        issueEl.setAttribute("href", issues[i].html_url);
        
        // '_blank' opens the link in a new tab instead of replacing the current webpage
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");
        
        // check is issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};


getRepoName();