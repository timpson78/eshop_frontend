<template>

  <v-app class="centerallproject">

        <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        floating
        class="grey lighten-4"
        app>
        </v-navigation-drawer>

        <v-toolbar color=" white mt-0 toolbar_height"
                   flat
        >
          <v-container class="white mt-0 pt-0 mb-0 pb-0 " fluid  >
            <v-layout>
              <v-flex  xs3>
                <p class="up_menu_font">  г. Краснодар  </p>
              </v-flex>
              <v-flex xs6>

              </v-flex>
              <v-flex xs3>
                <p class="up_menu_font"> телефон: &nbsp;&nbsp;<a href="tel:9181885535" class="tel_ahref"> {{phone}}</a> </p>
              </v-flex>
            </v-layout>
          </v-container>

        </v-toolbar>

        <v-toolbar color="white mt-0"
                   flat
                   clipped-left
        >

          <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>

          <v-toolbar-title class="mr-4">
            <router-link to="/" tag="span" class="pointer">E-shop app</router-link>
          </v-toolbar-title>
          <v-text-field
            solo-inverted
            flat
            hide-details
            label="Поиск"
            prepend-inner-icon="search"
          ></v-text-field>
          <v-spacer></v-spacer>
          <div class="text-xs-center">
            <v-badge
              left
              :value="!isCartEmpty"
            >
              <span slot="badge">{{getCartSize}}</span>
              <v-icon
                large
                class="cart_icon"
                @click="toCart"
              >
                shopping_cart
              </v-icon>
            </v-badge>
          </div>
          <v-toolbar slot="extension" flat class="white" height="30">

            <v-toolbar-items>
              </v-toolbar-items>
                <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                flat class="menu_font"
                v-for="link in menu_links"
                :key="link.title"
                :to="link.url"
              >
                <v-icon class="mr-2">{{link.icon}}</v-icon>
                 {{link.title}}
                </v-btn>

            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                flat
                class="menu_font"
                v-for="link in login_links"
                :key="link.title"
                :to="link.url"
                @click="link.click"
              >
                <v-icon class="mr-2">{{link.icon}}</v-icon>
                {{link.title}}
              </v-btn>

            </v-toolbar-items>
          </v-toolbar>


        </v-toolbar>
    <v-divider></v-divider>
        <v-content class="white">
            <router-view></router-view>

        </v-content>

        <v-footer
                app
                class="pa-3"
        >
          <div class="text-xs-center">&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>

    <template v-if="error">
      <v-snackbar
        :bottom="true"
        :multi-line="true"
        :timeout="5000"
        color="error"
        @imput="closeError"
        :value="true"
      >
        {{error}}
        <v-btn
          flat
          dark
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>

    <template v-if="info">
      <v-snackbar
        :bottom="true"
        :multi-line="true"
        :timeout="5000"
        color="green"
        @imput="closeInfo"
        :value="true"
      >
        {{info}}
        <v-btn
          flat
          dark
          @click.native="closeInfo"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>


  </v-app>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      drawer: false,
      phone: '+7-918-188-55-35',
      menu_links: [
        {title: 'Каталог', icon: 'list', url: '/catalog'},
        {title: 'Акции и скидки', icon: '', url: '/promos'},
        {title: 'Оплата и доставка', icon: '', url: '/delivery'},
        {title: 'О компании', icon: '', url: '/company'}]

    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    },
    info () {
      return this.$store.getters.getInfo
    },
    carts () {
      return this.$store.getters.getCarts
    },
    isCartEmpty () {
      return this.$store.getters.getCartSize === 0
    },
    getCartSize () {
      return this.$store.getters.getCartSize
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    login_links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'личный кабинет', icon: 'perm_identity', url: '/cabinet', click: this.donothing},
          {title: 'Выход', icon: 'exit_to_app', url: '', click: this.logout}
        ]
      } else {
        return [
          {title: 'Вход', icon: 'perm_identity', url: '/login', click: this.donothing},
          {title: 'Регистрация', icon: '', url: '/registration', click: this.donothing}
        ]
      }
    }
  },
  methods: {

    closeError () {
      this.$store.dispatch('clearError')
    },
    closeInfo () {
      this.$store.dispatch('clearInfo')
    },
    toCart () {
      this.$router.push('/cart')
    },
    logout () {
      this.$store.commit('set_user', null)
      localStorage.removeItem('user')
      this.$router.push('/')
    },
    donothing () {}
  }
}
</script>

<style>
  @font-face {
    font-family: "Rotonda";
    src: url("./css/fonts/RotondaC.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
  }
  @font-face {
    font-family: "Rouble";
    src: url("./css/fonts/Rouble.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
  }
  .h1_font {
    font-size: 22px;
    font-family: Rotonda,sans-serif;
    text-transform: none;
    color: grey;
  }

  .pricerouble {
    font-family: Rouble,sans-serif;
    color: #b2b2b2;
    font-size: 14px;
    font-weight: 700;
  }

</style>

<style scoped>
  .centerallproject {
    width: 90%;
    margin: auto;
  }

  .demo-tree {
    width: 50%;
  }

  .filter-field {
    display: block;
    width: 100%;
    padding: 3px;
  }

  .events-table {
    width: 100%;
    margin-top: 15px;
  }

  .events-table-header {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    background-color: #fff;
    text-align: left;
    display: flex;
    justify-content: space-between;

  }

  .events-table .event:nth-of-type(odd) {
    background-color: #f9f9f9;
  }

  .events-table .event {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
    display: flex;
  }

  .events-table .event > span,
  .events-table-header > span {
    flex-basis: 25%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .node-controls a {
    color: #ff14ce
  }
</style>
