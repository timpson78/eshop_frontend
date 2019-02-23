<template>
  <v-container class="mt-0 pa-0 " fluid grid-list-lg>
    <v-layout row class="ml-5">
      <v-flex xs12>
          <H1 class="h1_font h1_size">Корзина</H1>
      </v-flex>
    </v-layout>
    <v-layout row class="ml-5">
      <v-flex xs3>
        <div>
          <v-icon>chevron_left</v-icon>
          <a  href="/catalog" class="a_link_menu">продолжить покупки</a>
        </div>
      </v-flex>
      <v-flex xs6>
           <p class="text-xs-center"
              v-if="carts.length!==0" > товаров в наличии</p>
      </v-flex>
      <v-flex xs3>
        <div v-if="carts.length!==0" >
          <app-delete-cart-modal></app-delete-cart-modal>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row class="ml-5"  v-if="carts.length!==0">
      <v-flex xs9>
        <div
          v-for="cart in carts"
          class="cart_order_ul">
            <ul class="cart_list_style">
              <li class="li_order-item">
                <button class="order-item-delete">
                  <v-icon
                  @click="deleteCart(cart.item.id)"
                  >mdi-trash-can-outline</v-icon>
                </button>
                <a class="order-item__img">
                  <img :src="cart.item.imageSrc" class="item__img"/>
                </a>
                <div class="order-item__main-info">
                  <div class="order-item__name">
                      <a href="" class="a_link_menu">{{cart.item.title}}
                      </a>
                  </div>
                  <div class="order-item__vendor-code">
                    Артикул {{cart.item.partnumber}}
                  </div>
                  <div class="order-item__weight">
                    {{cart.item.price}} /{{cart.item.mesure}} ({{cart.item.weight}} кг)
                  </div>
                </div>
                <div class="order-item__additional-info">
                  <div class="order-item__cost">
                    <div class="order-item__sum_old" v-if="cart.item.discount">
                      <div class="item__prev">
                        <span >{{mult(cart.item.price,cart.quantity)}}</span>
                      </div>
                      <p class="order-item__sum_old_p">-{{cart.item.discount}}%</p>
                    </div>
                    <div class="order-item__sum">
                      <span class="order-item__sum">
                        {{cart.item.discount ? computedDiscount( mult(cart.item.price,cart.quantity), cart.item.discount) : mult(cart.item.price,cart.quantity)}}</span>
                      <span class="pricerouble">р</span>
                    </div>
                  </div>
                  <div class="order-item__count">
                    <div class="product-spinner">
                        <span
                          @click="decreaseQuantity(cart.item)"
                          class="product-spinner__inc">
                          <v-icon
                            class="white--text">mdi-minus</v-icon></span>
                        <input
                          type="text"
                          name="quantity"
                          :ref="'quantity'+cart.item.id"
                          :value="quantityCart (cart.item.id)"
                          @input=" setQuantityCart (cart, $event.target.value)"
                          autocomplete="off"
                          class="product-spinner__field"/>
                        <span
                          @click="increaseQuantity (cart.item)"
                          class="product-spinner__inc">
                          <v-icon class="white--text">mdi-plus</v-icon></span>
                    </div>
                    <div class="menu__warning">
                      осталось 4 шт
                    </div>
                   </div>
                </div>
              </li>
            </ul>
        </div>
      </v-flex>
      <v-flex xs3>
        <div class="cart-menu">
          <div class="cart-menu__info-list">
            <div class="cart-menu__group">
              <div class="cart-menu__info-term_sum">
                Итого:
              </div>
              <div class="cart-menu__info-def_sum">
                <span
                  class="all_summ_span">
                    {{cartsSum}}
                </span>
                <span class="pricerouble">р</span>
              </div>
            </div>
            <div class="cart-menu__caption">
              Стоимость без учета доставки
            </div>
          </div>
          <button class="cart-menu__submit">Оформить заказ</button>
        </div>
      </v-flex>
    </v-layout >
    <v-layout
              row class="ml-5"
              v-else-if="carts.length==0" >
       <v-flex xs12>
            <div>
              <v-icon class="empty-section__icon" x-large>mdi-cart-outline</v-icon>
              <div class="empty-carts_title">
                В корзине товаров нет
              </div>
              <a href="/catalog" class="empty-section__link">Перейти в каталог</a>
            </div>
       </v-flex>
    </v-layout>
    <v-layout row class="ml-5 mb-5">
      <v-flex xs3>
        <div>
          <v-icon>chevron_left</v-icon>
          <a  href="/catalog" class="a_link_menu">продолжить покупки</a>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import DeleteCartModal from './DeleteCartModal'

  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      carts () {
        return this.$store.getters.getCarts
      },
      cartsSum () {
        let carts = this.$store.getters.getCarts
        let sum = 0
        for (let i = 0; i < carts.length; i++) {
          sum += this.computeDiscount(carts[i].item.price, carts[i].item.discount) *carts[i].quantity
        }
        return sum.toFixed(2)
      }

    },
    methods: {
      computedDiscount (value, discount) {
        value = Number(value.replace(',', '.'))
        discount = Number(discount.replace(',', '.'))
        const retValue = this.computeDiscount(value, discount)
        return retValue.toFixed(2)
      },
      computeDiscount (value, discount) {
        return value - value * discount / 100
      },
      quantityCart (id) {
        return this.$store.getters.getCartById(id).quantity
      },
      setQuantityCart (cart, quantity) {
        if (isNaN(quantity)) {
          quantity = cart.quantity
          this.$refs['quantity' + cart.item.id][0].value = quantity
        }
        this.$store.commit('setQuantityCartById', {item: cart.item, quantity: quantity})
      },
      decreaseQuantity (item) {
        if (this.$refs['quantity' + item.id][0].value > 1) {
          const quantity = --this.$refs['quantity' + item.id][0].value
          this.$store.commit('setQuantityCartById', { item: item, quantity: quantity })
        }
      },
      increaseQuantity (item) {
        const quantity = ++this.$refs['quantity' + item.id][0].value
        this.$store.commit('setQuantityCartById', { item: item, quantity: quantity })
      },
      deleteCart (id) {
        this.$store.commit('deleteCart', id)
      },
      mult (value1, value2) {
        return String((value1 * value2).toFixed(2))
      }
    },
    components: {
      appDeleteCartModal: DeleteCartModal
    }
  }
</script>

<style scoped>

  .cart_order_ul {
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  }
  .cart_list_style{
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 15px;
  }
  .li_order-item {

    background: #fff;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 50px;
    padding-right: 22px;
    display: -webkit-box;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-content: center;
    align-items: center;
  }
  .order-item__img {
    display: -webkit-box;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100px;
    padding: 10px 30px 10px 10px;
    width: 124px;
  }
  .item__img {
    max-width: 100%;
    max-height: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
  .order-item-delete {
    padding: 0;
    box-shadow: none;
    border: none;
    background: transparent;
    width: 62px;
    height: 62px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    z-index: 1;
  }
  .order-item__main-info {
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 190px;
    padding-top: 5px;
  }
  .order-item__name {
    font-size: 13px;
    line-height: 16px;
    max-height: 50px;
    overflow: hidden;
  }
  .order-item__weight {
    font-size: 13px;
    padding-top: 7px;
    color: #b2b2b2;
  }

  .order-item__additional-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
  }

  .order-item__cost {
    margin-left: 0;
    padding-left: 35px;
    margin-right: auto;
    box-sizing: border-box;
    display: block;
  }

  .product-spinner {
    display: flex;
    flex-direction: row;
    padding-bottom: 0;
    border-radius: 5px;
    overflow: hidden;
    height: 44px;
    padding-top: 2px;
    width: 100%;
    position: relative;
    box-sizing: border-box
  }
  .product-spinner__inc {
    width: 39px;
    min-width: 40px;
    margin-right: 2px;
    user-select: none;
    display: block;
    border-radius: 3px;
    color: #fff;
    padding: 6px 0;
    background: #7ac143;
    border: 0;
    text-align: center;
    transition: background .3s ease;
    cursor: pointer;
    font-family: Rotonda,sans-serif;
    font-weight: 700;
    margin-left: 2px;
  }
  .product-spinner__inc:hover {
    background: #008b44;
  }

  .product-spinner__field {
    display: block;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    padding: 5px 7px;
    outline: none;
    background: #fff;
    width: 60px;
    padding: 0 2px;
    font-size: 16px;
    font-family: GothicBook,sans-serif;
    text-align: center;
    border-color: #c6e0ad;
    overflow: visible;
    line-height: 1.15;
    margin: 0;
  }
  .order-item__sum_old {
    font-weight: 400;
    font-size: 10px;
    position: relative;
  }
  .order-item__sum_old_p  {
    color: #ff582a;
    display: inline-block;
    font-weight: 700;
  }
  .menu__warning {
    width: 100%;
    text-align: center;
    padding: 0;
    border: none;
    font-size: 13px;
    margin: 6px 0 0;
    line-height: 16px;
    background-color: #ffe2d9;
    color: #000;
    position: absolute;
    left: 0;
    top: 100%;
  }
  .order-item__count {
    width: 147px;
    position: relative;
  }


  .item__prev {
    color: #999;
    position: relative;
    display: inline-block;
    font-size: inherit;
    font-weight: 400;
    margin-right: 10px;
  }

  .cart-menu {
    font-family: Rotonda,sans-serif;
    background: #fff;
    border: 1px solid #e6e6e6;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
    border-radius: 3px;
    padding: 27px 15px 13px;
    z-index: 9;

  }

  .cart-menu__info-list {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
  }
  .cart-menu__group {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
  }
  .cart-menu__info-def_sum {
    color: #444;
  }

  .cart-menu__info-term_sum {
    font-size: 16px;
    line-height: 26px;
    color: #444;
  }
  .price__rouble {
    display: inline-block;
    vertical-align: baseline;
    font-weight: 700;
  }

  .all_summ_span {
    font-size: 18px;
    font-weight: 800;
    vertical-align: bottom;
  }
  .cart-menu__caption {
    font-family: Rotonda,sans-serif;
    font-size: 10px;
    line-height: 12px;
    color: #b2b2b2;
  }
  .cart-menu__submit {
    width: 100%;
    border-radius: 3px;
    color: #fff;
    background: #7ac143;
    border: 0;
    text-align: center;
    transition: background .3s ease;
    cursor: pointer;
    font-family: Rotonda,sans-serif;
    font-weight: 700;
    display: block;
    font-size: 16px;
    height: 50px;
    padding: 0;
  }
  .cart-menu__submit:hover {
    background: #008b44;
  }

  .empty-section__icon {
    width: 58px;
    height: 45px;
    color: #7ac143;
    display: block;
    margin: 0 auto 13px;
  }
  .empty-carts_title {
    font-family: Rotonda,sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #7ac143;
    margin: 0  auto;
    width:310px;
    display: block;
  }
  .empty-section__link {
    display: block;
    height: 40px;
    line-height: 40px;
    font-family: Rotonda,sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #7ac143;
    text-align: center;
    width: 185px;
    margin: 21px auto 0;
    border-radius: 3px;
    transition: .3s ease;
  }
  .empty-section__link:hover {
    background-color: #008b44;
  }
  .h1_size{
    font-size: 40px;
  }

  .order-item__sum {
    font-family: Rotonda,sans-serif;
    font-weight: 700;
    position: relative;
    font-size: 18px;
  }

  .order-item__vendor-code {
    color: #b2b2b2;
    font-size: 12px;
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
  .a_link_menu:hover .trash_icon{
    color: #7ac143;
  }
  .trash_icon:hover{
    color: #7ac143;
  }


</style>
