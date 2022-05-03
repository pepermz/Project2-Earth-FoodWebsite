<!-- # Project2-Earth-Chowtown -->
## Project2-Earth-Chowtown
<h1 align="center">FoodWebsite</h1>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#Code Snippit">Code</a></li>
    <li><a href="#Stretch Goals">Stetch Goals</a></li>
  </ol>
</details>

![project2art](https://user-images.githubusercontent.com/101522627/166264987-b683c348-4e2e-4d16-ab4a-711c8fcc21be.jpg)


<!-- ABOUT THE PROJECT -->
## About The Project
Chow-Town is a user friendly application providing the best recipes, and user collaborations. 
Users have the opportunity to like, comment, and add their own recipes.  

#### PROTOTYPE
<img width="650" alt="Screen Shot 2022-04-26 at 11 13 02 AM" src="https://user-images.githubusercontent.com/101522627/165345489-9ddcc246-bd43-40e0-b525-e3445e2c55d2.png">

#### FINAL SHOW-PAGE
![Screen Shot 2022-05-03 at 8 45 23 AM](https://user-images.githubusercontent.com/101522627/166464700-44dc22a5-ae83-46ad-af35-47e86ba1d6b1.png)





  #### ERD
![Screen Shot 2022-04-27 at 3 47 14 PM](https://user-images.githubusercontent.com/101522627/166327592-4b3077f5-51d2-4517-a789-a52fc1b1c866.png)




### Built With

* [Bootstrap]
* [CSS]
* [JavaScript]
* [MongoDB]
* [Express]
* [Axios]
* [Heroku]


### Installation
* Heroku link: [https://secret-escarpment-10244.herokuapp.com/home](https://secret-escarpment-10244.herokuapp.com/home)
* Project Link: [https://github.com/pepermz/Project2-Earth-FoodWebsite.git](https://github.com/pepermz/Project2-Earth-FoodWebsite.git)

Below are instructions on installing and setting up our app. 
1. Install NPM packages
   ```
   npm install
   ```
   ```
   node server.js
   ```


<!-- LICENSE -->
### License
"license": "ISC",
<!-- CONTACT -->
### Contact
* Jose Ramirez - https://github.com/pepermz
* Ryan Hirsch - https://github.com/ryan-hirsch
* D'Arrian McClendon  - https://github.com/dmcclendon56






<!-- CODE -->
### Code
  ```
  //Code Snippets from RapidAPI
  axios.request(options).then(function (response)
  //grabbing display name and image
if (typeof recipe.display.displayName !== 'undefined'){
                //body = defined by post.js/schema
            const body = { name: recipe.display.displayName, description: recipe.display.displayName, image: recipe.display.images[0], source}
            db.Post.create(body);
            }
  ```
  ```
  <a href="/home/<%= onePost._id %>/edit">Edit <%= onePost.name %></a></br>
  ```
<!-- STRETCH GOALS -->
### Stretch Goals
* Add 'Like' system
