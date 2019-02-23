<template >
  <v-carousel hide-delimiters hide-controls class="v-carousel_settings">
  <div class="card-carousel-wrapper">
    <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
          <div
               class="card-carousel--card"
               v-for="item in items">
            <div class="image_div_settings">
                <img
                  class="image_style_settings"
                  :src="item.imageSrc"
                  />
            </div>
            <div class="card-carousel_title">
              <a  :href="'/item/'+item.id" class="a_link_menu ">{{item.title}}</a>
            </div>
            <div v-if="item.discount" class="div_discount_card">
              <span  class="strikethrough">{{ item.price  }}</span>
              <span class="saleoff">- {{item.discount}}%</span>
            </div>
            <div v-else> &nbsp;
            </div>
            <div class="div_discount_card_price">
              <span class="pricetitle">{{item.discount ? computedDiscount(item.price, item.discount) : item.price }}</span>
              <span class="pricerouble">р</span>
              <span class="priceunit">/{{item.mesure}}</span>
            </div>
            <div
              v-if="!isItemInCart(item.id)"
              style="text-align: center">
              <v-btn
                @click="addCart_(item)"
                class="add-to-cart-btn" flat>
                <span style="text-transform: none; margin-right: 20px"> В корзину </span>
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </div>
            <div
              style="text-align: center"
              v-else>
              <v-btn
                @click=""
                class="added-already-cart" flat>
                <span> В корзине </span>
                <v-icon>done</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
  </v-carousel>

</template>

<script>
    export default {
      props: ['items'],
      data() {
        return {
          currentOffset: 0,
          windowSize: 4,
          paginationFactor: 260
        }
      },
      computed: {
        atEndOfList() {
          return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
        },
        atHeadOfList() {
          return this.currentOffset === 0;
        },
      },
      methods: {
        moveCarousel(direction) {
          // Find a more elegant way to express the :style. consider using props to make it truly generic
          if (direction === 1 && !this.atEndOfList) {
            this.currentOffset -= this.paginationFactor;
          } else if (direction === -1 && !this.atHeadOfList) {
            this.currentOffset += this.paginationFactor;
          }
        },
        computedDiscount(value, discount) {
          value = Number(value.replace(',', '.'))
          discount = Number(discount.replace(',', '.'))
          const retValue = value - value * discount / 100
          return retValue.toFixed(2)
        },
        isItemInCart(id) {
          return this.$store.getters.isItemInCart(id)
        },
        addCart_(item) {
          const quantity = 1
          this.$store.commit('addCart', {
            item: item, quantity: quantity
          })
        }
      }
    }
</script>

<style scoped>


  .add-to-cart-btn {
    background-color: #7ac143;
    color: white;
    font-size: 16px;
    font-family: Rotonda,sans-serif;
    font-weight: 900;
    height: 40px;
    width: 200px;
    text-align: center;
    margin: 10px 10px 20px 10px;
    border: 1px solid #7ac143;
  }
  .add-to-cart-btn:hover {
    background-color: #008b44;
    border: 1px solid #008b44;
  }

  .added-already-cart{
    font-family: Rotonda,sans-serif;
    text-transform: none;
    background-color: white;
    color: black;
    height: 40px;
    width: 200px;
    font-size: 16px;
    border: 1px solid #7ac143;
    font-weight: 900;
    text-align: center;
    margin: 10px 0px 0px 0px;
  }

  .div_discount_card {
    margin-left: 30px;
    margin-right: 10px;
  }
  .div_discount_card_price{
    margin-left: 30px;
  }
  .image_style_settings {
    max-width: 220px;
    margin: auto;
  }

  .image_div_settings {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    height: 220px;
    width:  220px;
    display: flex;

  }
  .priceunit {
    font-family: Rotonda,sans-serif;
    color: #b2b2b2;
    font-size: 14px;
    font-weight: 1000;
  }

  .pricetitle{
    font-family: Rotonda,sans-serif;
    color: #000;
    font-size: 26px;
    font-weight: 700;
    margin-right: 15px;
    margin-bottom: 3px;

  }

  .saleoff {
    font-family: Rotonda,sans-serif;
    color: red;
    display: inline-block;
    font-weight: 700;
  }
  .strikethrough {
    font-family: Rotonda,sans-serif;
    position: relative;
    font-size: 12px;
    color: grey;
  }

  .a_link_menu{
    color: #4c4c4c;
    text-decoration: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 14px;
  }

  .a_link_menu:hover{
    font-size: 14px;
    color: #7ac143;
  }

  .card-carousel_title{
    font-size: 17px;
    font-family: Rotonda,sans-serif;
    color: #444;
    text-align: justify;
    height: 70px;
    overflow: hidden;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .v-carousel_settings {
    box-shadow: none;
    width: 100%;
    height: auto;
  }

  .card-carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 40px;
    color: #666a73;
  }

  .card-carousel {
    display: flex;
    justify-content: center;
    width: 1040px;
    /*width: 90%;*/
  }
  .card-carousel--overflow-container {
    overflow: hidden;
  }
  .card-carousel--nav__left, .card-carousel--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid #42b883;
    border-right: 2px solid #42b883;
    cursor: pointer;
    margin: 0 10px;
    transition: transform 150ms linear;
  }
  .card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
    opacity: 0.2;
    border-color: black;
  }
  .card-carousel--nav__left {
    transform: rotate(-135deg);
  }
  .card-carousel--nav__left:active {
    transform: rotate(-135deg) scale(0.9);
  }
  .card-carousel--nav__right {
    transform: rotate(45deg);
  }
  .card-carousel--nav__right:active {
    transform: rotate(45deg) scale(0.9);
  }

  .card-carousel-cards {
    display: flex;
    transition: transform 150ms ease-out;
    transform: translatex(0px);
  }
  .card-carousel-cards .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    /*box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);*/
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #cccccc;
    z-index: 3;
    margin-bottom: 2px;
  }
  .card-carousel-cards .card-carousel--card:first-child {
    margin-left: 0;
  }
  .card-carousel-cards .card-carousel--card:last-child {
    margin-right: 0;
  }
  .card-carousel-cards .card-carousel--card img {
    /*vertical-align: bottom;*/
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    transition: opacity 150ms linear;
  }
  .card-carousel-cards .card-carousel--card img:hover {
    opacity: 0.5;
  }
  .card-carousel-cards .card-carousel--card--footer {
    border-top: 0;
    padding: 7px 15px;
  }
  .card-carousel-cards .card-carousel--card--footer p {
    padding: 3px 0;
    margin: 0;
    margin-bottom: 2px;
    font-size: 19px;
    font-weight: 500;
    color: #2c3e50;
  }
  .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
    font-size: 12px;
    font-weight: 300;
    padding: 6px;
    background: rgba(40, 44, 53, 0.06);
    display: inline-block;
    position: relative;
    margin-left: 4px;
    color: #666a73;
  }
  .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
    content: "";
    float: left;
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
    border-style: solid;
    border-width: 12px 12px 12px 0;
  }
  .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
    content: "";
    position: absolute;
    top: 10px;
    left: -1px;
    float: left;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: white;
    box-shadow: -0px -0px 0px #004977;
  }

  h1 {
    font-size: 3.6em;
    font-weight: 100;
    text-align: center;
    margin-bottom: 0;
    color: #42b883;
  }

</style>
