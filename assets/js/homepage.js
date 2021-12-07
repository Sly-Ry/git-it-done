// servers -  A server is a piece of hardware set up to provide resources to other devices (often called clients).

// create a var that gets user repos
var getUserRepos = function(user){

    // format the github api url
    var apiUrl = "https://api.github.com/users/"+ user +"/repos";
    
    // fetch from app and a response came from GitHub's server.
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        
        // json is used here, but sometimes "text() would be used if resources return non-json data"
        response.json().then(function(data) {
            console.log(data);
        });
        // console.log("inside", response);
    });
    
    // console.log("outside");
};

getUserRepos();