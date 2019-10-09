<!--suppress ALL -->
<template>
  <div class="body mt-2">
  <li>
    <div
      class="namediv row"
      @click="selectNode"
      @dblclick="">
      <div v-if="node.selected">
            <v-icon v-if="isFolder&&!node.isOpen" small light color="green" @click="toggle">far fa-folder</v-icon>
            <v-icon v-if="isFolder&&node.isOpen" small light color="green" @click="toggle">far fa-folder-open</v-icon>
            <v-icon v-if="!isFolder" small color="green">fas fa-angle-right</v-icon>
             <span  v-if="!node.edited">  {{ node.name}} </span>
            <input   v-if="node.edited" v-model="node.name" class="inputstyle" @keyup.enter="saveAdd">
            <span class="ml-5"></span>
            <v-icon  v-if="node.edited" small light color="green" @click="saveAdd"  class="pl-1 pr-1">far fa-save</v-icon>
            <v-icon  v-if="node.edited"  small light color="red" @click="cancelAdd" class="pl-1 pr-1">far fa-window-close</v-icon>
            <span class="ml-5"></span>
            <span v-if="!node.edited">
              <span v-if="!disable">
                <v-icon  small light color="green" @click="addNode" class="pl-1 pr-1">fas fa-plus</v-icon>
                <v-icon  small light color="green" @click="editNode"
                         class="pl-1 pr-1">far fa-edit</v-icon>
                <v-icon  small light color="green" @click="deleteNode" class="pl-1 pr-1"
                v-if="!isRoot"> far fa-trash-alt</v-icon>
              </span>
              <span v-else-if="disable">
                <v-icon  small light color="grey" class="pl-1 pr-1">fas fa-plus</v-icon>
                <v-icon  small light color="grey" class="pl-1 pr-1" >far fa-edit</v-icon>
                <v-icon  small light color="grey" class="pl-1 pr-1" >far fa-trash-alt</v-icon>
              </span>
            </span>
      </div>
      <div v-else>
        <v-icon v-if="isFolder&&!node.isOpen" small light color="green" @click="toggle">far fa-folder</v-icon>
        <v-icon v-if="isFolder&&node.isOpen" small light color="green" @click="toggle">far fa-folder-open</v-icon>
        <v-icon v-if="!isFolder" small color="green">fas fa-angle-right</v-icon>
        {{ node.name}}
      </div>
    </div>
    <ul v-show="node.isOpen" v-if="isFolder">
      <node
        class="item"
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
        :disable="disable"
        @onCancelAdd="$emit('onCancelAdd', $event)"
        @onSaveAdd="$emit('onSaveAdd', $event)"
        @onNodeClick="$emit('onNodeClick', $event)"
        @onAdd="$emit('onAdd', $event)"
        @onDelete="$emit('onDelete', $event)"
        @onEdit="$emit('onEdit', $event)"
        @make-folder="$emit('make-folder', $event)"
      ></node>
      <!--<li class="add" @click="$emit('add-node', node)">+</li>-->
    </ul>
  </li>
  </div>
</template>

<script>
  import TreeItem from './Tree-Item'
  export default {
    name: 'node',
    components: {
      TreeItem
    },
    data () {
      return {
        tmpName: '',
        isAdd: false,
      }
    },
    props: {
      node: Object,
      disable: Boolean,
    },
    methods: {
      toggle () {
        if (this.isFolder) {
          this.node.isOpen = !this.node.isOpen
        }
      },
      makeFolder () {
        if (!this.isFolder) {
          this.$emit('make-folder', this.node)
          this.node.isOpen = true
        }
      },
      deleteNode () {
          this.$emit('onDelete', this.node)
      },
      addNode () {
        this.$emit('onAdd', this.node)
        this.isAdd = true
        this.node.selected = false
      },
      editNode () {
        this.node.edited = true
        this.tmpName = this.node.name
        this.$emit('onEdit', this.node)
      },
      saveAdd ()  {
        this.$emit('onSaveAdd', this.node)
      },
      cancelAdd () {
        this.node.name = this.tmpName
        this.node.edited = false
        this.$emit('onCancelAdd', this.node)
      },
      selectNode() {
        this.$emit('onNodeClick', this.node)
        if (!this.isAdd) {
          this.node.selected = true
          // if (this.node.id !== 0) {
          //   this.node.selected = true
          // }
        }
        this.isAdd = false
      }
    },
    computed: {
      isFolder () {
        return this.node.children &&
            this.node.children.length
      },
      isRoot () {
        return this.node.parentId == null
      }

    },
    created () {
      this.node.isOpen = true
    }
  }
</script>

<style scoped>
  .body {
    font-family: Rotonda,sans-serif;
    font-size: 16px;
    color: #444;
  }
  .row {

    height: 30px;
  }
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: none;
  }
  .namediv{

  }
  .namediv:hover  {
    background: #e7f1e0;
  }
  .inputstyle{
    box-shadow: none;
    text-overflow: ellipsis;
    border-radius: 0;
    padding: 0 9px;
    height: 30px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 16px;
    color: #000;
    width: 50%;
    transition: .3s;
    outline: none;
  }
</style>
