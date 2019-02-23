<template>
   <div>
    <header class="block-header">Товары по акции</header>
    <items-carousel :items="items"></items-carousel>
   </div>
</template>

<script>
  import ItemsCarousel from './ItemsCarousel'

  export default {
    components: {
      ItemsCarousel
    },
    data () {
      return {
        items: []
      }
    },
    created () {
      this.items = this.$store.getters.getItems
    }
  }
</script>

<style scoped>

  .block-header {
    font-family: Rotonda,sans-serif;
    font-size: 30px;
    line-height: 40px;
    color: #444;
    text-align: left;
    margin: 20px 0px 0px 0px;
    padding: 7px 20px 7px 50px;
    background-color: #f7f7f7;
  }

</style>
