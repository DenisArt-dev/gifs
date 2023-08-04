<template>

    <v-container class="fill-height">

        <v-responsive class="text-center fill-height">

            <v-row class="d-flex align-center justify-center">

                <v-col class="myCol" cols="auto">
                    <h2 class="title">{{title}}</h2>
                </v-col>

            </v-row>

            <v-row class="d-flex justify-center align-center">

                <v-col class="gifBox" cols="8">
                    <video :style="{display: isLoadImg ? '' : 'none'}" :src="img"
                           autoplay loop @canplaythrough="loadImgHandler"/>
                    <cmp-loader v-if="!isLoadImg" size='45'/>
                </v-col>

                <v-col class="text-left" cols="auto">
                    <div class="gifData">
                        <p>AUTHOR: <span>{{author.name}}</span></p>
                    </div>
                    <router-link v-if="(author.name && author.name !== 'No author')" :to="'/author/' + id"><cmp-button text='more'/></router-link>
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
            title: '',
            img: '',
            author: {
                name: 'No author',
            },
            isLoadImg: false
        }
    },

    methods: {
        getGifFromId (): void
        {
            this.$myRequestControll.getGifsId(this.id).then( (result: any) => {
                result.json().then( (data: any) => {
                    this.title = data.data.title;
                    this.img = data.data.images.looping.mp4;
                     if (data.data.user && data.data.user.display_name !== '' && data.data.user.display_name) {
                        this.author.name = data.data.user.display_name;
                    }
                } );
            } );
        },

        loadImgHandler (): void
        {
            this.isLoadImg = true;
        }
    },

    mounted (): void 
    {
        this.getGifFromId();
    },

};
</script>

<style lang="scss" scoped>
    .title {
        font-weight: 300;
        padding: 10px;
        font-size: 36px;
    }

    .gifBox {

    }

    .gifBox video {
        box-shadow: 1px 2px 10px #000000;
    }

    .gifData {
        text-align: left;
        font-size: 18px;

        span {
            font-weight: 800;
        }
    }

</style>
