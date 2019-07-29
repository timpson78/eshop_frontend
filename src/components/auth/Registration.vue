<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-2 font_settings">
          <v-card-text class="card_settings">
            <div class="login_title_div"> <h2> Регистрация на сайте</h2></div>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                color="green"
                prepend-icon="person_outline"
                name="name"
                label="Имя"
                type="text"
                v-model="name"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                color="green"
                prepend-icon="person"
                name="lastname"
                label="Фамилия"
                type="text"
                v-model="lastname"
                :rules="lastnameRules"
              ></v-text-field>
              <v-text-field
                color="green"
                prepend-icon="phone"
                name="phone"
                label="Телефон"
                placeholder="+7(___)___ ____"
                mask="+7(###)###-##-##"
                type="text"
                v-model="phone"
                :rules="phoneRules"
              ></v-text-field>
              <v-text-field
                color="green"
                prepend-icon="email"
                name="email"
                label="e-mail/почта"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                color="green"
                id="password"
                prepend-icon="lock"
                name="password"
                label="пароль"
                type="password"
                v-model="password"
                :rules="passwordRules"
                :counter="6"
              ></v-text-field>
              <v-text-field
                color="green"
                id="confirm-password"
                prepend-icon="lock"
                name="confirmpassword"
                label="повторите пароль"
                type="password"
                v-model="confirm_password"
                :rules="passwordRules"
                :counter="6"
              ></v-text-field>
              <v-checkbox
                color="green"
                class="checkbox_settings"
                label="согласен на обработку моих персональных данных"
                :rules="[v => !!v || 'Вы должны дать согласие перед регистрацией']"
                 v-model="checkPersonalData"
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions class="ml-2 mr-2">
            <v-btn
              class="form_submit"
              flat
              @click="signup"
              :loading="loading"
              :disabled="!valid || loading"
            >
              <span class="span_button"> Зарегистрироваться </span></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  import config from '@/config/config.js'
  import Vue from 'vue'

  export default {
    data () {
      return {
        checkPersonalData: true,
        loading: false,
        name: '',
        lastname: '',
        phone: '',
        password: '',
        confirm_password: '',
        email: '',
        valid: false,
        emailRules: [
          v => !!v || 'почта - обязательное поле',
          v => /.+@.+/.test(v) || 'Нужен потчовый адрес'
        ],
        passwordRules: [
          v => !!v || 'пароль - обязательное поле',
          v => v.length >= 6 || 'пароль должен быть больше 6-ти символов'
        ],
        nameRules: [
          v => !!v || 'Имя - обязательное поле'
        ],
        lastnameRules: [
          v => !!v || 'Фамилия - обязательное поле'
        ],
        phoneRules: [
          v => !!v || 'Тенлефон - обязательное поле'
        ]
      }
    },
    methods: {
      signup () {
        return new Promise((resolve, reject) => {
          this.$store.commit('clearError')
          this.$store.commit('clearInfo')
          this.$store.commit('setLoading', true)
          let fullName = this.name + ' ' + this.lastname
          let signupData = {name: fullName, email: this.email, password: this.password, phone: this.phone}
          console.log(signupData)
          Vue.prototype.$http({url: config.API_URL + '/auth/signup',
            data: signupData,
            method: 'POST',
            headers: {'Content-Type': 'application/json'}})
              .then(resp => {
                this.$store.commit('setLoading', false)
                this.$store.commit('setInfo', resp.data.message)
                resolve(resp)
              })
              .catch(err => {
                this.$store.commit('setLoading', false)
                this.$store.commit('setError', err.response.data.message)
                reject(err)
              })
        })
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
        }
      },
    components: {VueRecaptcha}
  }
</script>

<style scoped>

  .card_settings{
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .checkbox_settings label {
    font-family: Gothic,sans-serif;
    font-size: 12px;
  }

  .login_title_div {
    font-family: Gothic,sans-serif;
    position: relative;
    display: block;
    font-size: 14px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .font_settings{
    font-family: Rotonda,sans-serif;
  }
  .span_button {
    color: white;
    text-transform: none;
    font-weight: 700;
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

</style>
