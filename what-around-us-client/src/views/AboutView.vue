<template>
  <div class="about">
    <header class="container-fluid p-4">
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
              <a class="nav-link active text-dark" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled text-dark">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container-fluid all">
      <h1>This is an about page</h1>
      <div class="media">
        <div class="media-body">
          <h5 class="mt-0">More news</h5>
          <CardCarousel :newsList="newsList" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import CardCarousel from '@/components/CardCarousel.vue';


  export default {
    name: 'AboutView',
    components: {
      CardCarousel
    },
    mounted() {
      const language = navigator.language;
      const languageCode = language.split('-');
      console.log(languageCode[0]);
      this.getCityNews(languageCode[0], "Paris");
    },
    methods: {
      getCityNews(language, city) {
        const axios = require('axios').default;

        axios.get("https://newsapi.org/v2/everything?apiKey=974f46c4dbf74801aa8dd40217ed3ab9&language="+language+"&q="+city)
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }
    },
    data() {
      return {
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