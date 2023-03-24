const cities = require("./controllers/cities.controller.js");

// Create a new cities
exports.create = async (req, res) => {
    // Check if the city exist in the database
    let city = await cities.findByLongitudeLatitude(req, res);
    if (city[0] == "No data" ){
         newCity = await cities.create(req, res);
        
        res.status(200).send(JSON.stringify({ message: "City created", city: newCity }));
        return true;
    }
    else if (city) {
        res.status(200).send(JSON.stringify({ message: "City already exist", city: city[0] }));
        return true;
    }
    else{
        res.status(401).send(JSON.stringify({ error: "Error" }));
    }
};
