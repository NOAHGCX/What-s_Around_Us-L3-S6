<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="d-flex col-sm-5 align-self-center">
          <input type="text" class="form-control me-5" id="formGroupExampleInput" placeholder="Example input placeholder">
          <router-link to="/about"><button class="btn btn-dark">search</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HomeView',
    components: {
      
    }
  }
</script>

<style scoped>
  .home {
    background-image: url("../assets/img/New-York-City.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .home .container-fluid {
    backdrop-filter: blur(5px);
    height: 100vh;
  }
  .home .row {
    height: 100%;
  }
</style>