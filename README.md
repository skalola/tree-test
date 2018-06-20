# [tree-test](https://tree-test.herokuapp.com)

## Overview
A live-updating tree view as a web application.
## Dependencies
* body-parser
* dotenv
* express
* mysql
* socket.io
## Front-End
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
## Back-End
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [Socket.IO](https://socket.io/)
## Production
* [Heroku](https://heroku.com/)
* [JawsDB](https://www.jawsdb.com)

### Command
`node server.js`

## Requirements
- [x] The tree should contain a group of nodes, with a main (root) node that can have any number of 'factories'.
- [x] These factory nodes can in turn generate a set amount of random numbers (up to 15), represented as child nodes of their respective factories.
- [x] Factories and children should be created through some means of user input (right click, button press, etc) specifying the number of children to generate (up to 15) and the ranges of those children.
- [x] Factories should have an adjustable name assigned to them, be removable, and have an adjustable lower and upper bound for the random number generation.
- [x] You may use any programming languages and front-end design styles of your choosing to create the project.
- [x] All users should see any changes made to the tree immediately across browsers without refreshing or polling.
- [x] The state of the tree should remain persistent; reloading should not undo any state.
- [x] All of a factory’s existing child nodes should be removed upon each new generation.
- [x] Your project should be secure, validate inputs, and protect against injections.
- [x] Your project should be hosted on the web using a service such as Amazon AWS or Heroku to run your submission.
- [x] The project should exhibit both a frontend and backend codebase built by you.
- [x] Use a database on your backend, not Firebase.