<template>
<div>
  <v-layout row>
  <v-flex xs3>
    <div class="my_div_nav_menu">
      <v-navigation-drawer
        stateless
        value="true"
      >
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Домой</v-list-tile-title>
          </v-list-tile>

          <v-list-group
            prepend-icon="account_circle"
            value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Пользователи</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-group
              no-action
              sub-group
              value="true"
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>Admin</v-list-tile-title>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="(admin, i) in admins"
                :key="i"
                @click=""
              >
                <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="admin[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>

            <v-list-group
              sub-group
              no-action
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>Actions</v-list-tile-title>
                </v-list-tile>
              </template>
              <v-list-tile
                v-for="(crud, i) in cruds"
                :key="i"
                @click=""
              >
                <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud[1]"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-flex>
  <v-flex xs9>

    <!--<div v-if="activeTab==='Address'">-->
      <!--<address-tab ></address-tab>-->
    <!--</div>-->
    <!--<div v-else-if="activeTab==='ChangePassword'">-->
      <!--<change-password-tab></change-password-tab>-->
    <!--</div>-->

  </v-flex>
  </v-layout>
</div>
</template>

<script>
    export default {
        name: "LeftAdminMenu"
    }
</script>

<style scoped>

</style>
