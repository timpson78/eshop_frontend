<template>
  <v-container class="mt-0 pa-0 " fluid grid-list-lg>
    <v-layout row>
      <v-flex xs12>
        <v-breadcrumbs class="mt-2 mb-2 pa-0 bread_crumbs ">
          <v-icon slot="divider">chevron_right</v-icon>

          <v-breadcrumbs-item
            v-for="bc in breadCrumbs"
            :disabled="bc.disabled"
            :href="bc.href"
            :key="bc.text"
          >
            {{  bc.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs7>
        <!--<flickity ref="flickity" :options="flickityOptions">-->
          <!--<div class="carousel-cell" v-for="img  in images">-->
            <!--<img :src="img" style=" height: 300px;"/>-->
            <!--{{1}}</div>-->
        <!--</flickity>-->

        <app-courusel
          :starting-image="0"
          :images="images"
          show-progress-bar="true"
        ></app-courusel>
      </v-flex>
      <v-flex xs5>
        <div class="right_namespace">
            <h1 class="h1_title">{{item.title}}</h1>
            <div class="div_item_partnumber">
                <span class="item_partnumber">Артикул {{item.partnumber}}</span>
            </div>
            <v-divider></v-divider>
            <div class="div_order">
              <div style="display: inline-block">
                <div
                  v-if="item.discount"
                  class="div_price_discount" >
                  <span class="price_discount">{{item.price}}</span>
                  <span class="pricerouble">р</span>
                  <span class="discount_span">- {{item.discount}}%</span>
                </div>
                <div class="div_price">
                  <span class="price_span">{{item.discount?computedDiscount (item.price,item.discount): item.price }}</span>
                  <span class="pricerouble">р</span>
                  <span class="">/  шт</span>
                </div>
              </div>

                <div v-if="!isItemInCart(item.id)" class="order_button_div">
                  <v-btn
                    @click="addCart_(item)"
                    class="add-to-cart-btn" flat>
                    <span style="text-transform: none; margin-right: 20px"> В корзину </span>
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                </div>
                <div v-else class="order_button_div">
                  <v-btn
                    @click=""
                    class="added-already-cart" flat>
                    <span style="text-transform: none; margin-right: 20px" > В корзине </span>
                    <v-icon>done</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-divider></v-divider>
                <ul class="ul_delivery">
                  <li class="li_availability_right">
                  <v-icon class="vicon_car">mdi-car-estate</v-icon>
                  <span class="span_delivery"> Доставка завтра</span>
                  </li>
                  <li class="li_availability_left">
                    <div v-if="isItemAvailabale">
                      <v-icon style="color: #7ac143;" small>done</v-icon>
                      <span class="span_available">  товар в наличии</span>
                    </div>
                    <div v-else>
                      <span class="span_available" style="color: darkred">  товара нет в наличии</span>
                    </div>
                  </li>
                </ul>
          <table class="product-info__table">
            <tbody><tr class="product-table__row">
              <th class="product-table__col-header">
                Производитель
              </th>
              <td class="product-table__col">

                Озерецкий МК
              </td>
            </tr>
            <tr class="product-table__row">
              <th class="product-table__col-header">
                Торговая марка
              </th>
              <td class="product-table__col">
                <a href="">

                  Экомилк
                </a>
              </td>
            </tr>
            <tr class="product-table__row">
              <th class="product-table__col-header">
                Страна
              </th>
              <td class="product-table__col">
                <a href="">

                  Россия
                </a>
              </td>
            </tr>
            </tbody></table>

        </div>

      </v-flex>
    </v-layout>
    <v-layout row>
    <v-flex xs7>
      <v-divider></v-divider>
    </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <h3 class="h_name_description">ОПИСАНИЕ</h3>
        <p class="p_description">
         {{item.description}}
        </p>
      </v-flex>
    </v-layout>
  </v-container>


</template>

<script>
  import Flickity from 'vue-flickity'
  import appCourusel from './Courusel'
export default {
    props: ['id'],
    components: {
      Flickity,
      appCourusel
    },
    data () {
      return {
        breadCrumbs: [
          {
            text: 'главная',
            href: '/',
            disabled: false
          },
          {
            text: 'каталог',
            href: '/catalog',
            disabled: false
          }
        ],
        item: {},
        flickityOptions: {
          'autoPlay': 5000,
          'pageDots': false,
          'resize': true,
          'prevNextButtons': true,
          'wrapAround': true
        },
        images: [
          // {
          //   id: '1',
          //   big: 'https://www.perekrestok.ru/src/product.file/full/image/06/94/39406.jpeg',
          //   thumb: 'https://www.perekrestok.ru/src/product.file/full/image/06/94/39406.jpeg'
          // },
          // {
          //   id: '2',
          //   big: 'https://www.perekrestok.ru/src/product.file/list/image/88/27/62788.jpeg',
          //   thumb: 'https://www.perekrestok.ru/src/product.file/list/image/88/27/62788.jpeg'
          // },
          // {
          //   id: '3',
          //   big: 'https://www.perekrestok.ru/src/product.file/list/image/53/83/48353.jpeg',
          //   thumb: 'https://www.perekrestok.ru/src/product.file/list/image/53/83/48353.jpeg'
          // }
        ]
      }
    },
    computed: {
      isItemAvailabale () {
        return true
      }
    },
    methods: {
      isItemInCart (id) {
        return this.$store.getters.isItemInCart(id)
      },
      addCart_ (item) {
        const quantity = 1
        this.$store.commit('addCart', {
          item: item, quantity: quantity
        })
      },
      computedDiscount (value, discount) {
        if (typeof value !== 'undefined' && typeof discount !== 'undefined') {
          value = Number(value.replace(',', '.'))
          discount = Number(discount.replace(',', '.'))
          const retValue = value - value * discount / 100
          return retValue.toFixed(2)
        }
      }

    },
    created () {
      this.item = this.$store.getters.getItemById(this.id)
      this.item.images.forEach(function (item, i) {
        this.images.push({ id: i, big: item, thumb: item})
      }, this)

      this.breadCrumbs.push({
        text: this.item.title,
        href: '/',
        disabled: true})
    }
  }
</script>

<style scoped>
  .bread_crumbs {
    font-family: Rotonda,sans-serif;
    color: #4c4c4c;
    font-size: 14px;
  }

  .carousel-cell {
    width: 100%;
    height: 400px;
    margin-right: 10px;
  }
  .carousel-cell.size-180 { width: 180px; }
  .carousel-cell.size-large { width: 75%; }
  .right_namespace {
    padding-left: 30px;
    font-family: Rotonda,sans-serif;
  }
  .h1_title {
    font-family: Rotonda,sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 6px;
    line-height: 36px;
  }
  .item_partnumber {
    font-family: Rotonda,sans-serif;
    font-size: 14px;
    color: #767676;
    margin-right: 20px;
  }
  .div_item_partnumber {
   text-align: right;
    margin-bottom: 10px;
  }
  .div_order {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .div_price_discount{
    font-family: Rotonda,sans-serif;
    margin-bottom: 10px;
  }
  .div_price{
    margin-top: 10px;
  }
  .price_discount {
    position: relative;
    font-size: 16px;
    color: grey;
  }
  .price_discount:before {
    border-bottom: 1px solid grey ;
    position: absolute;
    content: "";
    width: 100%;
    height: 80%;
    transform: rotate(-9deg);
  }

  .discount_span {
    margin-left: 20px;
    color: #ff582a;
    display: inline-block;
    font-weight: 700;
    font-size: 17px;
  }
  .price_span {
    font-size: 28px;
    font-weight: 800;
    color: #000;
  }
  .add-to-cart-btn {
    background-color: #7ac143;
    color: white;
    font-size: 16px;
    font-family: Rotonda,sans-serif;
    font-weight: 1000;
    height: 40px;
    width: 100%;
    text-align: center;
    margin: 10px 0px 0px 0px;
    border: 1px solid #7ac143;
  }
  .add-to-cart-btn:hover {
    background-color: #008b44;
    border: 1px solid #008b44;
  }

  .added-already-cart{
    font-family: Rotonda,sans-serif;
    background-color: white;
    height: 40px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #7ac143;
    font-weight: 1000;
    text-align: center;
    margin: 10px 0px 0px 0px;

  }
  .order_button_div {
    display: inline-block;
    float: right;
    margin-right: 20px;
  }
  .p_description {
    text-align: justify;
    margin-top: 20px;
  }
  .h_name_description {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
  }

  .product-info__block{
    font-family: Rotonda,sans-serif;
    margin-top: 20px;

  }

  .product-info__header {
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 16px;
    color: #444;
    text-transform: uppercase;
  }
  .ul_delivery {
    font-family: Rotonda,sans-serif;
    margin-top: 10px;
    width: 100%;
    margin-bottom: 10px;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .vicon_car{
    color: #7ac143;
    margin-right: 20px;
  }
  .span_delivery {
    vertical-align: top;
  }
  .span_available {
    vertical-align: top;
    color: #7ac143;
  }

  .li_availability_right {
    padding-right: 10px;
  }
  .li_availability_left {
    padding-left: 30px;
    border-left: 1px solid #e5e5e5;
  }
  .product-info__table {
      display: table;
      border-collapse: separate;
      border-spacing: 2px;
      border-color: grey;
      width: 100%;
      margin-bottom: 30px;
    }
  .product-table__row{
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .product-table__col-header {
    display: -ms-flexbox;
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-basis: 30%;
    font-weight: 400;
    color: #666;
    position: relative;
  }

  .product-table__col {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-basis: 70%;
    justify-content: flex-end;
    text-align: right;
  }

</style>
