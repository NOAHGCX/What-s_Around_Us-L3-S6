<template>
    <div>
        <input type="text" id="autocomplete" v-model="search" placeholder="Search" />
    </div>
</template>

<script>

    export default {
        name: "autoComplete",
        mounted() {
            var autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            );
}
    }
</script>
