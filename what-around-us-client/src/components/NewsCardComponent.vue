<template>
    <div class="card">
        <div class="card-header">
            <a :href="newsLink" target="_blank">
                <img :src="newsImage" class="card-img-top" alt="">
            <h5 class="card-title">{{ newsTitle }}</h5></a>
        </div>

        <div class="card-body">
            <p class="card-text">{{ newsText}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsCardComponent",
        props: {
            newsLink: String,
            newsImage: String,
            newsTitle: String,
            newsText: String,
        },
    }
</script>

<style>
    .card {
        max-height: 55vh;
    }
    .card img {
        max-height: 21vh;
    }
    .card a{
        text-decoration: none;
        cursor: pointer;
    }

    .card-body {
        overflow: auto;
    }
</style>