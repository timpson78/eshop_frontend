<template>
  <v-container row class="pa-1 ma-1">
    <v-layout >
      <v-flex xs12>
        <v-breadcrumbs class="mt-2 mb-2 ">
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
    <v-layout row mb-3 >
      <h1 class="h1_font">{{ this.title() }}</h1>
    </v-layout>

    <div v-if="userRole==='ROLE_USER'">
      <left-user-menu></left-user-menu>
    </div>
    <div v-else-if="userRole==='ROLE_ADMIN'">
      <left-admin-menu></left-admin-menu>
    </div>



  </v-container>
</template>

<script>
  import LeftAdminMenu from './LeftAdminMenu'
  import LeftUserMenu from './LeftUserMenu'

  export default {

    data () {
      return {
        breadCrumbs: [
          {
            text: 'главная',
            href: '/',
            disabled: false
          },
          {
            text: 'личный кабинет',
            disabled: true
          }
        ],
        userRole: ''
      }
    },
    methods: {
      title () {
        if (this.userRole === 'ROLE_ADMIN') {
          return 'личный кабинет администратора'
        } else if (this.userRole === 'ROLE_USER') {
          return 'Личный кабинет'
        }
      }
    },
    components: {
      LeftAdminMenu,
      LeftUserMenu
    },
    created () {
      this.userRole = this.$store.getters.getUser.role
    }
  }
</script>

<style scoped>

  .xf-lk-nav__list {
    margin: 0;
    padding: 0;
    list-style: none;
    color: #4c4c4c;
    display: block;
  }
  .xf-lk-nav__item {
    border: 1px solid #ececec;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .xf-lk-nav__link {
    font-family: Rotonda,sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: #808285;
    display: block;
    padding: 12px 11px;
    border-bottom: 1px solid #ececec;
    text-decoration: none;
  }
  .xf-lk-nav__submenu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .xf-lk-nav__subitem {
    border-bottom: 1px solid #ececec;
  }
  .xf-lk-nav__subitem:hover {
    background-color: #F6F6F6;
  }

  .xf-lk-nav__subitem-link {
    color: #444;
    padding: 12px 11px;
    display: block;
    font-size: 16px;
    line-height: 19px;
    transition: background .5s ease,color .5s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    font-family: Gothic,sans-serif;

  }

</style>
