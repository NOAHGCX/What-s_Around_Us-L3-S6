<template>
  <div class="about">
    <header class="container-fluid p-4">
      <div class="position-absolute end-0">
        <router-link to="/connection">
          <button class="btn btn-warning">LogIn/Out</button>
        </router-link>
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
            <vue-google-autocomplete ref="address" id="map" classname="form-control rounded-pill"
              placeholder="Please type your City" v-on:placechanged="getAddressData" types="(cities)" fields="['address_components']">
            </vue-google-autocomplete>
          </div>
        </div>
        <div class="col">
          <ul class="nav justify-content-around">
            <li class="nav-item">
              <router-link to="#News" class="nav-link text-dark">
                News
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="#Map" class="nav-link text-dark">
                Map
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="#Comment" class="nav-link text-dark">
                Comment
              </router-link>
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
      <h1 id="Map">Map</h1>
      <MapComponent :lgt="this.lgt" :ltt="this.ltt" />
    </div>
    <div class="container-fluid Comment" id="Comment">
      <CommentComponent />
    </div>
  </div>
</template>

<script>
  import NewsCardComponent from '@/components/NewsCardComponent.vue';
  import MapComponent from '@/components/MapComponent.vue';
  import CommentComponent from '@/components/CommentComponent.vue';
  import VueGoogleAutocomplete from "vue-google-autocomplete";

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
      VueperSlide,
      MapComponent,
      CommentComponent,
      VueGoogleAutocomplete
    },
    methods: {
      checkCity() {
        let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            name: this.city,
            country: this.country,
            grade: 5,
            latitude: this.ltt,
            longitude: this.lgt
          })
        }
        fetch('/api/cities/createCity', options)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            localStorage.setItem('cityId', data.city.id);
            window.location.href="/#/about/?id="+data.city.id;
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
      },
      /**
       * When the location found
       * @param {Object} address_componentsData Address components
       */
      getAddressData: function (address_componentsData) {
        this.city = address_componentsData.locality;
        this.ltt = address_componentsData.latitude;
        this.lgt = address_componentsData.longitude;
        this.country = address_componentsData.country;

        localStorage.setItem('city', address_componentsData.locality);
        localStorage.setItem('ltt', address_componentsData.latitude);
        localStorage.setItem('lgt', address_componentsData.longitude);
        localStorage.setItem('country', address_componentsData.country);
        this.checkCity();
      },
    },
    async mounted() {
      this.$refs.address.focus();

      //  news api 6724ae4d57d24ef6b47776ef69e07a13 974f46c4dbf74801aa8dd40217ed3ab9
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
      //  fetch data
      const fetchData = async () => {
        await fetchNewsData();
      }
      fetchData();
    },
    data() {
      return {
        NewsResult: [],
        city: localStorage.getItem('city') || "Montreal",
        ltt: Number(localStorage.getItem('ltt')) || 45.50884,
        lgt: Number(localStorage.getItem('lgt')) || -73.58781, 
        country: localStorage.getItem('country') || "Canada",
        token: localStorage.getItem('token'),
        address: '',
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
    margin-bottom: 5vh;
  }

  header {
    background-color: rgb(243, 193, 27);
    text-align: center;
  }

  .logo {
    background-color: beige;
  }
</style>