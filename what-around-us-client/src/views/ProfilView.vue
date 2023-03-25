<template>
  <div class="container-fluid connection pt-5">
    <div class="position-absolute end-0">
      <router-link to="/about">
        <button class="btn btn-warning">Home</button>
      </router-link>
    </div>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card cardUser">
          <div class="card-body">
            <h5 class="card-title">{{ user.username }}</h5>
            <div class="d-flex flex-row">
              <h6>First Name :</h6>
              <p class="card-text ms-3">{{ user.first_name }}</p>
            </div>
            <div class="d-flex flex-row">
              <h6>Last Name :</h6>
              <p class="card-text ms-3">{{ user.last_name }}</p>
            </div>
            <div class="d-flex flex-row">
              <h6>Adress :</h6>
              <p class="card-text ms-3">{{ user.adress }}</p>
            </div>
            <h6 v-if="cityComments.length === 1">No City Comment</h6>
            <div v-else>
              <h6>City Comment :</h6>
              <ul>
                <li v-for="comment in cityComments" :key="comment.id">
                  {{ comment.comment }} - {{ comment.grade }}
                </li>
              </ul>
            </div>
            <h6 v-if="storeComments.length === 1">No Store Comment</h6>
            <div v-else>
              <h6>Store Comment :</h6>
              <ul>
                <li v-for="comment in storeComments" :key="comment.id">
                  {{ comment.comment }} - {{ comment.grade }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username: "",
          first_name: "",
          last_name: "",
          adress: "",
        },
        cityComments: [],
        storeComments: [],
      };
    },
    beforeMount() {
      var component = this
      let options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      fetch('/api/profil', options)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          component.user = data.user
          component.cityComments = data.cityComments
          component.storeComments = data.storeComments
        })
        .catch((error) => {
          console.log(error)
          component.isLoggedIn = false
        })
    },
  };
</script>

<style>
  .cardUser {
    word-wrap: break-word;
  }

  .cardUser .card-body {
    height: 80vh;
  }

  @keyframes slide-up {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>