<template>
<div>
  <v-layout row>
  <v-flex xs3>
    <div class="my_div_nav_menu">
      <v-navigation-drawer
        stateless
        value="true"
      >
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="#257F0F">fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Домой</v-list-tile-title>
          </v-list-tile>


          <!--------Catalog----------------------------->
          <v-list-group
            prepend-icon="fa-folder-open"
            value="true"
            active-class="icon_nav_drawer"
          >
            <!--<v-icon slot="prependIcon" large color="red">comment</v-icon>-->
            <!--<v-icon slot="appendIcon" large color="grey">comment</v-icon>-->
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Каталог</v-list-tile-title>
              </v-list-tile>
            </template>

              <v-list-tile
                v-for="(item, i) in items"
                :key="i"
                @click.prevent="changetab(item.action)"
              >
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>

          </v-list-group>
        <!--------Orders----------------------------->
          <v-list-group
            prepend-icon="fa-cart-arrow-down"
            value="true"
            active-class="icon_nav_drawer"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Заказы</v-list-tile-title>
              </v-list-tile>
            </template>

              <v-list-tile
                v-for="(order, i) in orders"
                :key="i"
                @click.prevent="order.method"
              >
                <v-list-tile-title v-text="order.name"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="order.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>

          </v-list-group>
          <!--------Buyers----------------------------->
          <v-list-group
            prepend-icon="fa-user-edit"
            value="true"
            active-class="icon_nav_drawer"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Покупатели</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(buyer, i) in buyers"
              :key="i"
              @click.prevent="buyer.method"
            >
              <v-list-tile-title v-text="buyer.name"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="buyer.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>

          <!--------Cash----------------------------->
          <v-list-group
            prepend-icon="fa-wallet"
            value="true"
            active-class="icon_nav_drawer"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Поступления</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(cash, i) in cashincome"
              :key="i"
              @click.prevent="cash.method"
            >
              <v-list-tile-title v-text="cash.name"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="cash.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>

          <!--------import/export----------------------------->
          <v-list-group
            prepend-icon="fa-download"
            value="true"
            active-class="icon_nav_drawer"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Поступления</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(imp, i) in importexport"
              :key="i"
              @click.prevent="imp.method"
            >
              <v-list-tile-title v-text="imp.name"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="imp.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>

        </v-list>
      </v-navigation-drawer>
    </div>
  </v-flex>
  <v-flex xs9>

    <div v-if="adminactivetab==='ListItems'">
      <list-items></list-items>
    </div>
    <div v-if="adminactivetab==='Categories'">
      <Categories></Categories>
    </div>

    <!--<div v-else-if="activeTab==='ChangePassword'">-->
      <!--<change-password-tab></change-password-tab>-->
    <!--</div>-->

  </v-flex>
  </v-layout>
</div>
</template>

<script>
  import ListItems from './admin/ListItems'
  import Categories from "./admin/Categories";

  export default {
    data () {
      return {
        adminactivetab: '',

        items: [{name: 'Товары', action: 'ListItems', icon: ''},
                {name: 'Категории', action: 'Categories', icon: ''},
                {name: 'Свойства', action: this.test, icon: ''}],

        orders: [{name: 'Список заказов', action: this.test, icon: ''}],

        buyers: [{name: 'Список покупателей', action: this.test, icon: ''}],

        cashincome: [{name: 'Поступление денег', action: this.test, icon: ''}],

        importexport: [{name: 'Экспорт', action: this.test, icon: ''},
                       {name: 'Импорт', action: this.test, icon: ''}]
      }
    },
    methods: {
      test () {
        console.log('test')
      },
      changetab (tab) {
        this.adminactivetab = tab
      }
    },
    components: {Categories, ListItems}
  }
</script>

<style scoped>
  >>>.icon_nav_drawer{
    color: #70c11d;
  },
  nav_drawer {

  }


</style>
