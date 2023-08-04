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
                <img :src="card.img" alt="">
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

  </v-container>

</template>

<script lang="ts">
  import gsap from 'gsap';

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
  }

  export default {

    data (): Imain
    {
      return {
        defLimit: 25,
        currentGifs: [],
        isRequestInProgress: false,
        inputValue: ''
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
        this.fillArrGifs( this.$myRequestControll.getGifs(limit, offset) );
      },

      searchGif (q: string, limit: number, offset: number): void
      {
        this.isRequestInProgress = true;
        this.fillArrGifs( this.$myRequestControll.searchGifs(q, limit, offset) );
      },

      fillArrGifs (promise: Promise<any>): void
      {
        promise.then( (result: any) => {
          result.json().then( (data: any) => {
            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i];
              const card: Icard = {
                img: '',
                id: '',
                position: window.innerHeight
              };
              card.img = item.images['fixed_height'].url;
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

    },

    mounted (): void
    {
      this.getGifsDefault(this.defLimit, this.currentGifs.length);

      window.onwheel = () => {

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
  }

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

</style>