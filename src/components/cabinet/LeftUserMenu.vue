<template>
  <div>
    <v-layout row>
        <v-flex xs3>
          <div class="my_div_nav_menu">
              <ul class="xf-lk-nav__list">
                  <li class="xf-lk-nav__item">
                    <a class="xf-lk-nav__link" href="/cabinet">Профиль</a>
                    <ul class="xf-lk-nav__submenu">
                      <li class="xf-lk-nav__subitem"
                          @click.prevent="activeTab='Address'"
                      >
                        <a class="xf-lk-nav__subitem-link" href="">Контактные данные</a>
                      </li>
                      <li class="xf-lk-nav__subitem"
                          @click.prevent="activeTab='ChangePassword'">
                        <a class="xf-lk-nav__subitem-link" href="">Сменить пароль</a>
                      </li>

                    </ul>
                  </li>
                <li class="xf-lk-nav__item">
                  <a class="xf-lk-nav__link active" href="/cabinet">Мои карты</a>
                  <ul class="xf-lk-nav__submenu">
                    <li class="xf-lk-nav__subitem ">
                      <a class="xf-lk-nav__subitem-link  " href="/cabinet">Мои карты</a>
                    </li>
                  </ul>
                </li>

                <li class="xf-lk-nav__item">
                  <a class="xf-lk-nav__link" href="/cabinet">Покупки</a>
                  <ul class="xf-lk-nav__submenu">
                    <li class="xf-lk-nav__subitem  ">
                      <a class="xf-lk-nav__subitem-link" href="/cabinet">История покупок</a>
                    </li>
                    <li class="xf-lk-nav__subitem">
                      <a class="xf-lk-nav__subitem-link" href="/cabinet">Статус заказа </a>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
        </v-flex>

        <v-flex xs9>
          <div v-if="activeTab==='Address'">
            <address-tab ></address-tab>
          </div>
          <div v-else-if="activeTab==='ChangePassword'">
            <change-password-tab></change-password-tab>
          </div>
        </v-flex>
      </v-layout>


  </div>
</template>

<script>
  import AddressTab from './Address.vue'
  import ChangePasswordTab from './ChangePassword.vue'

    export default {
      data () {
        return {
          activeTab: 'Address'
        }
      },
      components: {
        AddressTab,
        ChangePasswordTab
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
