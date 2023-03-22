<template>
  <div class="about">
    <header class="container-fluid p-4">
      <div class="position-absolute end-0">
        <router-link to="/connection">
          <button class="btn btn-warning">Login</button></router-link>
      </div>
      <div class="flex-column row">
        <div class="container col-5 logo">
          <div class="col p-3">
            <img class="img-fluid" src="../assets/logo.png" alt="LOGO">
          </div>
        </div>
        <div class="col-8 align-self-center m-3">
          <h1>What's Around Us</h1>
        </div>
        <div class="col-5 align-self-center m-3">
          <div class="input-group mb-3">
            <input type="text" class="form-control rounded-pill" placeholder="Other City ?"
              aria-label="Recipient's username" aria-describedby="basic-addon2">
          </div>
        </div>
        <div class="col">
          <ul class="nav justify-content-around">
            <li class="nav-item">
              <a class="nav-link text-dark" href="#News">News</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Map</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Comment</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container-fluid News" id="News">
      <h1>{{ city }}'s News</h1>
      <div class="container">
        <vueper-slides class="no-shadow" :bullets="false" slide-multiple fixed-height="58vh" :visible-slides="3"
          :gap="3" :dragging-distance="20"
          :breakpoints="{ 1000: { visibleSlides: 2, slideMultiple: 2 }, 770: { visibleSlides: 1, slideMultiple: 1 } }">
          <vueper-slide v-for="(slide, i) in NewsResult" :key="i">
            <template #content>
              <NewsCardComponent :newsLink="slide.url" :newsImage="slide.urlToImage" :newsTitle="slide.title"
                :newsText="slide.description" />
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </div>
    <div class="container-fluid Map">
      <h1>Map</h1>
      <label class="dropdown">
        <div class="dd-button">
          {{ chosenPlace }}
        </div>
        <input type="checkbox" class="dd-input" name="place-names">
        <ul class="dd-menu">
          <li v-for="(place,i) in PlaceResult" :key="i" @click="getPlace(place)">{{ place.name }}</li>
        </ul>
      </label>
    </div>
  </div>
</template>

<script>
  import NewsCardComponent from '@/components/NewsCardComponent.vue';

  import {
    VueperSlides,
    VueperSlide
  } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'


  export default {
    name: 'AboutView',
    components: {
      NewsCardComponent,
      VueperSlides,
      VueperSlide
    },
    methods: {
      getPlace: function (place) {
        console.log("the chosen place is :")
        console.log(place)
        this.chosenPlace = place.name;
      }
    },
    mounted() {
      //  news api 
      const axios = require('axios').default;
      const fetchNewsData = async () => {
        const languageNav = navigator.language;
        const languageCode = languageNav.split('-');
        const language = languageCode[0];
        axios.get("https://newsapi.org/v2/everything?apiKey=974f46c4dbf74801aa8dd40217ed3ab9&language=" + language +
            "&q=" + this.city).then(response => {
            console.log("News API");
            console.log(response.data.articles);
            this.NewsResult = response.data.articles;
          })
          .catch(error => {
            console.log(error);
          });
      }
      //  foursquare api key fsq3PMGB3LBtRbutCglIfstDMGEB1vrb61fxd1yCJ7osAco=
      const fetchPlaceData = async () => {
        var lgt = 45.50884;
        var ltt = -73.58781;
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
              lgt +
              "%2C" +
              ltt +
              "&radius=10000&limit=50",
              params).then(response => {
              console.log("Foursquare API");
              console.log(response.data.results);
              this.PlaceResult = response.data.results;
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
            })
            .catch(error => {
              console.log(error);
            });
        }
      }

      //  fetch data
      const fetchData = async () => {
        await fetchNewsData();
        await fetchPlaceData();
      }
      fetchData();
    },
    data() {
      return {
        NewsResult: [],
        city: "Montréal",
        PlaceResult: [],
        chosenPlace: "Choose a Place",
      }
    }
  }
</script>

<style>
  .about .News {
    background-color: rgb(67, 68, 69);
  }

  .about .News h1 {
    text-align: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
    color: white;
  }

  .about .Map {
    background-color: white;
    height: 50vh;
  }

  header {
    background-color: rgb(243, 193, 27);
    text-align: center;
  }

  .logo {
    background-color: beige;
  }

  /* Dropdown */

  .dropdown {
    display: inline-block;
    position: relative;
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