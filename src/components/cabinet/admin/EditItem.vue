<template>
  <v-container row class="ml-4 mr-0 pr-0  mt-3 containerClass">

    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
    >
      <div class="pb-4">
        <v-tab key="1"> Общие</v-tab>
        <v-tab key="2"> СЕО/ФОТО</v-tab>
        <v-tab key="3" @click="onTabPropertiesClick"> Характеристики</v-tab>
      </div>
      <v-tabs-slider></v-tabs-slider>

      <v-tab-item key="1">
        <v-layout class="containerClass">
          <v-flex xs6 class="pr-5">
            <v-text-field
              color="green"
              label="Артикул"
              data-vv-name="partnumber"
              v-model="partnumber"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('partnumber')"
              :counter="20"
            ></v-text-field>
            <v-text-field
              prepend-icon="far fa-file-alt"
              color="green"
              label="Наименование"
              data-vv-name="title"
              v-model="title"
              v-validate="'required|max:50'"
              :error-messages="errors.collect('title')"
              :counter="50"
            ></v-text-field>
            <v-textarea
              prepend-icon="far fa-comment"
              v-model="shortDescription"
              color="green"
              label="Краткое описание"
              data-vv-name="shortdescription"
              v-validate="'max:150'"
              :error-messages="errors.collect('shortdescription')"
              rows=2
              :counter="150"
            ></v-textarea>

            <v-textarea
              prepend-icon="fas fa-comment"
              v-model="description"
              color="green"
              outlined="true"
              label="Полное описание"
              data-vv-name="description"
              v-validate="'max:500'"
              :error-messages="errors.collect('description')"
              rows=3
              :counter="500"
            ></v-textarea>
            <v-select
              item-text="name"
              item-value="id"
              prepend-icon="far fa-copyright"
              color="green"
              :items="brands"
              v-model="activeBrandId"
              label="Производитель"
            >
              <template slot="selection" slot-scope="data">
                {{data.item.name}}
              </template>
              <template slot="item" slot-scope="data">
                {{data.item.name}}
              </template>

            </v-select>
          </v-flex>
          <v-flex xs6 class="pl-5">
            <v-layout class="containerClass">
              <v-flex xs5 class="">
                <v-text-field
                  color="green"
                  prepend-icon="fas fa-ruble-sign"
                  label="Цена"
                  type="text"
                  data-vv-name="price"
                  v-model="price"
                  v-validate="'max:10|regex:^\\d*\\.?\\d*$'"
                  :error-messages="errors.collect('price')"
                  :counter="10"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 class="pl-2">
                <v-text-field
                  color="green"
                  label="Кол-во"
                  type="text"
                  data-vv-name="quantity"
                  v-model="quantity"
                  v-validate="'max:6|regex:^\\d*\\.?\\d*$'"
                  :error-messages="errors.collect('quantity')"
                  :counter="6"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 class="pl-2">
                <v-select
                  color="green"
                  item-text="name"
                  item-value="id"
                  :items="mesures"
                  label="Ед.изм"
                  v-model="activeMesureId"
                ></v-select>

              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs4 class="pl-2">
                <v-text-field
                  color="green"
                  prepend-icon=""
                  label="Вес"
                  type="text"
                  data-vv-name="weight"
                  v-model="weight"
                  v-validate="'max:6|regex:^\\d*\\.?\\d*$'"
                  :error-messages="errors.collect('weight')"
                  :counter="6"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 class="pl-2">
                <v-text-field
                  color="green"
                  prepend-icon=""
                  label="скидка %"
                  type="text"
                  data-vv-name="discount"
                  v-model="discount"
                  v-validate="'max:5|regex:^\\d*\\.?\\d*$'"
                  :error-messages="errors.collect('discount')"
                  :counter="3"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 class="pl-2">
                <p> Цена со скидкой:</p>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-select
                item-text="name"
                item-value="id"
                :items="categories"
                label="Категория товара"
                color="green"
                v-model="activeCategoryId"
              >
                <template slot="selection" slot-scope="data">
                  {{data.item.name}}
                </template>
                <template slot="item" slot-scope="data">
                  <span style="color: white">{{data.item.levelStr}}</span>
                  <v-icon small light color="green">far fa-folder-open</v-icon> &nbsp;{{data.item.name}}
                </template>
              </v-select>
            </v-layout>
            <v-layout>
              <v-layout wrap justify-space-around>
                <v-switch v-model="activity" class="ma-2" label="Активность" color="green"></v-switch>
                <v-switch v-model="saleshit" class="ma-2" label="Хит продаж" color="green"></v-switch>
                <v-switch v-model="newItem" class="ma-2" label="Новинка" color="green"></v-switch>
                <v-switch v-model="promotion" class="ma-2" label="Продвижение" color="green"></v-switch>
              </v-layout>
            </v-layout>

          </v-flex>

        </v-layout>
      </v-tab-item>
      <v-tab-item key="2">
        <v-layout class="containerClass">
          <v-flex xs6 class="pr-5">
            <v-text-field
              color="green"
              prepend-icon=""
              label="CЕО URL"
              type="text"
              data-vv-name="seo_url"
              v-model="seoUrl"
              v-validate="'max:50|'"
              :error-messages="errors.collect('seoUrl')"
              :counter="50"
            ></v-text-field>
            <v-text-field
              color="green"
              prepend-icon=""
              label="CЕО заголовок"
              type="text"
              data-vv-name="seo_title"
              v-model="seoTitle"
              v-validate="'max:50|'"
              :error-messages="errors.collect('seoTitle')"
              :counter="50"
            ></v-text-field>
            <v-text-field
              color="green"
              prepend-icon=""
              label="CЕО ключевые слова"
              type="text"
              data-vv-name="seo_keywords"
              v-model="seoKeywords"
              v-validate="'max:50|'"
              :error-messages="errors.collect('seoKeywords')"
              :counter="50"
            ></v-text-field>

            <v-textarea
              prepend-icon="fas fa-comment"
              v-model="seoDescription"
              color="green"
              outlined="true"
              label="СЕО описание"
              data-vv-name="seo_description"
              v-validate="'max:300'"
              :error-messages="errors.collect('seoDescription')"
              rows=3
              :counter="300"
            ></v-textarea>
          </v-flex>
          <v-flex xs6 class="pr-5 imageClass">
            <v-container align-center align-content-center justify-center>
              <v-flex>
                <vue-upload-multiple-image
                  popup-text="Эта картинка будет отображаться по умолчанию"
                  drop-text="Оставьте свой файл здесь"
                  mark-is-primary-text="установить на главную"
                  primary-text="на главную"
                  browse-text="Загрузить файл"
                  drag-text="Перетащите картинки"
                  @before-remove="beforeRemoveImage"
                  @upload-success="imageUploadSuccess"
                  @edit-image="editImage"
                  :idUpload="idImageUpload"
                  :data-images="itemImages"
                  class="ml-5"
                >
                </vue-upload-multiple-image>
              </v-flex>
              <v-flex>
                <v-progress-linear
                  v-if="fileLoading"
                  indeterminate
                  color="green"
                ></v-progress-linear>
              </v-flex>
            </v-container>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item key="3">
        <v-layout class="containerClass">
          <v-flex xs8 class="pr-5">
            <!--<SmartVSelect :options="tmpOptions">-->
              <!--&lt;!&ndash;<template slot = "selected-option-container">&ndash;&gt;-->
              <!--&lt;!&ndash;<span>ecevece</span>&ndash;&gt;-->
              <!--&lt;!&ndash;</template>&ndash;&gt;-->

            <!--</SmartVSelect>-->
            <v-select
              item-text="name"
              item-value="id"
              :items="groupsAndCommonProperties"
              label="Характеристики"
              color="green"
              v-model="activeCommonPropertyId"
              @change="onSelectPropertiesClick"
            >
              <template slot="selection" slot-scope="data">
                 {{data.item.name}}
              </template>
              <template slot="item" slot-scope="data">
                <!--<span style="color: white">{{data.item.name}}</span>-->
                <v-icon small light color="green" v-if="data.item.type=='group'">far fa-folder-open</v-icon> &nbsp;
                {{data.item.name}}
              </template>
            </v-select>


          </v-flex>
        </v-layout>

        <v-layout class="containerClass mb-5" v-if="selectedProperty.type == 'property'&&selectedProperty.valueType.name!='LIST'" >
          <v-flex xs4 class="pr-5">
            <span>{{selectedProperty.name + ", " +selectedProperty.mesure }}</span>
          </v-flex>
          <v-flex xs5 class="pr-5">
            <input    class="inputstyle" v-model.trim="inputPropertyValue" >
          </v-flex>
          <v-flex xs3 class="pr-5">
            <v-btn color="green darken-1"
                   class="btnPropertyAdd"
                   @click.native="addPropertyValue"
                   :loading="loading"
                   :disabled="!valid"
                   :dark="valid"
                   :class="{'form_submit_disabled': !valid}"
            >Добавить
            </v-btn>
          </v-flex>
        </v-layout>
        <div class="mb-5" v-if="selectedProperty.type == 'property'&&selectedProperty.valueType.name=='LIST'" >
          <v-layout class="containerClass mb-2" >
            <v-flex xs5 class="pr-5">
              <span>{{selectedProperty.name + ", " +selectedProperty.mesure }}</span>
            </v-flex>
            <v-flex xs4 class="pr-5">
              {{ selectedProperty.description}}
            </v-flex>
            <v-flex xs3 class="pr-5">
              <v-btn color="green darken-1"
                     class="btnPropertyAdd"
                     @click.native="addPropertyListValue"
                     :loading="loading"
                     :disabled="!valid"
                     :dark="valid"
                     :class="{'form_submit_disabled': !valid}"
              >Добавить
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout >
            <v-flex xs6 class="pr-5">
              <label>Имя свойства:</label>
              <input    class="inputstyle" v-model.trim="inputPropertyValueList" >
            </v-flex>
            <v-flex xs2 class="pr-5">
              <v-btn color="green darken-1"
                     class="btnPropertyAddList mt-3"
                     @click.native="addListProperty"
                     :loading="loading"
                     :disabled="!valid"
                     :dark="valid"
                     :class="{'form_submit_disabled': !valid}"
              >+
              </v-btn>
            </v-flex>
          </v-layout>
          <div class="mt-4">
            <v-layout row v-for="j in  checkPropertiesCount" :key="j">
              <v-flex xs3 class="ma-0 pa-0 mb-0" v-for="(propertyName, i) in namePropertiesListValues" v-if="i >= (j-1)*4 && i<j*4" >
                  <v-checkbox
                    v-model="namePropertiesListValues"
                    :key="i"
                    :label="propertyName"
                    :value="propertyName" color="green"
                     class="ma-0 pa-0 mb-0">
                  </v-checkbox>
              </v-flex>

            </v-layout>
          </div>
        </div>

        <v-layout class="containerClass">
          <v-flex xs12 class="pr-5">
            <div v-for="(groupId,i) in addedGroups"
                 :key="i">
              <div class="nameGroupDiv">
                <span>{{getNamePropertyGroup(groupId)}}</span>
              </div>
              <v-layout v-for="(property, i) in gePropertiesByGroupId(groupId)" class="editPropertyClass">
                <v-flex xs4 class="pr-2">
                  {{property.itemCommonProperty.name +", "+ property.itemCommonProperty.mesure}}
                </v-flex>
                <v-flex xs6 class="pr-2">
                  {{property.value.value}}
                </v-flex>
                <v-flex xs2 class="pl-5 pr-5">
                  <v-icon small light
                          color="green"
                          @click="">
                    edit
                  </v-icon>
                  <v-icon small light
                          color="red"
                          @click="">delete</v-icon>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
    <v-spacer></v-spacer>
    <div class="ma-4 buttonDivStyle">
      <v-btn color="grey" flat="flat" @click.native="cancel">Отменить</v-btn>
      <v-btn color="green darken-1"
             @click.native="saveItem"
             :loading="loading"
             :disabled="!valid"
             :dark="valid"
             :class="{'form_submit_disabled': !valid}"
      >Сохранить
      </v-btn>
    </div>
  </v-container>

</template>


<script>
  import config from '@/config/config.js'
  import VeeValidate from 'vee-validate'
  import Vue from 'vue'
  import VueUploadMultipleImage from 'vue-upload-multiple-image'
  import SmartVSelect from '@/components/library/Smart-vselect'
  import { uuid } from 'vue-uuid'

  Vue.use(VeeValidate)

  export default {
    name: 'editItem',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      VueUploadMultipleImage,
      SmartVSelect
    },
    props: {
      isNew: Boolean,
      itemId: Number
    },
    data () {
      return {
        tmpOptions: ["ewfwefwef", "wevwevwevew"],
        fileLoading: false,
        title: '',
        partnumber: '',
        shortDescription: '',
        idImageUpload: '1',
        description: '',
        price: null,
        quantity: null,
        tab: null,
        itemImages: [],
        images: [],
        categories: [],
        activeCategoryId: null,
        mesures: [],
        activeMesureId: null,
        brands: [],
        activeBrandId: null,
        tabs: ['Общие', 'SEO', 'Характеристики'],
        weight: null,
        discount: null,
        activity: false,
        saleshit: false,
        newItem: false,
        promotion: false,
        seoUrl: '',
        seoKeywords: '',
        seoTitle: '',
        seoDescription: '',
        dictionary: {
          custom: {
            title: {
              required: () => 'Наименование не может быть пустым',
              max: 'Наименование не может быть больше 50-ти символов'
            },
            partnumber: {
              required: () => 'Артикул  не может быть пустым',
              max: 'Артикул не может быть больше 20-ти символов'
            },
            price: {
              max: 'Превышен максимум',
              regex: 'Не допустимые символы'
            },
            discount: {
              max: 'Превышен максимум',
              regex: 'Не допустимые символы'
            },
            weight: {
              max: 'Превышен максимум',
              regex: 'Не допустимые символы'
            },
            quantity: {
              max: 'Превышен максимум',
              regex: 'Не допустимые символы'
            },
            seoUrl: {
              max: 'Превышен максимум'
            },
            seoTitle: {
              max: 'Превышен максимум'
            },
            seoKeywords: {
              max: 'Превышен максимум'
            },
            seoDescription: {
              max: 'Превышен максимум'
            }

          }
        },
        groupsAndCommonProperties: [],
        activeCommonPropertyId: 0,
        selectedProperty: '',
        valueTypes: ['INTEGER', 'BOOLEAN', 'STRING', 'LIST'],
        inputPropertyValue: '',
        inputPropertyValueList: '',
        propertyMap: new Map(),
        addedGroups: [],
        namePropertiesListValues: [],
        // {id: '', itemId: '', itemCommonPropertyId: '', itemPropertyValueTypeId, value: {id:'', value:''}, values: [{id:'', value:'', active: true}]}
        itemProperties: []

      }
    },
    methods: {

      addListProperty (id) {
        this.namePropertiesListValues.unshift(this.inputPropertyValueList)
        this.inputPropertyValueList = ''
        console.log(this.namePropertiesListValues)
      },
      onSelectPropertiesClick (id) {
         this.selectedProperty = {id: null, type: 'group', valueType: {id: null, name: ''}}
        //let _selectedProperty = this.groupsAndCommonProperties.filter((el) => { if (el.id == id) { return el } })[0]
        let _selectedProperty = this.groupsAndCommonProperties.find(el =>  el.id == id )
        if (_selectedProperty.type == 'property') {
          this.selectedProperty = _selectedProperty
        }
        console.log (this.addedGroup)
      },
      async onTabPropertiesClick () {
        await this.createGroupsAndProperiesList()
      },
      async createGroupsAndProperiesList () {
        let groups
        await this.loadPropertyGropupsRest().then((grps) => {
          groups = grps
        })
        let globalId = 0
        for (let i = 0; i < groups.length; i++) {
          globalId = globalId + 1
          this.groupsAndCommonProperties.push({
            id: globalId,
            id_: groups[i].id,
            name: groups[i].name,
            type: 'group'
          })
          await this.getCommonPropertiesByGroupIdRest(groups[i].id).then((properties) => {
            for (let j = 0; j < properties.length; j++) {
              globalId = globalId + 1
              this.groupsAndCommonProperties.push({
                id: globalId,
                id_: properties[j].id,
                name: properties[j].name,
                mesure: properties[j].mesure,
                description: properties[j].description,
                group: properties[j].propertyGroup,
                type: 'property',
                valueType: properties[j].valueType
              })
            }
          })
        }
      },
      getNamePropertyGroup (id) {
        return this.groupsAndCommonProperties.filter((el)=>{ if (el.id_ == id && el.type == 'group') {return el}})[0].name
      },
      gePropertiesByGroupId (id) {
        return this.propertyMap.get(id)
      },
      addPropertyListValue () {

      },
      addPropertyValue () {
        console.log(this.selectedProperty)
        let newProperty = {
          id: null,
          itemId: this.itemId,
          itemCommonProperty: {id: this.selectedProperty.id, name: this.selectedProperty.name, mesure: this.selectedProperty.mesure},
          itemPropertyValueTypeId: this.selectedProperty.valueType.id,
          value: {id: null, value: this.inputPropertyValue},
          values: [{id: null, value: '', active: true}]
        }
        let arrayProperties = this.propertyMap.get(this.selectedProperty.group.id)
        if (arrayProperties != null) {
          let isPropertyExist = arrayProperties.filter((el) => { if (el.id == this.selectedProperty.id) { return el } }).length != 0
          if (!isPropertyExist) {
            this.selectedProperty.value = this.inputPropertyValue
            arrayProperties.unshift(newProperty)
            this.propertyMap.set(this.selectedProperty.group.id, arrayProperties)
          }
        } else {
          this.selectedProperty.value = this.inputPropertyValue
          this.inputPropertyValue =  ''
          this.propertyMap.set(this.selectedProperty.group.id, [newProperty])
        }
        //console.log(Array.from(this.propertyMap.keys()),this.propertyMap.get(this.selectedProperty.group.id))
        this.addedGroups = Array.from(this.propertyMap.keys())
        console.log(this.propertyMap.get(this.selectedProperty.group.id))
      },

      async getCommonPropertiesByGroupIdRest (groupId) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/' + groupId,
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setLoading', false)
            return resp.data
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async loadPropertyGropupsRest () {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        this.isNew = false
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/propertygroup/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setLoading', false)
            return resp.data
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      cancel () {
        this.$modal.hide('modalEdit')
      },
      saveItem () {
        let item = {
          id: this.itemId,
          title: this.title,
          shortDescription: this.shortDescription,
          description: this.description,
          seoUrl: this.seoUrl,
          price: this.price,
          quantity: this.quantity,
          discount: this.discount,
          partnumber: this.partnumber,
          weight: this.weight,
          activity: this.activity,
          salesHit: this.saleshit,
          newItem: this.newItem,
          promotion: this.promotion,
          seoMetaData: {
            id: this.itemId,
            title: this.seoTitle,
            keywords: this.seoKeywords,
            description: this.seoDescription
          },
          images: this.images,
          brand: {id: this.activeBrandId, items: null, name: ''},
          category: {
            id: this.activeCategoryId,
            name: null,
            leftKey: 0,
            rightKey: 0,
            level: 0,
            parent: null,
            children: null
          },
          mesure: {id: this.activeMesureId, name: ''}

        }
        this.$store.commit('setLoading', true)
        this.$store.commit('clearError')
        this.$store.commit('clearInfo')
        this.saveItemToRest(item).then(
          (resp) => {
            this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            this.$emit('onSave', {id: this.itemId,
              title: this.title,
              price: this.price,
              images: this.images,
              quantity: this.quantity,
              partnumber: this.partnumber})
            this.$modal.hide('modalEdit')
          })
      },
      async saveItemToRest (item) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/item/update',
          method: 'POST',
          data: item,
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err.response.data)
            this.$store.commit('setLoading', false)
          })
      },
      transformItemFromRestToLocal (item) {
        this.ItemId = item.item.id
        this.title = item.item.title
        this.shortDescription = item.item.shortDescription
        this.description = item.item.description
        this.seoUrl = item.item.seoUrl
        this.price = item.item.price
        this.quantity = item.item.quantity
        this.discount = item.item.discount
        this.partnumber = item.item.partnumber
        this.weight = item.item.weight
        this.activity = item.item.activity
        this.saleshit = item.item.salesHit
        this.newItem = item.item.newItem
        this.promotion = item.item.promotion
        this.itemImages = this.transformImages(item.item.images)
        this.seoTitle = item.item.seoMetaData.title
        this.seoKeywords = item.item.seoMetaData.keywords
        this.seoDescription = item.item.seoMetaData.description
        this.activeCategoryId = item.itemCategoryId
        this.activeBrandId = item.itemBrandId
        this.activeMesureId = item.mesureId
      },
      transformImages (images) {
        images.forEach((image) => {
          this.images.push({id: image.id, src: image.src})
          this.itemImages.push({
            path: config.API_URL + '/rest/file/images/' + image.src,
            default: 1,
            highlight: 1,
            caption: 'Загружаю....'
          })
        })
        return this.itemImages
      },
      async loadCategoryFromRest () {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/category/byparent/',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.loadCategory(resp.data[0].children)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },
      beforeRemoveImage (index, done, fileList) {
        var r = confirm('Удалить картинку?')
        if (r == true) {
          this.deleteImageFromRest(this.images[index].id, this.itemId, this.images[index].src)
          this.images.splice(index, 1)
          done()
        } else {
        }
      },
      imageUploadSuccess (formData, index, fileList) {
        this.fileLoading = true
        let fileName = Math.random().toString(36).substring(2, 15) + fileList[index].name
        this.images[index] = {id: null, src: fileName}
        formData.append('fileName', fileName)
        this.saveImageToRest(formData).then((resp) => {
          this.$store.commit('setInfo', resp.data)
          this.fileLoading = false
          this.itemImages = fileList
          this.saveItemImageFromRest(this.itemId, fileName)
        }
        ).catch((err) => {
          this.$store.commit('setError', err.response.data)
          this.fileLoading = false
        })
      },
      editImage (formData, index, fileList) {
        //  this.images[index] = {src: fileName}
        this.fileLoading = true
        let fileName = this.images[index].src
        formData.append('fileName', fileName)
        this.saveImageToRest(formData).then((resp) => {
          this.fileLoading = false
        }).catch((err) => {
        })
        this.fileLoading = false
      },
      loadCategory (array) {
        let category = {}
        for (let i = 0; i < array.length; ++i) {
          if (array[i].children.length !== 0) {
            this.loadCategory(array[i].children)
          }
          category = {
            id: array[i].id,
            level: array[i].level,
            levelStr: this.drawLevelAtCategory(array[i].level),
            name: array[i].name
          }
          this.categories.unshift(category)
        }
        return this.categories
      },
      drawLevelAtCategory (level) {
        let levelStr = ''
        for (let i = 1; i < level; ++i) {
          levelStr = levelStr + '—-'
        }
        return levelStr
      },
      async deleteImageFromRest (id, itemId, fileName) {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemimage/delete/id=' + id + '&itemId=' + itemId + '&fileName=' + fileName,
          method: 'POST',
          data: null,
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
          })
          .catch(err => {
          })
      },
      async saveItemImageFromRest (itemId, fileName) {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemimage/add/itemId=' + itemId + '&fileName=' + fileName,
          method: 'POST',
          data: null,
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
          })
          .catch(err => {
          })
      },
      async loadItemFromRest () {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/items/item/' + this.itemId,
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.transformItemFromRestToLocal(resp.data)
            this.$store.commit('setLoading', false)
          })
          .catch(err => {
            this.$store.commit('setError', err)
            this.$store.commit('setLoading', false)
          })
      },
      async loadBrandFromRest () {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/brand/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.loadBrand(resp.data)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },
      async loadMesureFromRest () {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/mesure/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.loadMesure(resp.data)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },
      loadMesure (array) {
        let mesure = {}
        for (let i = 0; i < array.length; ++i) {
          mesure = {
            id: array[i].id,
            name: array[i].name
          }
          this.mesures.unshift(mesure)
        }
        return this.brands
      },
      loadBrand (array) {
        let brand = {}
        for (let i = 0; i < array.length; ++i) {
          brand = {
            id: array[i].id,
            name: array[i].name
          }
          this.brands.unshift(brand)
        }
        return this.brands
      },
      async saveImageToRest (imageData) {
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/file/uploadFile',
          method: 'POST',
          data: imageData,
          headers: {'Content-Type': 'multipart/form-data'}
        })
          .then(resp => {
            return resp
          })
          .catch(err => {
            return err
          })
      }

    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      },
      valid () {
        return this.$validator.errors.items.length <= 0
      },
      checkPropertiesCount (){
       return  Math.round(this.namePropertiesListValues.length+1/8) + 1
      }
    },
    mounted () {
      this.$validator.localize('ru', this.dictionary)
      this.$store.commit('clearError')
      this.$store.commit('setLoading', true)
      this.loadCategoryFromRest()
      this.loadBrandFromRest()
      this.loadMesureFromRest()
      if (!this.isNew) {
        this.loadItemFromRest()
      }
    },
    updated () {

    },
    created () {

    }

  }
</script>

<style>
  .v-input--selection-controls {
    margin-bottom: 0;
  }
  .v-input__slot  {
    margin-bottom: 0;
  }
</style>

<style scoped>

  .containerClass {
    width: 100%;
  }

  .imageClass {
    display: flex;
    justify-content: center;
  }

  .buttonDivStyle {
    position: fixed;
    bottom: 10%;
    right: 10%;
  }
   .btnPropertyAdd {
     margin:0;
     padding:0;
     height: 90%;
   }
  .btnPropertyAddList {
    margin:0;
    padding:0;
    height: 30px;
    min-width: 30px;
  }
  .form_submit_disabled {

  }
  .nameGroupDiv {
    border-bottom: 1px solid rgb(150, 150, 150);
    font-weight: bold;
  }
  .editPropertyClass {
    height: 30px;
  }


</style>
