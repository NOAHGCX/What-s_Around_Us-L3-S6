<template>
    <div :id="mapId"></div>
</template>

<script>
    import L from 'leaflet';
    export default {
        // The component's name:
        name: 'MapComponent',
        props: {
            lgt: Number,
            ltt: Number,
        },
        // The component's datamethod:
        data() {
            return {
                mapId: 'leaflet-map',
                mapOptions: {
                    center: L.latLng(this.lgt, this.ltt),
                    zoom: 11,
                    zoomControl: true,
                    zoomAnimation: true,
                    maxBounds: L.latLngBounds(
                        L.latLng(18.91619, -171.791110603),
                        L.latLng(71.3577635769, -66.96466)
                    ),
                    layers: [],
                },
                geojsonData: null,
                mapInstance: null,
                layerControlInstance: null,
            };
        },
        methods: {
            // Initialize map function:
            initMap() {
                console.log(this.lgt + " " + this.ltt)
                // Create the leaflet map
                const leafletMap = L.map(this.mapId, this.mapOptions);
                // Create the tile layer and add it to the map:
                const tile = L.tileLayer(
                    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                ).addTo(leafletMap);
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
            // Fetch the data
            async fetchData() {
                const url = 'https://api.npoint.io/fdbc5b08a7e7eccb6052';
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    this.geojsonData = data;
                } catch (err) {
                    console.log('err', err);
                }
            },
            // onEachFeature for the geoJSON layer
            onEachFeature(feature, layer) {
                if (layer) {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(feature.properties.name);
                        layer.on('mouseover', () => {
                            layer.openPopup();
                        });
                        layer.on('mouseout', () => {
                            layer.closePopup();
                        });
                    }
                } else {
                    console.log('Invalid layer:', feature);
                }
            },
        },
        // Init the map and fetch the data:
        mounted() {
            this.initMap();
            this.fetchData();
        }
    };
</script>

<style scoped>
    @import 'leaflet/dist/leaflet.css';

    #leaflet-map {
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }
</style>