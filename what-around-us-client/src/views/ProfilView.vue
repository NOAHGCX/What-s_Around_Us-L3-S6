<template>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ user.username }}</h5>
        <p class="card-text">{{ user.first_name }} {{ user.last_name }}</p>
        <p class="card-text">{{ user.adress }}</p>
        <ul>
          <li v-for="comment in cityComments" :key="comment.id">
            {{ comment.comment }} - {{ comment.grade }}
          </li>
        </ul>
        <p v-if="storeComments.length === 0">No data</p>
        <ul v-else>
          <li v-for="comment in storeComments" :key="comment.id">
            {{ comment }}
          </li>
        </ul>
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
                        'Authorization':  localStorage.getItem('token')
                    }
                }
                fetch('/api/profil', options)
                    .then((response) => {
                        console.log(response)
                        return response.json()
                    })
                    .then((data) => {
                       console.log(data)
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