<template>
  <div class="mt-4">
    <ul v-if="!loading">
      <tree-item
        class="ml-5"
        :node="treeData"
        :disable="isDisable"
        @onCancelAdd="cancelAdd"
        @onSaveAdd="saveAdd"
        @onNodeClick="onClick"
        @onDelete="deleteNode"
        @onAdd="addNode"
        @onEdit="editNode"
        @make-folder="makeFolder"
      ></tree-item>
    </ul>
    <ul v-else-if="loading">
      <div class="progressBar">
        <v-progress-circular
          :size="70"
          :width="7"
          color="green"
          indeterminate
        ></v-progress-circular>
      </div>
    </ul>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>

</template>
<script>
  import TreeItem from './Tree-Item'
  import Vue from 'vue'
  import config from '@/config/config.js'
  import ConfirmDialog from '../ConfirmDialog'
  export default {
    components: {
      TreeItem,
      ConfirmDialog
    },
    data () {
      return {
        treeData: {},
        isDisable: false
      }
    },
    methods: {
      addNode (node) {
        this.isDisable = true
        node.isOpen = true
        node.selected = false
        if (node.children == null) {
          Vue.set(node, 'children', [])
        }
        node.children.unshift({
          name: ' Новая категория',
          parentId: node.id,
          isNew: true,
          selected: true,
          edited: true,
          isOpen: true
        })
      },
      cancelAdd (node) {
        if (node.isNew) {
          this.removeItemFromTree(this.treeData.children, node)
        }
        this.isDisable = false
      },
      saveAdd (node) {
        this.isDisable = false
        if (node.isNew) {
          this.saveToRest(node.parentId, node.name)
              .then(newId => {
                node.id = newId
                console.log(node.id)
                node.isNew = false
                node.edited = false
              })
              .catch(error => {})
        } else {
          this.updateToRest(node.id, node.parentId, node.name)
            .then(() => {
              node.edited = false
            })
            .catch(error => {})
        }
      },
      makeFolder (node) {
        Vue.set(node, 'children', [])
        this.addNode(node)
      },

      removeItemFromTree (array, item) {
        for (let i = 0; i < array.length; ++i) {
          if (array[i] === item) {
            array.splice(i, 1)
          } else {
            if (array[i].children != null) {
              this.removeItemFromTree(array[i].children, item)
            }
          }
        }
      },
      deleteNode (node) {
        this.$refs.confirm.open('Удаление категории', 'Вы уверены что хотите удалить?', { color: 'green' }).then(
         (confirm) => {
           if (confirm) {
             this.removeItemFromTree(this.treeData.children, node)
             this.deleteToRest(node.id, node.parentId, node.name)
           }
         })
      },
      editNode (node) {
        this.isDisable = true
      },
      clearSelected (node) {
        node.selected = false
        if (node.edited) node.selected = true
        if (node.children != null) {
          for (let i = 0; i < node.children.length; ++i) {
            if (!node.children[i].isNew) { node.children[i].selected = false } else { node.selected = false }
            if (node.children[i].edited) node.children[i].selected = true

            if (node.children[i].children != null) {
              this.clearSelected(node.children[i])
            }
          }
        }
      },
      onClick (node) {
        this.clearSelected(this.treeData)
      },
      loadDataFromRest (array, parentId) {
        let node = {}
        let nodes = []
        let allChildren
        for (let i = 0; i < array.length; ++i) {
          if (array[i].children.length !== 0) {
            allChildren = this.loadDataFromRest(array[i].children, array[i].id)
          } else if (array[i].children.length == 0) {
            allChildren = null
          }
          node = {
            id: array[i].id,
            parentId: parentId,
            name: array[i].name,
            isNew: false,
            selected: false,
            edited: false,
            isOpen: false,
            children: allChildren
          }
          nodes.push(node)
        }
        return nodes
      },
      async saveToRest (parentId, name) {
        this.$store.commit('clearError')
        this.$store.commit('clearInfo')
        this.$store.commit('setLoading', true)
        let savedData = {
          id: 0,
          parentId: parentId,
          name: name
        }
        let newId = null
        await Vue.prototype.$http({
          url: config.API_URL + '/rest/category/save/',
          method: 'POST',
          data: savedData,
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            newId = resp.data.id
            this.$store.commit('setLoading', false)
            this.$store.commit('setInfo', resp.data.message)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })

        return newId
      },
      async updateToRest (id, parentId, name) {
        this.$store.commit('clearError')
        this.$store.commit('clearInfo')
        this.$store.commit('setLoading', true)
        let updatedData = {
          id: id,
          parentId: parentId,
          name: name
        }
        await Vue.prototype.$http({
          url: config.API_URL + '/rest/category/updatename/',
          method: 'POST',
          data: updatedData,
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            this.$store.commit('setLoading', false)
            this.$store.commit('setInfo', resp.data)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      },
      async deleteToRest (id, parentId, name) {
        this.$store.commit('clearError')
        this.$store.commit('clearInfo')
        this.$store.commit('setLoading', true)
        let deleteData = {
          id: id,
          parentId: parentId,
          name: name
        }
        await Vue.prototype.$http({
          url: config.API_URL + '/rest/category/delete/',
          method: 'POST',
          data: deleteData,
          headers: {'Content-Type': 'application/json'}})
          .then(resp => {
            this.$store.commit('setLoading', false)
            this.$store.commit('setInfo', resp.data)
          })
          .catch(err => {
            this.$store.commit('setError', err)
          })
      }
    },

    computed: {
      loading () {
        return this.$store.getters.getLoading
      }
    },
    created () {
      let tmpArray = []
      this.$store.commit('clearError')
      this.$store.commit('setLoading', true)
      Vue.prototype.$http({
        url: config.API_URL + '/rest/category/byparent/',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}})
        .then(resp => {
          tmpArray = this.loadDataFromRest(resp.data, null)
          this.treeData = tmpArray[0]
          this.$store.commit('setLoading', false)
        })
        .catch(err => {
          this.$store.commit('setError', err)
        })
    }
  }
</script>
<style scoped>
  .item {
    cursor: pointer;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: none;
  }
  .progressBar {
    margin-left: auto;
    margin-right: auto;
    width: 5px;
  }

</style>
