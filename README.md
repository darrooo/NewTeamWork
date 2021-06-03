


## This is a project made for the Independent Project in Sociotechnical Systems Engineering, 15c written by:
## Agnes Olofsson
## Hanne Gezelius
## Daniella Rosendahl
## The purpose is to create a simple and understandable communication media for a work environment.


## The different files and their purpose:
```
DataHandler.js: The dataHandler is used for storing information gathered from the database
The function data stores the current user, all users and events in the database.
It also does the authorisation of the logged in user.

App.js: The file app.js creates the localhost and all subpages to the localhost. It also connects to the database and imports and exports all changes made to events and users.
it loads the users and events to the dataHandler to save for future use and it contains a collection of sockets to send and receive information from the other pages.

Settings.html: Settings gives the user a possibility to change access and add colleagues to the application.

myProfile.html:  My profile gives the user a possibility to change features in their profile such as the avatar, name and password.

index.html: index is the first page you visit with the login fields when you open the page.

homepage.html: homepage is the first view you get when you have logged into the webpage. It displays all colleagues and your schedule. - connected files: script.js & homepagestyle.css

contact.html: you can reach the contact page from the index page, this is where the contact information to the developers should be.

chat.html: the chat is for communication between the different colleagues.

calendar.html: the code for the month calendar that we created but ended up not using for this webpage - connected files: calendar.js & calendarstyle.css

about.html: you can reach the about page from the index page, this is where the information about the website is written

vue_script.js: The Vue script is used to get information added into the login field and send logout and login.

overall styling: style.css
```


## packets to install :
```
npm install express@4
npm install mongodb

npm install express --save
npm install body-parser --save
npm install mongoose --save
npm install socket.io
```
