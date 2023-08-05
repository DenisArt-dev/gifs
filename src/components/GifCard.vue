<template>

    <v-container class="fill-height">

        <v-responsive class="text-center fill-height">

            <v-row class="d-flex align-center">

                <v-col class="myCol" cols="auto">
                    <cmp-logo/>
                </v-col>

            </v-row>

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

            <v-row v-if="dataForCarousel.length > 0 && isLoadImg" class="d-flex justify-center align-center">

                <v-col cols="auto">
                    <h3 class="carousel_title">SEE ALSO:</h3>
                    <v-carousel hide-delimiters>
                        <v-carousel-item
                            v-for="(item, i) in dataForCarousel"
                            :key="i"
                            :value="i"
                        >
                            <v-sheet height="100%">
                                <div class="d-flex fill-height justify-center align-center">
                                    <div class="carouselItem">
                                        <router-link :to="'/card/' + item.id">
                                            <img :src="item.img" alt="">
                                        </router-link>
                                    </div>
                                </div>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
                
            </v-row>
      
        </v-responsive>

    </v-container>

</template>

<script lang="ts">

import MyRequestControll from '@/classes/MyRequestControll';

interface Imain {
    title: string
    img: string
    author: {
        name: string
    },
    isLoadImg: boolean
    catousel: any
    limit: number
    dataForCarousel: Icard[]
};

interface Icard {
    img: string
    id: string
};

export default {
    props: ['id'],

    data(): Imain
    {
        return {
            title: '',
            img: '',
            author: {
                name: 'No author',
            },
            isLoadImg: false,
            catousel: null,
            limit: 50,
            dataForCarousel: [],
        }
    },

    methods: {

        getRandomMinMax(min: number, max: number, afterPoint = 0) {
            return +(min + Math.random() * (max - min)).toFixed(afterPoint);
        }, 

        getGifFromId (): void
        {
            MyRequestControll.getGifsId(this.id).then( (result: any) => {
                result.json().then( (data: any) => {
                    this.title = data.data.title;
                    this.img = data.data.images.looping.mp4;
                     if (data.data.user && data.data.user.display_name !== '' && data.data.user.display_name) {
                        this.author.name = data.data.user.display_name;
                    }
                } );
            } );
        },

        getGifsForCarousel (): void
        {
            MyRequestControll.getGifs(this.limit, this.getRandomMinMax(0, 1000)).then( (result: any) => {
                result.json().then( (data: any) => {
                    for(let i = 0; i < data.data.length; i++) {
                        this.dataForCarousel.push({
                            img: data.data[i].images['fixed_height'].url,
                            id: data.data[i].id
                        });
                    }
                } );
            } )
        },

        loadImgHandler (): void
        {
            this.isLoadImg = true;
        },
    },

    mounted (): void 
    {
        this.getGifFromId();
        this.getGifsForCarousel();
    },

    updated () {
        this.getGifFromId();
    }

};
</script>

<style lang="scss" scoped>
    .title {
        font-weight: 300;
        padding: 10px;
        font-size: 36px;
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

    .carouselItem {
        height: 100%;
        img {
            height: 100%;
        }
    }

    .carousel_title {
        font-weight: 300;
        font-size: 24px;
    }

    @media (max-width: 800px) {
        .gifBox video {
            box-shadow: 1px 2px 10px #000000;
            width: 100%;
        }
    }

</style>
