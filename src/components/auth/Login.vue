<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-2 font_settings">
          <v-card-text>
            <div class="login_title_div"> <h2 >Вход на сайт</h2></div>
            <v-form ref="form" v-model="valid" validation>
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
            </v-form>
            <div style="text-align: left; margin-left: 30px"> <a href="" class="">Забыли пароль?</a></div>
          </v-card-text>
          <v-card-actions class="ml-2 mr-2">
            <v-btn
              :class="{'form_submit_disabled': !valid, 'form_submit': valid}"
              flat
              @click="login"
              :loading="loading"
              :disabled="!valid || loading"
            >
              <span class="span_button"> Войти </span></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data () {
      return {
        password: '',
        email: '',
        valid: false,
        emailRules: [
          v => !!v || 'почта - обязательное поле',
          v => /.+@.+/.test(v) || 'Нужен потчовый адрес'
        ],
        passwordRules: [
          v => !!v || 'пароль - обязательное поле',
          v => v.length >= 3 || 'пароль должен быть больше 6-ти символов'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.getLoading
      }
    },
    methods: {
      login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', {email, password})
            .then(() => this.$router.push('/'))
            .catch()
      }

    }
  }
</script>

<style scoped>

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
  .form_submit:hover {
    background-color: #008b44;
  }

</style>
