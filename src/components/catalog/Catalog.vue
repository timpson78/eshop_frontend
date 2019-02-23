<template>
  <v-container class="mt-0 pa-0 " fluid grid-list-lg>
    <v-layout row>
      <v-flex xs12>
        <v-breadcrumbs class="mt-2 mb-2 pa-0">
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
      <h1 class="h1_font">Каталог продукции</h1>
    </v-layout>

    <v-layout row >
      <v-flex xs3>
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content
            value="true">
             <div slot="header" class="sidemenu_text">Разделы</div>
              <v-list
                v-for="catalog in catalogs"
                :key="catalog.id"
              >
                <a @click="getItemsFromCatalogId(catalog.id)" class="a_link_menu ml-4">{{catalog.name}}</a>
              </v-list>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider></v-divider>

        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content
            value="true">
            <div slot="header" class="sidemenu_text">Фильтры</div>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
      </v-flex>
      <v-flex  d-flex  xs9 class="ml-2" >
        <v-layout row wrap>
        <v-flex
              d-flex
              xs4
              sm6
              md4
              v-for="item in items"
              :key="item.id"
            >

              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 0}`"
                  class="mx-auto border"
                  height="450"
                  max-width="true"
                >

                  <v-card-media
                    position="center"
                    class="ma-3"
                  >
                      <!--<v-img-->
                        <!--class="ma-auto"-->
                        <!--position="center"-->
                        <!--height="150"-->
                        <!--width="auto"-->
                        <!--:src="item.imageSrc"-->
                      <!--&gt;</v-img>-->
                    <div class="div_image_center">
                    <img class="img_item"
                           :src="item.imageSrc"
                    ></img>
                    </div>

                  </v-card-media>
                  <v-card-title class="ma-0 pa-0">
                    <div class="height_title ml-3 mr-3 text-xs-justify">
                      <a  :href="'/item/'+item.id" class="a_link_menu ">{{item.title}}</a>
                    </div>
                  </v-card-title>

                  <v-card-text class="mt-0">
                    <div v-if="item.discount">
                      <span  class="strikethrough">{{ item.price  }}</span>
                      <span class="saleoff">- {{item.discount}}%</span>
                    </div>
                    <div v-else> &nbsp;</div>

                    <div class="mt-1">
                        <span class="pricetitle">{{item.discount ? computedDiscount(item.price, item.discount) : item.price }}</span><span class="pricerouble">р</span>
                      <span class="priceunit">{{item.mesure}}</span>
                    </div>

                    <div v-if="!isItemInCart(item.id)">
                      <v-btn
                        @click="addCart_(item)"
                        class="add-to-cart-btn" flat>
                        <span style="text-transform: none; margin-right: 20px"> В корзину </span>
                        <v-icon>mdi-cart-plus</v-icon>
                      </v-btn>
                    </div>
                   <div v-else>
                     <v-btn
                       @click=""
                       class="added-already-cart" flat>
                       <span style="text-transform: none; margin-right: 20px" > В корзине </span>
                       <v-icon>done</v-icon>
                     </v-btn>
                   </div>

                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
    
</template>

<script>
    export default {
      data () {
        return {
          drawer: false,
          breadCrumbs: [
            {
              text: 'главная',
              href: '/',
              disabled: false
            },
            {
              text: 'каталог',
              disabled: true
            }
          ],
          catalogs: [
            {
              id: '1',
              name: 'Фрукты'
            },
            {
              id: '2',
              name: 'Овощи'
            },
            {
              id: '3',
              name: 'Ягоды'
            }
          ]
        }
      },
      watch: {
      },
      computed: {
        items () {
          return this.$store.getters.getItems
        }
      },
      methods: {
        getItemsFromCatalogId (id) {

        },
        computedDiscount (value, discount) {
          value = Number(value.replace(',', '.'))
          discount = Number(discount.replace(',', '.'))
          const retValue = value - value * discount / 100
          return retValue.toFixed(2)
        },
        addCart_ (item) {
          const quantity = 1
          this.$store.commit('addCart', {
            item: item, quantity: quantity
          })
        },
        isItemInCart (id) {
          return this.$store.getters.isItemInCart(id)
        }

      }
    }
</script>

<style scoped>

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
  .sidemenu_text {
    font-size: 16px;
    font-family: Rotonda,sans-serif;
    color: black;
    letter-spacing: .5px;
    font-size: 15px;
    font-weight: 700;
    color: #4c4c4c;
  }
  .border{
    border-radius: 5px;
    border: 1px solid #e5e5e5;
  }

  .strikethrough {
    font-family: Rotonda,sans-serif;
    position: relative;
    font-size: 12px;
    color: grey;
  }

  .strikethrough:before {
    border-bottom: 1px solid grey ;
    position: absolute;
    content: "";
    width: 100%;
    height: 80%;
    transform: rotate(-9deg);
  }
  .saleoff {
    font-family: Rotonda,sans-serif;
    color: red;
    display: inline-block;
    font-weight: 700;
  }
  .pricetitle{
    font-family: Rotonda,sans-serif;
    color: #000;
    font-size: 26px;
    font-weight: 700;
    margin-right: 15px;
    margin-bottom: 3px;

  }
  .priceunit {
    font-family: Rotonda,sans-serif;
    color: #b2b2b2;
    font-size: 14px;
    font-weight: 1000;
  }
  .height_title {
    height: 60px;
  }
  .added-already-cart{
    font-family: Rotonda,sans-serif;
    background-color: white;
    height: 40px;
    font-size: 16px;
    border: 1px solid #7ac143;
    width: 100%;
    font-weight: 1000;
    text-align: center;
    margin: 10px 0px 0px 0px;

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
  .div_image_center {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img_items {
    height: auto;
    width: 190px;
    position: center;
    display: block;

  }
</style>
