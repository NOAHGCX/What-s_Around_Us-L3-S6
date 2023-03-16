<template>
    <div class="card" @click="router.go({newsLink})">
        <div class="card-header">
            <img :src="require('@/assets/'+ newsImage)" class="card-img-top" alt="Card image cap">
            <h5 class="card-title">{{ newsTitle }}</h5>
        </div>

        <div class="card-body">
            <p class="card-text">{{ newsText }}</p>
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
        width: 13rem;
        cursor: pointer;
    }

</style>