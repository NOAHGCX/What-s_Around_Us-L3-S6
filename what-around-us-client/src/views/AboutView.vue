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
    <div class="container-fluid all" id="News">
      <h1>{{ city }}'s News</h1>
      <div class="container">
        <vueper-slides class="no-shadow" :bullets="false" slide-multiple fixed-height="58vh" :visible-slides="3" :gap="3"
         :dragging-distance="20" :breakpoints="{ 1000: { visibleSlides: 2, slideMultiple: 2 }, 770: { visibleSlides: 1, slideMultiple: 1 } }">
          <vueper-slide v-for="(slide, i) in NewsResult" :key="i">
            <template #content>
              <NewsCardComponent :newsLink="slide.url" :newsImage="slide.urlToImage" :newsTitle="slide.title"
                :newsText="slide.description" />
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
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
    methods: {},
    mounted() {
      const languageNav = navigator.language;
      const languageCode = languageNav.split('-');
      const language = languageCode[0];
      const axios = require('axios').default;
      axios.get("https://newsapi.org/v2/everything?apiKey=974f46c4dbf74801aa8dd40217ed3ab9&language=" + language +
          "&q=" + this.city).then(response => {
          console.log(response.data.articles);
          this.NewsResult = response.data.articles;
        })
        .catch(error => {
          console.log(error);
        });
    },
    data() {
      return {
        NewsResult: [],
        city: "Paris",
        newsList: [{
            "id": 1,
            "newsTitle": "News 1",
            "newsImage": "logo.png",
            "newsLink": "google.com",
            "newsText": "text news 1"
          },
          {
            "id": 2,
            "newsTitle": "News 2",
            "newsImage": "logo.png",
            "newsLink": "google.com",
            "newsText": "text news 2"
          },
          {
            "id": 3,
            "newsTitle": "News 3",
            "newsImage": "logo.png",
            "newsLink": "google.com",
            "newsText": "text news 3"
          }
        ]
      }
    }
  }
</script>

<style>
  .about .all {
    background-color: grey;
  }

  header {
    background-color: rgb(243, 193, 27);
    text-align: center;
  }

  .logo {
    background-color: beige;
  }
</style>