<template>
    <div>
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
            <b-carousel-slide v-for="(news, index) in newsList" :key="index">
                <NewsCardComponent
                :newsLink="news.newsLink"
                :newsImage="news.newsImage"
                :newsTitle="news.newsTitle"
                :newsText="news.newsText"
                /> 
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    import NewsCardComponent from '@/components/NewsCardComponent.vue';

    export default {
    props: {
        newsList: {
        type: Array,
        default: () => []
        }
    },
    components: {
        NewsCardComponent
    },
    newsList: {
        type: Array,
        default: () => []
    },
    data() {
        return {
        slide: 0,
        sliding: null
        }
    },
    methods: {
    }
    }
</script>

<style scoped>
.card-carousel {
    max-width: 800px;
    margin: 0 auto;
}
</style>