<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="ma-0 pa-0">
      <v-btn class="mx-2 ml-5"  outline  small color="green" @click="createNewItem"  :disabled="isNew" >
        <v-icon dark>add</v-icon>
        Новый
      </v-btn>
    <v-data-table
      :headers="headers"
      calculate-widths="true"
      dense="true"
      :items="items"
      hide-actions
      :page.sync="page"
      :loading="loading"
      loading-text="Данные загружаются подождите...."
      class="ml-4 mr-0 pr-0"
    >
      <template v-slot:items="props"       class="">
          <tr v-if="props.item.isNew">
            <td><input    class="inputstyle"
                  :class="{'border_error': $v.newItem.partnumber.$error, 'border_normal':!$v.newItem.partnumber.$error}"
                  v-model.trim="$v.newItem.partnumber.$model" >  </td>
            <td class="text-xs-right"><img class="imageStyle" src=""/></td>
            <td class="text-xs-right">
              <input class="inputstyle"
                  :class="{'border_error': $v.newItem.title.$error, 'border_normal':!$v.newItem.title.$error}"
                  v-model.trim="$v.newItem.title.$model">
            </td>
            <td class="text-xs-right"> <input   class="inputstyle"
               :class="{'border_error': $v.newItem.price.$error, 'border_normal':!$v.newItem.price.$error}"
               v-model.trim="$v.newItem.price.$model" ></td>
            <td class="text-xs-right"> <input
              :class="{'border_error': $v.newItem.quantity.$error, 'border_normal':!$v.newItem.quantity.$error}"
              v-model.trim="$v.newItem.quantity.$model" class="inputstyle"> </td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                color="green"
                class="mr-2"
                @click="saveNewItem(props.item)"
              >
                save
              </v-icon>
              <v-icon
                color="red"
                small
                @click="cancelSaveNewItem"
              >
                cancel
              </v-icon>
            </td>
          </tr>
         <tr v-if="!props.item.isNew" @dblclick="editItem(props.item)">
            <td class="text-xs-center width20" >{{ props.item.partnumber}}</td>
            <td class="text-xs-left width10"><img class="imageStyle" :src="firstImage(props.item)"/></td>
           <td class="text-xs-left width40"><div style="width: 200px">{{ props.item.title}}</div> </td>
            <td class="text-xs-center width10" >{{ props.item.price }}</td>
            <td class="text-xs-center width10">{{ props.item.quantity}}</td>
            <td class="justify-center layout px-0 width10 ">
              <v-icon
                small
                color="green"
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                color="red"
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
         </tr>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
           Нет данных, загружаю...
        </v-alert>
      </template>
    </v-data-table>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page"
                    :length="maxPage"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                    color="green"
                    @input="loadPage(page)"

      ></v-pagination>
    </div>
    <modal name="modalEdit" height="auto" width="90%" :scrollable="true">
          <edit-item :isNew="isNew" :itemId="itemId" @onSave="saveItem"></edit-item>
    </modal>


  </div>
    
</template>

<script>
  import Vue from 'vue'
  import config from '@/config/config.js'
  import EditItem from './EditItem'
  import ConfirmDialog from '../ConfirmDialog'
  import { required, maxLength, numeric } from 'vuelidate/lib/validators'
  const floatValidator = (value) => { return /^[0-9]*(?:\.[0-9]{0,4})?$/.test(value) }

  export default {
    components: {
      EditItem,
      ConfirmDialog
    },
    validations: {
      newItem: {
        partnumber: {
          required,
          maxLength: maxLength(20)
        },
        title: {
          required,
          maxLength: maxLength(150)
        },
        price: {
          required,
          maxLength: maxLength(10),
          floatValidator
        },
        quantity: {
          required,
          maxLength: maxLength(6),
          numeric
        }
      }
    },
    data: () => ({
      items: [],
      pagination: {},
      page: 1,
      test: '',
      maxPage: null,
      isNew: false,
      newItem: {},
      newItemTemplate: {isNew: true, id: 0, title: 'Новый объект', partnumber: '', price: '1.0', quantity: '1', images: []},
      shiftedItem: {},
      itemId: 0,
      headers: [
          {text: 'Артикул', align: 'center', sortable: false, value: 'partnumber', width: '20%', fixed: true},
          {text: 'Фото', sortable: false, value: 'photo', width: '10%'},
          {text: 'Наименование', align: 'center', sortable: false, value: 'title', width: '40%', fixed: true},
          {text: 'Цена', value: 'price', width: '10%', sortable: false, fixed: true},
          {text: 'Кол-во', value: 'quantity', width: '10%', sortable: false, fixed: false},
          {text: '', value: 'actions', sortable: false, width: '10%', fixed: false}
      ]
    }),
    methods: {
      async loadPage (page) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        this.isNew = false
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/' + page.toString(),
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.maxPage = resp.data.maxPage
            this.items = resp.data.items
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async  getPages () {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/getPages',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
         .then(resp => {
           this.maxPage = resp.data
           return resp
         })
         .catch(err => {
           this.$store.commit('setError', err)
           return err
         })
      },
      deleteFromArray (id) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].id === id) {
            this.items.splice(i, 1)
          }
        }
      },
      // async getItemFromRest (id) {
      //   return await Vue.prototype.$http({
      //     url: config.API_URL + '/rest/items/item/'+id,
      //     data: id,
      //     method: 'POST',
      //     headers: {'Content-Type': 'application/json'}})
      //     .then(resp => {
      //       // this.deleteFromArray(id)
      //       // this.$store.commit('setInfo', resp.data)
      //       this.loadPage(this.page).then(
      //
      //       ).catch((err)=>{
      //         this.$store.commit('setError', err)
      //       })
      //
      //     })
      //     .catch(err => {
      //       this.$store.commit('setError', err)
      //     })
      // },
      deleteItem (item) {
        this.$refs.confirm.open('Удаление Товара', 'Вы уверены что хотите удалить?', { color: 'green' }).then(
          (confirm) => {
            if (confirm) {
              this.$store.commit('clearError')
              this.$store.commit('setLoading', true)
              this.$store.commit('clearInfo')
              this.deleteItemFromRest(item.id).then(() => {
                console.log('yes')
                this.getPages().then(() => {
                  if (this.items.length === 1) {
                    this.page = this.page - 1
                    // this.deleteFromArray(id)
                  } else {
                    this.$store.commit('setLoading', false)
                  }
                  this.loadPage(this.page)
                }).catch((err2) => {
                  this.$store.commit('setError', err2)
                  this.newItem.isNew = true
                  this.$store.commit('setLoading', false)
                })
              }
              ).catch((err) => {
                this.$store.commit('setError', err)
                this.$store.commit('setLoading', false)
              }
              )
            }
          })
      },
      async deleteItemFromRest (id) {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/item/delete',
          data: id,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      saveItem (item) {
        let editedItemId = this.items.findIndex(value => value.id === item.id)
        this.items[editedItemId].title = item.title
        this.items[editedItemId].quantity = item.quantity
        this.items[editedItemId].price = item.price
        this.items[editedItemId].images = item.images
        this.items[editedItemId].partnumber = item.partnumber
      },
      editItem (item) {
        // let element = this.$refs.editItem.$el.modal('show')
        this.isNew = false
        this.itemId = item.id
        this.$modal.show('modalEdit')
      },
      createNewItem () {
        this.isNew = true
        this.items.unshift(this.newItemTemplate)
        this.newItem = this.newItemTemplate
        this.newItem = JSON.parse(JSON.stringify(this.newItemTemplate))
      },
      saveNewItem () {
        this.$v.newItem.partnumber.$touch()
        this.$v.newItem.title.$touch()
        this.$v.newItem.price.$touch()
        this.$v.newItem.quantity.$touch()
        if (!this.$v.newItem.partnumber.$error && !this.$v.newItem.title.$error &&
            !this.$v.newItem.price.$error && !this.$v.newItem.quantity.$error) {
          let itemShort = { partnumber: this.newItem.partnumber,
            title: this.newItem.title,
            price: this.newItem.price,
            quantity: this.newItem.quantity}

          this.$store.commit('setLoading', true)
          this.$store.commit('clearError')
          this.$store.commit('clearInfo')
          this.createNewItemRest(itemShort).then(resp => {
            console.log(resp)
            this.getPages().then(() => {
              this.newItem.isNew = false
              this.newItem.id = resp.id
              this.items.splice(0, 1)
              this.items.unshift(this.newItem)
              this.newItem = null
              this.isNew = false
              this.$store.commit('setInfo', resp.message)
              this.$store.commit('setLoading', false)
            }).catch((err2) => {
              this.$store.commit('setError', err2)
              this.$store.commit('setLoading', false)
              this.newItem.isNew = true
            })
          }).catch(err => {
            this.$store.commit('setError', err.response.data)
            this.$store.commit('setLoading', false)
            this.newItem.isNew = true
          })
        }
      },
      cancelSaveNewItem () {
        this.items.splice(0, 1)
        this.newItem = null
        this.isNew = false
      },
      async createNewItemRest (itemShort) {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/add',
          data: itemShort,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            return resp.data
          })
          .catch(err => {
            return err
          })
      },
      // async createNewEmptyItemRest () {
      //   return await Vue.prototype.$http({
      //     url: config.API_URL + '/rest/items/createEmptyItem',
      //     method: 'GET',
      //     headers: {'Content-Type': 'application/json'}})
      //     .then(resp => {
      //       return resp.data
      //     })
      //     .catch(err => {
      //       return err
      //     })
      // },
      log () {
      },
      firstImage (item) {
        if (item.images[0] !== undefined) {
          return config.API_URL + config.IMAGES_DIR + item.images[0].src + '?' + new Date().getTime()
        } else return ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      }

    },
    created () {
      this.loadPage(1)
    }
  }
</script>

<style>

  .imageStyle {
    width: 30px;
  }

  table {
    width: 100%;
    table-layout: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 0 0px;
  }


  .modalStyle {
    width: 100%;
  }

  .inputstyle {
    box-shadow: none;
    text-overflow: ellipsis;
    border-radius: 0;
    padding: 0 9px;
    height: 30px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 16px;
    color: #000;
    width: 100%;
    transition: .3s;
    outline: none;
  }

  .border_normal {
    border: 1px solid #dfdfdf;
  }
  .border_error {
    border: 1px solid #df3f41;
  }
  .width10 {
    width: 10%;
  }

  .width15 {
    width: 15%;
  }
  .width20 {
    width: 20%;
    padding: 0 0px;
  }
  .width40 {
    width: 40%;
  }

  .width50 {
    width: 50%;
  }

  /*td:nth-child(1),*/
  /*td:nth-child(3) {*/
    /*width: 25%;*/
  /*}*/
  /*td:nth-child(2) {*/
    /*width: 50%;*/
  /*}*/
</style>
