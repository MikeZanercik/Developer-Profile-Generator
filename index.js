var axios = require("axios");
var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        message: "What is your gitHub username?",
        name: "username",
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "Red",
            "Blue",
            "Orange",
            "Green",
            "Purple",
            "Yellow"
        ]
    },
])
    .then(function (answers) {
        axios.get("https://api.github.com/users/" + answers.username)
            .then(function (response) {                
                fs.writeFile("myPage.md", generateMD({
                    name: response.data.login,
                    favColor: answers.color,
                    imgURL: response.data.avatar_url,
                    repoLink: response.data.html_url,
                    location: response.data.location,
                    bio: response.data.bio,
                    repos: response.data.public_repos,
                    followers: response.data.followers,
                    following: response.data.following,
                }), function(err){
                    if(err) throw err;
                    console.log("MD generated!")
                })
            });
    })


function generateMD(data) {
    return `## <h1 style="color:${data.favColor}">${data.name}</h1>


# ![UserProfileImage](${data.imgURL})
    
    
    
Repo: <a href="${data.repoLink}">${data.name}'s GitHub Profile</a>.
    
        
    Location:  ${data.location}    
    
    
    Bio:  ${data.bio} 
    
    
    Public Repos:  ${data.repos} 
    
    
    Followers:  ${data.followers}  
    
    
    Following:  ${data.following} `
}