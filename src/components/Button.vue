<template>
    <button>{{text.toUpperCase()}}</button>
</template>

<script lang="ts">
    export default {
        props: ['text']
    }
</script>


<style lang="scss" scoped>
    button {
        background-color: rgb(255, 174, 24);
        color: #000;
        text-align: center;
        padding: 10px 30px;
        border-radius: 20px;
        transition: 0.5s;

        &:hover {
            background-color: rgb(235, 140, 7);
        }
    }
</style>