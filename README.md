# startup
Have you ever wanted to run a server for each of the games you played? Or maybe you want to be able to swap what server is currently running without a hassle. You can with the Server handler! The Server Handler makes running servers easy by telling you exactly what you want to know. It includes images of your previous servers already set up as well as what servers are already running!
![alt text](./Example1.jpg)
Key features:

- Secure login over HTTPS
- Ability to select and run containers on hosts
- Display of usage history per host/container
- Server information displayed in realtime
- Ability for a user import a new server container
- Current images are persistently stored
- Ability for admin to quickly start and stop servers
![alt text](./Example2.jpg)



I learned from the simon assignment:
- never draw with html
- I give in when it comes to copy and paste strings of numbers :) but I did make sure I knew what it was doing and played around with it :) 
- I need to create more bash scripts for my personal projects
- There is a lot of variety in html

I learned from the second simon assignment
- bootstrap is almost like css in the html, meaning it makes the css shorter and easyer to use
- Drawing is a lot easier in css
- You can have position absolute but have it dynamic
- Most pages dont need a ton of css with bootstrap, only unique ones

Things I learned from the startup
- row collum is useful 
- select is fun but hard to format
- form is a good way to use selects
- Making a web page look nice is super hard
- I am glad that I started early... that would have taken forever!

I learned from the 3rd simon assignment
- there is not one way to code js
- adding the on click is interesting in the hmtl
- I need to learn async 
- I also need to figure out classes better

Changes made with js first deployment
- login functionality - does not need to be safe just implement some thing that works
- uploading file can just make a new image name - becuase that is what it will do, however it will also send the file to the server for storage. 
- All pages will display the home screen if user has not logged in. 
- starting an image will add it to the server and host page
- add functionality to the cpu and memory usage - add the ablility to update them perioticly 

Things I learned
- knowing sentax saves hours of work...
- local mem is interesting and useful 
- You can delete local mem with a function and it is easy localStorage.removeItem(keyname)
- I dont know how to make login and passwords actualy safe 

Service info
- npm init -y allows it to work with node.js
- node_modules can be ingored
- npm install express  will work
- need the correct version of nvm depending on the version of linux, on my personal computer the version is "nvm install 16.14.0"
- everything else seems fairly straight forward. 

Login info
- passwords are stored as a hash and then compaired
- They are then stored in a database 
- https://github.com/webprogramming260/.github/blob/main/profile/webServices/login/login.md use this to make it for my startup
- There is no way to delete a created account...
- Neither does my startup
- I would have the about page apear when you can log in because it tells people what they are getting into. 
- It would involve headder work and it was not simple to add similar functionality to my startup

Web socks
- I think I will use this to auto update the information gathered by the server
- I can rewatch the class from the announcement 
- It seems fairly straight forward
- cant log in with two different names but it will work just logged in with one
- Honestly I liked the labs more when we coded them ourselves
- but I guess I can just do it on my start up

End points for startup
- login and logout
- delete user?
- add image
- start image
- stop image
- delete image
- get all images
- get all servers
- get all servers on a host
- get cpu usage server
- get mem usage server
- get cpu usage host
- get mem usage host
Other startup
- [0] is valid json
- never even look up how to parse strings in bash
- input.split(/[ ,]+/); will split a string and ignore all whitespace and commas
- mongodb is nice but I am not sure how much I will use it in the future
- debuging useing the console 12 window is the best way to debug webpage issues
- node.js is nice to use, I had used it before a different way but now I now how to actually use it
- still not 100% sure if my passwords are secure but I hope they are 
- websockets provide faster update for information. I would have liked to start to use them rather than services. but alas I am good just using them on the host page

Simon React
- constensts are just div replacements
- first value is what goes in the html and second is the js partner
