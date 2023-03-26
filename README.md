# What-s_Around_Us-L3-S6

Noah ATTIA and Antonin HERVE are proud to present you the what's around us web site.

<h1>Set up the project</h1>

Fisrt, to to start it please :

    git clone https://github.com/NOAHGCX/What-s_Around_Us-L3-S6.git

Then we can start the client part :

    cd .\what-around-us-client\
    npm install
    npm run serve

Start the server part:

    cd .\server\
    npm install

You have to configure the db.config.js to fit with your mySQLWorkbench config.

You can create the database by using the file named DataBase

And finally you can start the server with :

    npm start serve


<h1>How to use our web site:</h1>

<h2>The front end part:</h2>

First if you want to use the fulll potential of it you can signUp or logedIn if it's already done.</br>

Now you have to use the auto compleate input (powered by google map api) to select a city you want to discover.</br>
After that you will be able to discover some news on the city (powered by NewsAPI) 
you can click on it to be redirect to the officia news page.</br>

Under the news element they are the city map (powered by leaflet)</br>
where we display some different hot spot (powereb by Foursquare API) 
you can click on it to discover store info and select a store on the scroll down menue and the map will be centered on it.</br>

Under the map element they are the comment section.</br>
It's where you can add a comment on the city if you are loged
and discover the comment made by other users</br>

<h2>Now let's talk a bit about backend part:</h2>

<h4>Firstly database is divided in 6 different tables :</h4>

Users who manage the users info </br>
Sessions who manage the logIn token of a users </br>
City who store all city that has been research </br>
Citycomments who store all comments about citys   </br>
Store and storecomment have the same utility of the two precedent tables bu they are not yet implement on the web site

<h4>Secondly :</h4>

For each tables you can CRUD them.

<h4>Thirdly :</h4>

We crated different script like : auth.js cities.js and cityComments.js 
They help us to creat secure connection between client and server.

