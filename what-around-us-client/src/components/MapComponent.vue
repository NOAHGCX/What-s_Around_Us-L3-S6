<template>
    <label class="dropdown">
        <div class="dd-button">
            {{ chosenPlace }}
        </div>
        <input type="checkbox" class="dd-input" name="place-names">
        <ul class="dd-menu">
            <li v-for="(place,i) in PlaceResult" :key="i" @click="getPlace(place)">{{ place.name }}</li>
        </ul>
    </label>
    <div :id="mapId"></div>
</template>

<script>
    import L from 'leaflet';
    export default {
        // The component's name:
        name: 'MapComponent',
        props: {
            lgt: Number,
            ltt: Number
        },
        // The component's datamethod:
        data() {
            return {
                mapId: 'leaflet-map',
                chosenPlace: "Choose a Place",
                mapOptions: {
                    center: L.latLng(this.ltt,this.lgt),
                    zoom: 13,
                    zoomControl: true,
                    zoomAnimation: true,
                    layers: [],
                },
                geojsonData: null,
                mapInstance: null,
                layerControlInstance: null,
                PlaceResult: null,
            };
        },
        methods: {
            getPlace: function (place) {
                this.chosenPlace = place.name;
                this.mapInstance.panTo( [place.geocodes.main.latitude, place.geocodes.main.longitude]);
            },
            // Initialize map function:
            initMap() {
                // Create the leaflet map
                const leafletMap = L.map(this.mapId, this.mapOptions);
                // Create the tile layer and add it to the map:
                const tile = L.tileLayer(
                    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                ).addTo(leafletMap);
                // Create a marker with a custom icon and popup and add it to the map
                this.PlaceResult.forEach(place =>
                    L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {
                        icon: L.icon({
                            iconUrl: place.categories[0].icon.prefix + "bg_32" + place.categories[0].icon.suffix,
                            iconSize: [24, 24],
                            iconAnchor: [12, 12],
                            opacity: 1
                        })
                    }).bindPopup(place.name+"<br />"+place.location.formatted_address+"<br/> <a href=https://foursquare.com/v"+place.link.substr(3)+">Web site</a>").openPopup().addTo(leafletMap));
                // Create the layer control and add it to the map:
                this.layerControlInstance = L.control
                    .layers({
                        OpenStreetMap: tile,
                    })
                    .addTo(leafletMap);
                // Add an event listener to the map:
                leafletMap.on('zoomstart', () => {
                    console.log('ZOOM STARTED');
                });
                this.mapInstance = leafletMap;
            },
        },
        // Init the map and fetch the data:
        mounted() {
            const axios = require('axios').default;
            //  foursquare api
            const fetchPlaceData = async () => {
                var lgt = this.lgt;
                var ltt = this.ltt;
                var query = "";
                var type = "";

                const params = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: "fsq3PMGB3LBtRbutCglIfstDMGEB1vrb61fxd1yCJ7osAco="
                    },
                }
                if (query == "" && type == "") {

                    axios.get("https://api.foursquare.com/v3/places/search?ll=" +
                            ltt +
                            "%2C" +
                            lgt+
                            "&radius=10000&limit=50",
                            params).then(response => {
                            console.log("Foursquare API");
                            console.log(response.data.results);
                            this.PlaceResult = response.data.results;
                            this.initMap();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else if (query != "" && type == "") {
                    axios.get("https://api.foursquare.com/v3/places/search?ll=" +
                            lgt +
                            "%2C" +
                            ltt +
                            "&radius=10000&limit=50&query=" +
                            query,
                            params
                        ).then(response => {
                            console.log("Foursquare API");
                            console.log(response);
                            this.PlaceResult = response.data.results;
                            this.initMap();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else if (query == "" && type != "") {
                    axios.get(
                            "https://api.foursquare.com/v3/places/search?ll=" +
                            lgt +
                            "%2C" +
                            ltt +
                            "&radius=10000&limit=50&categories=" +
                            type,
                            params
                        ).then(response => {
                            console.log("Foursquare API");
                            console.log(response);
                            this.PlaceResult = response.data.results;
                            this.initMap();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            };
            //  fetch data
            fetchPlaceData();
        },
        // Destroy map if unmounted:
        unmounted() {
            if (this.mapInstance) {
                this.mapInstance.remove();
            }
        },
    };
</script>

<style scoped>
    @import 'leaflet/dist/leaflet.css';

    #leaflet-map {
        height: 60vh;
        margin: auto;
        overflow: hidden;
        z-index: 0;
    }

    /* Dropdown */

    .dropdown {
        display: inline-block;
        position: relative;
        z-index: 10;
    }

    .dd-button {
        display: inline-block;
        border: 1px solid gray;
        border-radius: 4px;
        padding: 10px 30px 10px 20px;
        background-color: #ffffff;
        cursor: pointer;
        white-space: nowrap;
    }

    .dd-button:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .dd-button:hover {
        background-color: #eeeeee;
    }


    .dd-input {
        display: none;
    }

    .dd-menu {
        position: absolute;
        top: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0;
        margin: 2px 0 0 0;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        list-style-type: none;
        max-height: 40vh;
        overflow: auto;
    }

    .dd-input+.dd-menu {
        display: none;
    }

    .dd-input:checked+.dd-menu {
        display: block;
    }

    .dd-menu li {
        padding: 10px 20px;
        cursor: pointer;
        white-space: nowrap;
    }

    .dd-menu li:hover {
        background-color: #f6f6f6;
    }

    .dd-menu li a {
        display: block;
        margin: -10px -20px;
        padding: 10px 20px;
    }

    .dd-menu li.divider {
        padding: 0;
        border-bottom: 1px solid #cccccc;
    }
</style>