<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="350">
      <!--<v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>-->
      <a
        slot="activator"
        class="a_link_menu">
        <v-icon class="trash_icon">mdi-trash-can-outline</v-icon>
        очистить корзину</a>
      <v-card>
        <v-card-title class="question_delete_cart">Вы действительно хотите удалить все товары из корзины?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Отмена</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false" @click="clearCarts()">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      clearCarts () {
        this.$store.commit('clearCarts')
        console.log(this.$store.getters.getCarts)
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
  .a_link_menu:hover .trash_icon{
    color: #7ac143;
  }

  .question_delete_cart {
    font-family: Rotonda,sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #717171;

    text-align: center;
    margin: auto 0;

  }
</style>
