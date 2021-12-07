// servers -  A server is a piece of hardware set up to provide resources to other devices (often called clients).

// create a var that gets user repos
var getUserRepos = function(){
    fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();