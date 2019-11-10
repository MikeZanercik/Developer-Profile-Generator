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
                fs.writeFile("myPage.html", generateHTML({
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
                    console.log("HTML generated!")
                })
            });
    })


function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>
    
        <div class="container">
            <h2 style="color:${data.favColor}"> ${data.name} </h2>
    
            <hr>
    
            <img src="${data.imgURL}" alt="profile image" />
    
            <a href="${data.repoLink}">
            <p>Repo: ${data.repoLink} </p>
            </a> 
            <p>Location:  ${data.location}  </p>  
            <p>Bio:  ${data.bio}  </p>  
            <p>Public Repos:  ${data.repos}  </p>  
            <p>Followers:  ${data.followers}  </p>  
            <p>Following:  ${data.following}  </p>  


            
        </div>
    
    </body>
    
    </html>`
}