# What-s_Around_Us-L3-S6

Noah ATTIA and Antonin HERVE are proud to present you the what's around us web site.
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

And finally you can start the server with :

npm start serve


How to use our web site:

    First if you want to use the fulll potential of it you can signUp or logedIN if it's already done.

    Now you have to use the auto compleate input (powered by google map api) to select a city you want to discover.
    After that you will be able to discover some news on the city (powered by NewsAPI).
    you canclick on it to be redirect to the officia news page.

    Under the news element they are the city map (powered by leaflet)
    where we display some different hot spot (powereb by Foursquare API)
    you can click on it to discover store info and select a store on the scroll down menue and the map will be centered on it

    Under the map element they are the comment section.
    It's where you can add a comment on the city if you are loged
    and discover ther comment made by other users

Now let's talk a bit about backend part:

    Firstly database is divided in 6 different tables:

        users who manage the users info
        sessions who manage the logIn token of a users
        city who store all city that has been research
        citycomments who store all comments about citys   
        store and storecomment have the same utility of the two precedent tables bu they are not yet implement on the web site

    Secondly :

        For each tables you can CRUD them.

    Thirdly :

        We crated different script like : auth.js cities.js and cityComments.js 
        They help us to creat secure connection between client and server.

