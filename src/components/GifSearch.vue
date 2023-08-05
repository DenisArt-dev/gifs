<template>

  <v-container class="fill-height">

    <v-responsive class="text-center fill-height">

      <v-row class="d-flex align-center justify-space-between">

        <v-col cols="auto">
          <cmp-logo />
        </v-col>

        <v-col cols="8">
            <input @input="inputHandler" v-model="inputValue" class="searchInput" type="text" placeholder="search"/>
        </v-col>

      </v-row>

      <v-row class="d-flex align-center justify-center">

        <div class="gifBox">
            <div v-if="currentGifs.length >= 1" :style="{top: card.position + 'px'}" v-for:="card in currentGifs" class="gifCard">
              <router-link :to="'/card/' + card.id">
                <img :style="{width: innerWidth && innerWidth < 650 ? (innerWidth - 50) + 'px' : 'auto'}" :src="card.img" alt="">
              </router-link>
            </div>
            <div class="nothing" v-if="(currentGifs.length === 0 && !isRequestInProgress)">
              <img src="https://i.giphy.com/media/rW7sjLjS5tZklQfQFg/giphy.webp" alt="">
            </div>
        </div>

        <div class="boxLoader" v-if="isRequestInProgress">
          <cmp-loader size="64"/>
        </div>

      </v-row>
      
    </v-responsive>

    <div class="goUp" @click="goUpHandler">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M0 16c0 8.837 7.163 16 16 16s16-7.163 16-16-7.163-16-16-16-16 7.163-16 16zM29 16c0 7.18-5.82 13-13 13s-13-5.82-13-13 5.82-13 13-13 13 5.82 13 13z"></path>
        <path d="M22.086 20.914l2.829-2.829-8.914-8.914-8.914 8.914 2.828 2.828 6.086-6.086z"></path>
      </svg>
    </div>

  </v-container>

</template>

<script lang="ts">
  import gsap from 'gsap';
  import MyRequestControll from '@/classes/MyRequestControll';

 interface Icard {
    img: string
    id: string
    position: number
  };

  interface Imain {
    defLimit: number
    currentGifs: Icard[],
    isRequestInProgress: boolean
    inputValue: string
    innerWidth: number | null
  }

  export default {

    data (): Imain
    {
      return {
        defLimit: 25,
        currentGifs: [],
        isRequestInProgress: false,
        inputValue: '',
        innerWidth: null
      }
    },

    methods: {

      inputHandler (): void
      {
        this.currentGifs = [];
        if (this.inputValue === '') this.getGifsDefault(this.defLimit, 0);
        else this.searchGif(this.inputValue, this.defLimit, 0);
      },

      getGifsDefault (limit: number, offset: number): void
      {
        this.isRequestInProgress = true;
        this.fillArrGifs( MyRequestControll.getGifs(limit, offset) );
      },

      searchGif (q: string, limit: number, offset: number): void
      {
        this.isRequestInProgress = true;
        this.fillArrGifs( MyRequestControll.searchGifs(q, limit, offset) );
      },

      fillArrGifs (promise: Promise<any>): void
      {
        promise.then( (result: any) => {
          result.json().then( (data: any) => {

            let size = window.innerWidth < 650 ? 'fixed_width' : 'fixed_height';

            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i];
              const card: Icard = {
                img: '',
                id: '',
                position: window.innerHeight
              };
              card.img = item.images[size].url;
              card.id = item.id;
              this.currentGifs.push(card);
            }
            this.isRequestInProgress = false;
            this.setAnimation();
          } );
        } );
      },

      setAnimation (): void
      {
        let a = 1;

        for(let i = 0; i < this.currentGifs.length; i++) {
          if (this.currentGifs[i].position != 0) {
            setTimeout( () => {
              gsap.to(this.currentGifs[i], {
                position: 0,
                duration: 0.5,
              });
            }, 100 * a );
            a++;
          }
        }
      },

      goUpHandler (): void
      {
        gsap.to(document.documentElement, {
          scrollTop: 0,
          duration: 1,
        });
      },

      addGifs (): void
      {
        let scroll = window.scrollY + window.innerHeight * 1.8 > document.documentElement.scrollHeight;

        let isAnimationEnd = (
          this.currentGifs &&
          this.currentGifs.length > 0 &&
          this.currentGifs[this.currentGifs.length - 1].position === 0
        );

        if (scroll && !this.isRequestInProgress && isAnimationEnd) {
          
          if (this.inputValue === '') {
            this.getGifsDefault(this.defLimit, this.currentGifs.length);
          } else {
            this.searchGif(this.inputValue, this.defLimit, this.currentGifs.length);
          }

        }
      }

    },

    mounted (): void
    {
      this.innerWidth = window.innerWidth;
      this.getGifsDefault(this.defLimit, this.currentGifs.length);
      window.onwheel = this.addGifs;
      window.onpointerdown = this.addGifs;
    }

  };
</script>

<style lang="scss" scoped>

  .searchInput {
    outline: none;
    border: solid 1px #000;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    padding: 15px 20px;
  }

  .logo {
    border: solid 1px #000;
    padding: 10px;
  }

  .gifBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    // width: 400px;

    // img {
    //   width: 300px;
    // }

    .gifCard {
      background-color: rgb(255, 255, 255);
      border-radius: 30px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
      position: relative;

      img {
        border-radius: 30px;
      }

    }

  }



  .nothing {

    border-radius: 50px;
    overflow: hidden;

    img {
      widows: 100%;
      height: 100%;
    }

  }

  .boxLoader {
    margin: 10px;
  }

  .goUp {
    position: fixed;
    width: 70px;
    height: 70px;
    background-color: rgba(237, 82, 4, 0.703);
    right: 30px;
    bottom: 30px;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    
    svg {
      fill: #fff;
    }

    &:hover {
      background-color: rgba(255, 118, 50, 0.703);
    }

  }

</style>