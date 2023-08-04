<template>
    <div class="logoBox">
         <router-link to="/">
            <img src="../assets/logo.png" alt="">
         </router-link>
    </div>
</template>

<script>

export default{
    data() {
        return {

        };
    },
};
</script>


<style lang="scss" scoped>
    div {
        width: 150px;
        height: 70px;
        border-radius: 20px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>