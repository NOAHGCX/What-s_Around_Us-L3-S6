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
          <h5 class="mt-0 mb-1">Media object</h5>
          <p>I know there will be sacrifice but that's the price. Are you brave enough to let me see your peacock? Be
            your teenage dream tonight. Uh-huh, I see you..</p>
        </div>
        <img src="../assets/img/New-York-about.jpg" class="ml-3" alt="...">
      </div>
      <div class="media">
        <img src="../assets/img/New-York-about.jpg" class="align-self-center mr-3" alt="...">
        <div class="media-body">
          <h5 class="mt-0">Center-aligned media</h5>
          <p>She'll turn cold as a freezer. At the eh-end of it all. Stinging like a bee I earned my stripes. Bikinis,
            zucchinis, Martinis, no weenies. I hope you got a healthy appetite. We can dance, until we die, you and I,
            will be young forever. We're living the life. We're doing it right. Word on the street, you got somethin' to
            show me, me.</p>
          <p class="mb-0">Wanna see the show in 3D, a movie. They say, be afraid you're not like the others, futuristic
            lover. Open up your heart. So I sat quietly, agreed politely. Last Friday night. Yeah, you're lucky if
            you're on her plane. I'll be your gift, give you something good to celebrate.</p>
        </div>
      </div>
    </div>
  </div>
</template>

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