<template>
    <div class="container">
        <div class="row cards-box">
            <div class="col  align-middle">
                <slot name="left-side"></slot>
            </div>
            <div class="col  align-middle">
                <slot name="right-side"></slot>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style>
    template {
        background-color: gainsboro;
    }
</style>