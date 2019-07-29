<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      :pagination.sync="pagination"
      class="ml-4 mr-0 pr-0 "
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
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
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Извините, но нет данных.
        </v-alert>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
    
</template>

<script>
    export default {
      data: () => ({
        pagination: {},
        headers: [

          {
          text: '',
          align: 'left',
          sortable: false,
          value: 'id'
        },
          {text: 'Артикул', sortable: true, value: 'partnumber' },
          {text: 'Фото', sortable: true, value: 'photo'},
          {text: 'Наименование', sortable: true, value: 'title'},
          {text: 'Цена', value: 'price'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Действия', value: 'actions', sortable: false}
        ],
        desserts: []
      }),
      methods: {
        initializeTable () {
          this.desserts = []
        },

        deleteItem (item) {
          const index = this.desserts.indexOf(item)
          confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        }
      },
      computed: {
        pages () {
          if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
          ) return 0

          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
      },
      created () {
        this.initializeTable()
      }
    }
</script>

<style scoped>

</style>
