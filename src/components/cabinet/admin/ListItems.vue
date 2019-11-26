<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="ma-0 pa-0">
    <v-switch v-model="filterSwitch" class="ma-2" label="Поиск" color="green" @click="onFilterSwitchClick"></v-switch>
    <div v-if="filterSwitch">
        <v-container  class="ml-4 pa-0">
          <v-layout>
            <v-flex class="width30"><span>Поиск</span></v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="width30 ma-1 mr-4">
              <label>Артикул:</label>
              <input    class="inputstyle" v-model.trim="filter.partnumber" >
            </v-flex>
            <v-flex class="width30 ma-1 mr-4">
              <label>Наименование:</label>
              <input    class="inputstyle" v-model.trim="filter.title" >
            </v-flex>
            <v-flex class="width30 ma-1 mr-4">
              <v-autocomplete
                label="Производитель"
                color="green"
                v-model="filter.brandId"
                :loading="autocompliteBrand.brandLoading"
                :items="autocompliteBrand.brands"
                :search-input.sync="searchBrand"
                item-text="name"
                item-value="id"
                no-data-text="Нет данных"
                rounded
                deletable-chips
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="width30 ma-1 mr-4">
              <v-autocomplete
                label="Категория"
                color="green"
                v-model="filter.categoryId"
                :loading="autocompliteCategory.categoryLoading"
                :items="autocompliteCategory.categories"
                :search-input.sync="searchCategory"
                item-text="name"
                item-value="id"
                no-data-text="Нет данных"
                rounded
              ></v-autocomplete>
            </v-flex>
            <v-flex class="width30 ma-1 mr-4">
                <label>Цена от:</label>
                <!--<input    class="inputstyle" v-model.trim="filter.priceIn" >-->
                <!--<vue-numeric-input  v-model="filter.priceIn" :min="0" :max="99999999.99"  step="1,2" :precision="2"></vue-numeric-input>-->
              <vue-numeric class="inputstyle" separator=" " v-model="filter.priceIn"  thousand-separator=" " decimal-separator="."
                           :empty-value="0" :min="0" :max="99999999.99" :precision="2"></vue-numeric>
            </v-flex>
            <v-flex class="width30 ma-1 mr-4">
              <label>  Цена до:</label>
              <!--<input    class="inputstyle" v-model.trim="filter.priceOut">-->
              <vue-numeric class="inputstyle" separator=" " v-model="filter.priceOut"  thousand-separator=" " decimal-separator="."
                           :empty-value="0" :min="0" :max="99999999.99" :precision="2"></vue-numeric>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="width25 ma-1 mr-4">
              <v-switch v-model="filter.activity" class="ma-2" label="Активность" color="green"></v-switch>
            </v-flex>
            <v-flex class="width25 ma-1 mr-4">
              <v-switch v-model="filter.saleshit" class="ma-2" label="Хитпродаж" color="green"></v-switch>
            </v-flex>
            <v-flex class="width25 ma-1 mr-4">
              <v-switch v-model="filter.newItem" class="ma-2" label="Новинка" color="green"></v-switch>
            </v-flex>
            <v-flex class="width25 ma-1 mr-4">
              <v-switch v-model="filter.promotion" class="ma-2" label="Продвижение" color="green"></v-switch>
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex class="width70"></v-flex>
            <v-flex class="width30">
              <v-btn color="green darken-1"
                     @click.native="findItems"
                     :loading="loading"
                     :disabled="!findValid"
                     :dark="findValid"
                     :class="{'form_submit_disabled': !findValid}"
              >Найти
              </v-btn>
            </v-flex>
          </v-layout>

        </v-container>
    </div>
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
          <template v-slot:items="props"   class="">
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
                        @input="changePage(page)"

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
      findValid: true,
      searchBrand: null,
      searchCategory: null,
      autocompliteBrand: {brandLoading: null, brands: []},
      autocompliteCategory: {categoryLoading: null, categories: []},
      filterSwitch: false,
      filter: {
        partnumber: '',
        title: '',
        brandId: null,
        categoryId: null,
        priceIn: '',
        priceOut: '',
        activity: false,
        saleshit: false,
        newItem: false,
        promotion: false},
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
      changePage (page) {
        if (this.filterSwitch) {
          this.filterByPage(page)
        } else {
          this.loadPage(page)
        }
      },
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
      },
      async makeBrandSearch (value, self) {
        if (!value) {
          self.autocompliteBrand.brands = []
          self.autocompliteBrand.selectedBrandId = null
        }
        self.autocompliteBrand.brandLoading = true

        await Vue.prototype.$http({
          url: config.API_URL + '/rest/brand/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            self.autocompliteBrand.brands = resp.data
            self.autocompliteBrand.brandLoading = false
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },

      async makeCategorySearch (value, self) {
        if (!value) {
          self.autocompliteCategory.brands = []
          self.autocompliteCategory.selectedCategoryId = null
        }

        self.autocompliteCategory.categoryLoading = true
        await Vue.prototype.$http({
          url: config.API_URL + '/rest/category/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            self.autocompliteCategory.categories = resp.data
            self.autocompliteCategory.categoryLoading = false
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },
      findItems () {
        this.filterByPage(1)
      },
      async filterByPage (page_) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/filter',
          data: {page: page_, filter: this.filter},
          method: 'POST',
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            if (resp.data.items != null && resp.data.items != undefined) {
              this.maxPage = resp.data.maxPage
              this.items = resp.data.items
              console.log(resp.data)
            }
            this.$store.commit('setLoading', false)
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      onFilterSwitchClick () {
        if (this.filterSwitch) {
          this.page = 1
          this.loadPage(this.page)
        } else {
          this.filter.partnumber = ""
          this.filter.title = ""
          this.filter.brandId = null
          this.filter.categoryId = null
          this.filter.priceIn = 0
          this.filter.priceOut = 0
          this.filter.activity = false
          this.filter.saleshit = false
          this.filter.newItem = false
          this.filter.promotion = false
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      }
    },
    watch: {
      searchBrand (value) {
       // value && value!= this.autocompliteBrand.selectedBrand
        this.makeBrandSearch(value, this)
      },
      searchCategory (value) {
        this.makeCategorySearch(value, this)
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
  .inputstyle2 {
    border: 1px solid #dfdfdf;
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
  .width25 {
    width: 25%;
  }
  .width30 {
    width: 30%;
  }

  .width40 {
    width: 40%;
  }
  .width50 {
    width: 50%;
  }

  .width60 {
    width: 60%;
  }
  .width70 {
    width: 70%;
  }

</style>
