<template>
    <v-container class="fill-height">
        <v-responsive class="text-center fill-height">

            <v-row class="d-flex align-center">
                <v-col cols="auto">
                    <cmp-logo />
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col cols="auto">
                    <div class="img">
                        <img :src="img"/>
                    </div>
                </v-col>
                <v-col cols="auto">
                    <div class="data">
                        <h3><span>{{name}}</span></h3>
                        <a :href="url"><cmp-button text='OPEN IN GIPHY'/></a>
                    </div>
                </v-col>
            </v-row>
      
        </v-responsive>
  </v-container>
</template>

<script lang="ts">

export default {

    props: ['id'],

    data() {
        return {
            name: '',
            img: '',
            url: ''
        }
    },

    methods: {
        getGifFromId (): void
        {
            this.$myRequestControll.getGifsId(this.id).then( (result: any) => {
                result.json().then( (data: any) => {
                    this.name = data.data.user.display_name;
                    this.img = data.data.user.avatar_url;
                    this.url = data.data.user.profile_url;
                } );
            } );
        }
    },

    mounted (): void 
    {
        this.getGifFromId();
    }
};

</script>

<style lang="scss" scoped>
    .img {
        margin: 10px;
        width: 200px;
        height: 200px;
        box-shadow: 1px 2px 10px #000000;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .data {
        margin-top: 20px;
        text-align: left;

        h3 {
            font-weight: 300;
            font-size: 24px;
        }

        a {
            text-decoration: none;
        }
    }

</style>
