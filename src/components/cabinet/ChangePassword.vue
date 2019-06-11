<template>
  <v-container fluid fill-width  class="ml-2">
    <header class="xf-lk__main-header ml-4 pl-4">Сменить  пароль</header>
      <v-layout  justify-left class="ml-4 pl-1">
        <v-flex xs12 sm8 class="">
            <form>
              <v-text-field
                color="green"
                prepend-icon="lock_open"
                label="старый пароль"
                type="password"
                data-vv-name="oldpassword"
                v-model="oldpassword"
                v-validate="'required'"
                :error-messages="errors.collect('oldpassword')"
                :counter="6"
              ></v-text-field>

                <v-text-field
                  color="green"
                  prepend-icon="lock"
                  label="новый пароль"
                  type="password"
                  data-vv-name="newpassword"
                  ref="newpassword"
                  v-model="newpassword"
                  v-validate="'required|min:6'"
                  :error-messages="errors.collect('newpassword')"
                  :counter="6"
                  class="mt-4"
                ></v-text-field>
                <v-text-field
                  color="green"
                  prepend-icon="lock"
                  label="повторить новый пароль"
                  type="password"
                  data-vv-name="confirm_newpassword"
                  v-model="confirm_newpassword"
                  v-validate="'required|min:6|confirmed:newpassword'"
                  :error-messages="errors.collect('confirm_newpassword')"
                  :counter="6"
                ></v-text-field>
              <v-layout align-center justify-center class="mt-4 pt-4">
                <v-flex xs12 sm8 >
                  <v-btn
                    :class="{'form_submit_disabled': !valid, 'form_submit': valid}"
                    flat
                    @click="save"
                    :loading="loading"
                    :disabled="!valid"
                  >
                      <span class="span_button">  Сохранить </span>
                  </v-btn>
                </v-flex>
                </v-layout>
            </form>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  import config from '@/config/config.js'
  import VeeValidate from 'vee-validate'
  import Vue from 'vue'
  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data () {
      return {
        oldpassword: '',
        newpassword: '',
        confirm_newpassword: '',
        loading: false,
        dictionary: {
          custom: {
            oldpassword: {
              required: () => ' пароль не может быть пустым',
              min: 'пароль должен быть   не меньше 6-ти символов'
            },
            newpassword: {
              required: () => ' пароль не может быть пустым',
              min: 'пароль должен быть   не меньше 6-ти символов'
            },
            confirm_newpassword: {
              required: () => ' пароль не может быть пустым',
              min: 'пароль должен быть   не меньше 6-ти символов',
              confirmed: 'пароли не совпадают'
            }
          }
        }
      }
    },

    methods: {
      save () {
        this.$validator.validateAll().then(
          isValid => {
            if (isValid) {
              this.$store.dispatch('clearInfo')
              this.$store.dispatch('clearError')
              let updatedData = {
                id: this.getUser.userId,
                oldPassword: this.oldpassword,
                newPassword: this.newpassword,
                confirmNewPassword: this.confirm_newpassword
              }

              console.log(updatedData)
              Vue.prototype.$http({
                url: config.API_URL + '/rest/users/updatepassword',
                method: 'POST',
                data: updatedData,
                headers: {'Content-Type': 'application/json'}
              })
                    .then(resp => {
                      this.$store.commit('setInfo', resp.data)
                      this.clearFields()
                      this.$validator.reset()
                    })
                    .catch(err => {
                      this.$store.commit('setError', err.response.data)
                      this.clearFields()
                      this.$validator.reset()
                    })
            }
          }
        ).catch(e => {
          console.log(e)
        })
      },
      clearFields () {
        this.oldpassword = ''
        this.newpassword = ''
        this.confirm_newpassword = ''
      }
    },
    computed: {
      getUser () {
        return this.$store.getters.getUser
      },
      valid () {
        return this.$validator.errors.items.length <= 0
      }
    },
    mounted () {
      this.$validator.localize('ru', this.dictionary)
    }

  }
</script>

<style scoped>

  .form_submit {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
      outline: none;
      border-radius: 3px;
      color: #fff;
      background: #7ac143;
      border: 0;
      text-align: center;
      /*transition: background .3s ease;*/
      cursor: pointer;
      font-family: Rotonda,sans-serif;
      font-weight: 700;
  }

  .xf-lk-contact-detail__label {
    font-family: Rotonda, sans-serif;
    font-size: 14px;
  }

  .form_submit_disabled {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
    outline: none;
    border-radius: 3px;
    color: #fff;
    background: #7ac143;
    border: 0;
    text-align: center;
    /*transition: background .3s ease;*/
    cursor: pointer;
    font-family: Rotonda,sans-serif;
    font-weight: 700;
    background: lightgray;
  }


</style>
