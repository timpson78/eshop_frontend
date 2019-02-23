<template>
  <v-container class="mt-2 pa-0" fluid>
    <v-layout row>
      <v-carousel class="carousel">
        <v-carousel-item
          v-for="( banner,i) in banners"
          :key="i"
          :src="banner.src"
        >
          <div class="carusel-link">
            <a   :href="banner.src" class="a_link">{{banner.name}}</a>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="mt-1">
        <promotional-items-carousel></promotional-items-carousel>
      </v-flex>
    </v-layout>
  </v-container>
    
</template>

<script>
  import promotionalItemsCarousel from './shared/PromotionalItemsCarousel'

    export default {
      components: {
        promotionalItemsCarousel
      },
       data () {
         return {
           banners: [
             {
               name: 'познай вкус весны  с невроятной пице от нас' ,
               src: 'https://largebannerprinting.com/wp-content/uploads/2017/06/RB18-um-demo.png'
             },

             {
               name: 'Попробуй ты обалдеешь!',
               src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgecyNehAWCSJP5R5UqJ64eTiUGRkbeCcQuh2PhZoR161OQYT0g'
             },
             {
               name: 'Не нужно тебе значть ничего кроме...',
               src: 'https://vinylbannersprinting.co.uk/wp-content/uploads/2016/05/RB26-um-demo.jpg'
             }]

         }
       }
    }
</script>

<style scoped>

  .carusel-link {
    position: absolute;
    color: aliceblue;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 0px 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .carousel {
    height: 160px;
  }
  .a_link{
    color: white;
    text-decoration: none;
  }


</style>
