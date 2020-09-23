<!--suppress ALL -->
<template>
  <v-layout row class="v-height">
    <v-flex xs4>
      <v-navigation-drawer
        value="true"
        permanent
      >
        <v-list>
            <v-list-tile>
            <v-list-tile-action>
              <v-icon color="#257F0F" v-if="!removeGroupChecked">fas fa-wrench</v-icon>
              <v-icon color="red" v-if="removeGroupChecked">fas fa-wrench</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Характеристики </v-list-tile-title>
            <v-btn
              v-if="!removeGroupChecked&&editPropertyGroupId==-1"
              color="green"
              @click="createNewPropertyGroup"
              dark
              outline
              small
              class="sizeBtn pa-0 ma-0"
            >
              <v-icon color="green">add</v-icon>
            </v-btn>
            <v-btn
              v-if="removeGroupChecked&&editPropertyGroupId==-1"
              color="red"
              @click="removePropertyGroup"
              dark
              outline
              small
              class="sizeBtn pa-0 ma-0"
            >
              <v-icon color="red">remove</v-icon>
            </v-btn>

          </v-list-tile>
        </v-list>
        <v-list>
          <v-list-tile
            v-for="(propertyGroup, i) in propertyGroups"
            :key="i"
            class="tile"
          >
            <v-checkbox
              v-model="removeGroupCheckbox"
              :key="propertyGroup.id"
              :value="propertyGroup.id"
              color="red"
              @click.native="choosePropertyGroupCheckbox(i, propertyGroup.id)"
              class="flexShrink"
              :disabled="isDisableDeletedCheckbox"
            >
            </v-checkbox>
              <v-list-tile-content
                @click.prevent="chooseProperyGroup(propertyGroup.id)"
              >
                <v-list-tile-title>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <span v-if="editPropertyGroupId!=propertyGroup.id||removeGroupChecked">
                          <span class="green--text" v-if="propertyGroup.id ==  activePropertyGroupId">
                            <span class="green--text--text" v-if="!removeGroupChecked">
                            {{propertyGroup.name}}
                            </span>
                             <span class="red--text" v-if="removeGroupChecked">
                            {{propertyGroup.name}}
                            </span>
                          </span>
                          <span  v-if="propertyGroup.id !=  activePropertyGroupId"> {{propertyGroup.name}} </span>
                        </span>
                        <span v-if="editPropertyGroupId==propertyGroup.id&&!removeGroupChecked">
                          <input
                            class="inputstyle"
                            :class="{'border_error': !customValidator, 'border_normal':customValidator}"
                            v-model.trim = "editedPropertyGroupName"
                          >
                        </span>
                      </span>
                    </template>
                    <span>{{propertyGroup.name}}</span>
                  </v-tooltip>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <span v-if="editPropertyGroupId!=propertyGroup.id">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-if="!removeGroupChecked"
                        small
                        v-on="on"
                        class="mr-2 editIcon"
                        @click="editPropertyGroup(propertyGroup)"
                      >
                        edit
                      </v-icon>
                    </template>
                    <span>Изменить</span>
                  </v-tooltip>
                </span>
                <span v-if="editPropertyGroupId==propertyGroup.id">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-if="!removeGroupChecked"
                        color="red"
                        class="mr-2"
                        v-on="on"
                        small
                        @click="cancelSavePropertyGroup"
                      >
                        cancel
                      </v-icon>
                    </template>
                    <span>Отмена</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                       <v-icon
                         v-if="!removeGroupChecked"
                         small
                         color="green"
                         :disabled="!customValidator"
                         v-on="on"
                         @click="savePropertyGroup(propertyGroup)"
                       >
                         save
                       </v-icon>
                    </template>
                    <span>Сохранить</span>
                  </v-tooltip>
                </span>
              </v-list-tile-action>
          </v-list-tile>
        </v-list>

      </v-navigation-drawer>
    </v-flex>
    <v-flex xs8 ml-1>
      <v-data-table
        :headers="propertyHeaders"
        calculate-widths="true"
        dense="true"
        :items="commonProperties"
        hide-actions
        :loading="loading"
        loading-text="Данные загружаются подождите...."
        class="ml-4 mr-0 pr-0"
      >
        <template v-slot:items="props"       class="">
          <tr v-if="props.item.isNew||props.item.isEdit" class="padding1">
            <td class="text-xs-left">
              <input class="inputstyle2"
                     :class="{'border_error': !propertyValidator.name, 'border_normal':propertyValidator.name}"
                     v-model.trim = "props.item.name" @input="checkPropertyNameValidator(props.item.name)" >
            </td>
            <td class="text-xs-center">
              <input class="inputstyle2"
                     :class="{'border_error': !propertyValidator.mesure, 'border_normal':propertyValidator.mesure}"
                     v-model.trim = "props.item.mesure" @input="checkPropertyMesureValidator(props.item.mesure)" >
            </td>
            <td class="text-xs-center">
              <v-select
                color="green"
                class="v-select_class"
                item-text="aliasName"
                item-value="id"
                :items="commonPropertyValueType"
                hide-details
                v-on:change="onChangePropertyValueType"
                v-model="activePropertyValueTypeId"
              ></v-select>
            </td>
            <td class="text-xs-center">
              <input class="inputstyle2"
                     :class="{'border_error': !propertyValidator.description, 'border_normal':propertyValidator.description}"
                     v-model.trim = "props.item.description" @input="checkPropertyDescriptionValidator(props.item.description)" >

            </td>
            <td class="justify-center layout px-0 ">
              <v-icon
                small
                color="green"
                class="mr-2"
                @click="saveOrUpdateCommonProperty(props.item)"
                :disabled="!totalPropertyValidator"
              >
                save
              </v-icon>
              <v-icon
                color="red"
                small
                @click="cancelSaveOrUpdateCommonProperty(props.item)"
              >
                cancel
              </v-icon>
            </td>
          </tr>
          <tr v-else>
          <td class="text-xs-left"> {{props.item.name}} </td>
          <td class="text-xs-center">{{props.item.mesure}}</td>
          <td class="text-xs-center">{{props.item.valueType.aliasName}}</td>
          <td class="text-xs-center">{{props.item.description}}</td>
          <td class="justify-center layout px-0 ">
            <v-icon
              small
              color="green"
              class="mr-2"
              @click="editProperty(props.item)"
              :disabled = "disableEditOtherProperty"
            >
              edit
            </v-icon>
            <v-icon
              color="red"
              small
              @click="deleteProperty(props.item)"
              :disabled = "disableEditOtherProperty"
            >
              delete
            </v-icon>
          </td>
          </tr>
        </template>
        <template v-slot:headers="props">
          <th class="text-xs-left"> Наименование </th>
          <th class="text-xs-center">Ед. изм</th>
          <th class="text-xs-center">Тип</th>
          <th class="text-xs-center">Описание</th>
          <th> <v-btn
            color="green"
            @click="createNewProperty"
            dark
            outline
            small
            v-if="!disableNewPropertyButton"
            class="sizeBtn pa-0 ma-0"
          >
            <v-icon color="green">add</v-icon>
          </v-btn></th>
        </template>
      </v-data-table>
    </v-flex>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </v-layout>

</template>

<script>
  import Vue from 'vue'
  import config from '@/config/config.js'
  import ConfirmDialog from '../ConfirmDialog'
  import { uuid } from 'vue-uuid'
  export default {
    components: {
      ConfirmDialog
    },
    data: () => ({
      propertyGroups: [],
      activePropertyGroupId: 0,
      commonProperties: [],
      newCommonProperty: {id: null, propertyGroup:{ id: null, name: ''}, name: '', mesure: '', valueType: {id: null, aliasName: ''}, description: '', isNew: true, isEdit: false},
      propertyHeaders: [
        {text: 'Наименование', align: 'center', sortable: false, value: 'name', width: '30%', fixed: true},
        {text: 'Ед. изм', sortable: false, value: 'mesure', width: '7%'},
        {text: 'Тип', align: 'center', sortable: false, value: 'valueType', width: '15%', fixed: true},
        {text: 'Описание', align: 'center', sortable: false, value: 'valueType', width: '40%', fixed: true},
        {text: '', value: 'actions', sortable: false, width: '8%', fixed: false}
      ],
      removeGroupCheckbox: [],
      removeGroupChecked: false,
      editPropertyGroupId: -1,
      isNewPropertyGroup: false,
      editedPropertyGroupName: '',
      isNewCommonProperty: false,
      disableNewPropertyButton: false,
      disableEditOtherProperty: false,
      commonPropertyValueType: [],
      activePropertyValueTypeId: null,
      propertyValidator:{name: false,mesure: false, description: false},
      canselSavedProperty: null

  }),
    methods: {
      chooseProperyGroup (groupId) {
        this.disableNewPropertyButton = false
        this.disableEditOtherProperty = false
        if (this.editPropertyGroupId == -1 && !this.removeGroupChecked) {
          this.activePropertyGroupId = groupId
          this.getCommonPropertiesByGroupIdRest(groupId)
        }
      },
      editProperty (prop) {
        this.canselSavedProperty = JSON.parse(JSON.stringify(prop))
        this.clearPropertyValidation()
        this.getCommonPropertiesValueTypeRest().then(()=>{
          prop.isEdit = true
          this.disableEditOtherProperty = true
          this.activePropertyValueTypeId =  this.commonPropertyValueType.filter((valueType)=>{
            if (valueType.id == prop.valueType.id) {
              return true
            }
          })[0].id
        })
      },
      deleteProperty (property) {
        this.$refs.confirm.open('Удаление характеристики', 'Вы уверены что хотите удалить?', { color: 'green' }).then(
          (confirm) => {
            if (confirm) {
              this.deleteCommonPropertyRest(property.id).then(()=>{
                    this.removePropertyFromArray(this.commonProperties, property)
               })
            }
          })
      },
      createNewPropertyGroup () {
        this.isNewPropertyGroup = true
        let uuidId = uuid.v1()
        this.propertyGroups.unshift({id: uuidId, name: 'Новая группа'})
        this.editPropertyGroupId = uuidId
        this.editedPropertyGroupName = 'Новая группа'
      },
      createNewProperty () {
          this.disableEditOtherProperty = true
          this.getCommonPropertiesValueTypeRest().then(()=>{
            let copyProperties = JSON.parse(JSON.stringify(this.newCommonProperty))
            this.commonProperties.unshift(copyProperties)
            this.disableNewPropertyButton = true
            this.activePropertyValueTypeId=this.commonPropertyValueType[0].id
          })
      },
      onChangePropertyValueType(selectedId) {
        this.activePropertyValueTypeId = selectedId
      },
      choosePropertyGroupCheckbox (count, id) {
        if (this.removeGroupCheckbox.length == 0) {
          this.removeGroupChecked = false
        } else {
          this.removeGroupChecked = true
        }
      },
      removePropertyGroup () {
        this.$refs.confirm.open('Удаление группы', 'Вы уверены что хотите удалить?', { color: 'green' }).then(
          (confirm) => {
            if (confirm) {
              this.removePropertyGroupListRest(this.removeGroupCheckbox).then(resp => {
                this.removeElementsFromArray(this.propertyGroups, this.removeGroupCheckbox)
                this.removeGroupCheckbox = []
                this.removeGroupChecked = false
                this.commonProperties = []
              })
            }
          })
      },
      editPropertyGroup (propertyGroup) {
        this.editPropertyGroupId = propertyGroup.id
        this.editedPropertyGroupName = propertyGroup.name
      },
      savePropertyGroup (propertyGroup) {

        let savedPropertyGroup = this.propertyGroups
          .find((group) => {
            return group.id == propertyGroup.id
          })
        savedPropertyGroup.name = this.editedPropertyGroupName

        if (this.isNewPropertyGroup) {
          propertyGroup.id = null
          this.createPropertyGroupRest(propertyGroup).then((resp) => {
                propertyGroup.id = resp.data.id
                this.propertyGroups.splice(0, 1, propertyGroup)
                this.editPropertyGroupId = -1
                this.isNewPropertyGroup=false
            })
        } else {
              this.updatePropertyGroupRest(savedPropertyGroup).then((resp)=>{})
              this.editPropertyGroupId = -1
        }
      },
      cancelSavePropertyGroup () {
        if (this.isNewPropertyGroup) {
          this.propertyGroups.splice(0, 1)
        }
        this.editPropertyGroupId = -1
      },
      saveOrUpdateCommonProperty(commonProperty){
        this.disableEditOtherProperty = false
        let savedProperty = JSON.parse(JSON.stringify(commonProperty))
        savedProperty.propertyGroup.id = this.activePropertyGroupId
        savedProperty.valueType.id = this.activePropertyValueTypeId
        let activePropertyValueTypeAliasName =
          this.commonPropertyValueType.filter((valueType)=>{
            if (valueType.id == this.activePropertyValueTypeId) {
              return true
            }
          })[0].aliasName
        savedProperty.valueType.aliasName = activePropertyValueTypeAliasName
        delete savedProperty.isNew
        delete savedProperty.isEdit
        this.disableNewPropertyButton = false
        if (commonProperty.isNew) {
          this.saveNewCommonPropertyRest(savedProperty).then((resp)=>{

            commonProperty.id = resp.data.id
            commonProperty.isNew = false
            commonProperty.propertyGroup.id = this.activePropertyGroupId
            commonProperty.valueType.id = this.activePropertyValueTypeId
            commonProperty.valueType.aliasName = activePropertyValueTypeAliasName
          })
        } else if (commonProperty.isEdit) {
            this.updateCommonPropertyRest(savedProperty).then((resp)=> {
              commonProperty.isEdit = false
              commonProperty.propertyGroup.id = this.activePropertyGroupId
              commonProperty.valueType.id = this.activePropertyValueTypeId
              commonProperty.valueType.aliasName = activePropertyValueTypeAliasName
            })
        }
      },
      cancelSaveOrUpdateCommonProperty(property){
        this.disableEditOtherProperty = false
        if (property.isNew) {
          this.commonProperties.splice(0,1)
          this.disableNewPropertyButton = false
        } else if (property.isEdit) {
          //return canceled values
          this.disableEditOtherProperty = false
          property.name = this.canselSavedProperty.name
          property.mesure  =  this.canselSavedProperty.mesure
          property.valueType.aliasName = this.canselSavedProperty.valueType.aliasName
          property.description = this.canselSavedProperty.description
         //--------------
          this.disableNewPropertyButton = false
          property.isEdit = false
        }

      },
     async loadPropertyGropupsRest () {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        this.isNew = false
      return await  Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/propertygroup/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.propertyGroups = resp.data
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async updatePropertyGroupRest (propertyGroup) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/propertygroup/update',
          data: propertyGroup,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async removePropertyGroupListRest (ids) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/propertygroup/deletelist',
          data: ids,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async createPropertyGroupRest (propertyGroup) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/propertygroup/create',
          data: propertyGroup,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data.message)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
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
            this.commonProperties = this.convertToCommonProperties(resp.data)
           // this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async getCommonPropertiesValueTypeRest () {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/valuetype/all',
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.commonPropertyValueType = resp.data
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async saveNewCommonPropertyRest (property) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
       return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/create',
          data: property,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data.message)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async deleteCommonPropertyRest (propertyId) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/delete',
          data: propertyId,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      async updateCommonPropertyRest (property) {
        this.$store.commit('clearError')
        this.$store.commit('setLoading', true)
        this.$store.commit('clearInfo')
        return await Vue.prototype.$http({
          url: config.API_URL + '/rest/itemcommonproperties/update',
          data: property,
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        })
          .then(resp => {
            this.$store.commit('setInfo', resp.data)
            this.$store.commit('setLoading', false)
            return resp
          })
          .catch(err => {
            this.$store.commit('setError', err)
            return err
          })
      },
      removeElementsFromArray (array, ids) {
        for (var i = 0; i < ids.length; i++) {
          for (var j = 0; j < array.length; j++) {
            if (ids[i] == array[j].id) {
              array.splice(j, 1)
            }
          }
        }
      },
      removePropertyFromArray (array, property) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == property) {
              array.splice(i, 1)
            }
        }
      },
      checkPropertyNameValidator(propertyName) {
        this.propertyValidator.name =  propertyName.length > 0  && propertyName.length < 30
      },
      checkPropertyMesureValidator(propertyMesure) {
        this.propertyValidator.mesure =  propertyMesure.length > 0  && propertyMesure.length < 10
      },
      checkPropertyDescriptionValidator(propertyDescription) {
        this.propertyValidator.description =  propertyDescription.length > 0  && propertyDescription.length < 50
      },
      convertToCommonProperties (data){
        let newData = []
        for (let i=0;i<data.length;i++) {
          newData[i] = {
              propertyGroup: {id: this.activePropertyGroupId, name: ''},
              id: data[i].id,
              name: data[i].name,
              valueType: data[i].valueType,
              mesure: data[i].mesure,
              description: data[i].description,
              isNew: false,
              isEdit: false
            }
          }
        return newData
      },
      clearPropertyValidation () {
        this.propertyValidator.name = true
        this.propertyValidator.mesure = true
        this.propertyValidator.description = true
      }
  },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      },
      isDisableDeletedCheckbox () {
        if (this.editPropertyGroupId == -1) {
          return false
        } else {
          return true
        }
      },
      customValidator () {
        return this.editedPropertyGroupName.length > 0  && this.editedPropertyGroupName.length < 50
      },
      totalPropertyValidator (){
          return this.propertyValidator.name && this.propertyValidator.mesure && this.propertyValidator.description
      }

  },
    created () {
      this.loadPropertyGropupsRest().then(() => {
        if (this.activePropertyGroupId == 0) {
          this.activePropertyGroupId = this.propertyGroups[0].id
        }
        this.getCommonPropertiesByGroupIdRest(this.activePropertyGroupId)
      })
    }


  }
</script>

<style scoped>

  .sizeBtn {
    width: 24px;
    height: 24px;
    max-width: 24px;
    min-width: 24px;
  }


  .flexShrink {
    flex: 0 0 auto;
  }
  .checkboxlabel {
    font-size: 14px;
    font-weight: 500;
    font-family: Roboto,sans-serif;
    color: rgba(0, 0, 0, 0.84);
  }

  .v-label {
    font-size: 10px;
    font-weight: 500;
    font-family: Roboto,sans-serif;

  }

  .v-margin {
    margin-left: 40%;
    margin-bottom: 10px;
  }
  .v-height {
    height: auto;
  }

  .inputstyle {
    box-shadow: none;
    text-overflow: ellipsis;
    border-radius: 0;
    padding: 0 9px;
    height: 95%;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 12px;
    color: #000;
    width: 100%;
    transition: .3s;
    outline: none;
  }

  .inputstyle2 {
    box-shadow: none;
    text-overflow: ellipsis;
    border-radius: 0;
    padding: 0 9px;
    height: 70%;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 12px;
    color: #000;
    width: 100%;
    transition: .3s;
    outline: none;
  }

  tile {
    margin: 5px;
    border-radius: 4px;
  }

  .tile:hover {
    color: #000000;
    background: #eef2f3;
  }

  .tile:hover .editIcon {
    color: #4caf50;
  }

  .editIcon {
    color: white;
  }

  .border_normal {
    border: 1px solid #dfdfdf;
  }
  .border_error {
    border: 1px solid #df3f41;
  }
  .padding1 {
    padding: 0 0px;
  }

  .v-select_class{
    padding: 0;
    margin: 0;
  }
</style>
