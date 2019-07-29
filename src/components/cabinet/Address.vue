<template>
<div class="pl-4">
  <header class="xf-lk__main-header">Контактные данные</header>


    <div class="progressbar_cl" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>

    </div>
    <div v-if="!loading">
      <div class="globalError"
           v-if="showError"> {{errorMessage}}
      </div>
      <div class="xf-lk__main column-center">
          <div class="xf-lk-main">
            <section class="xf-lk-contact-detail" id="tab_profile_body">

                <div class="xf-lk-contact-detail__panel">

                    <div class="xf-lk-contact-detail__group">
                        <label class="xf-lk-contact-detail__label" :class="{'text_error': $v.firstName.$error}" for="first_name">Имя</label>
                        <input name="first_name" class="xf-lk-contact-detail__input" id="first_name"
                               :class="{'border_error': $v.firstName.$error, 'border_normal':!$v.firstName.$error}"
                               v-model.trim="$v.firstName.$model">
                        <div class="myerror"
                             :class="{'text_normal': !$v.firstName.$error, 'text_error': $v.firstName.$error}"
                             v-if="!$v.firstName.required">обязательное поле
                        </div>
                      </div>

                  <div class="xf-lk-contact-detail__group">
                    <label class="xf-lk-contact-detail__label" :class="{'text_error': $v.lastName.$error}" for="last_name">Фамилия</label>
                    <input name="last_name" class="xf-lk-contact-detail__input"  id="last_name"
                           :class="{'border_error': $v.lastName.$error, 'border_normal':!$v.lastName.$error}"
                           v-model.trim="$v.lastName.$model">
                    <div class="myerror"
                         :class="{'text_normal': !$v.lastName.$error, 'text_error': $v.lastName.$error}"
                         v-if="!$v.lastName.required">обязательное поле
                    </div>
                  </div>

                  <div class="label_div">
                    <label class="xf-lk-contact-detail__label" for="birthday_div">Дата рождения</label>
                  </div>
                  <div class="xf-lk-contact-detail__group_select">
                      <div id="birthday_div" class="width20">
                        <v-select class="select_b" @input='checkDateOnSelect' :options="day" v-model="pickedDate.day"></v-select>
                      </div>
                      <div id="birthmonth_div" class="width50">
                        <v-select class="select_b" @input='checkDateOnSelect' :options="month" v-model="pickedDate.month"></v-select>
                      </div>
                      <div id="birthyear_div" class="width30">
                        <v-select class="select_b" @input='checkDateOnSelect' :options="year" v-model="pickedDate.year"></v-select>
                      </div>
                    <div class="myerror text_error"
                         v-if="dateError"> Неправильный формат даты
                    </div>
                </div>

                  <div class="xf-lk-contact-detail__group">
                    <label class="xf-lk-contact-detail__label" :class="{'text_error': $v.email.$error}" for="email_name">E-mail</label>
                    <input name="first_name" class="xf-lk-contact-detail__input" id="email_name"
                           :class="{'border_error': $v.email.$error, 'border_normal':!$v.email.$error}"
                           v-model.trim="$v.email.$model"  disabled>
                    <div class="myerror"
                         :class="{'text_normal': !$v.email.$error, 'text_error': $v.email.$error}"
                         v-if="!$v.email.required">обязательное поле
                    </div>
                    <div class="myerror"
                         :class="{'text_normal': !$v.email.$error, 'text_error': $v.email.$error}"
                         v-if="!$v.email.email">требуется адрес электронной почты
                    </div>
                  </div>

                  <div class="xf-lk-contact-detail__group">
                    <label class="xf-lk-contact-detail__label" :class="{'text_error': $v.phone.$error}" for="phone_name">Телефон</label>
                    <input name="first_name" class="xf-lk-contact-detail__input js-xf-vm-field" id="phone_name"
                           :class="{'border_error': $v.phone.$error, 'border_normal':!$v.phone.$error}"
                           v-model.trim="$v.phone.$model"
                           v-mask="'+7(999)9999999'">
                    <div class="myerror"
                         :class="{'text_normal': !$v.phone.$error, 'text_error': $v.phone.$error}"
                         v-if="!$v.phone.required"> обязательное поле
                    </div>
                    <div class="myerror"
                         :class="{'text_normal': !$v.phone.$error, 'text_error': $v.phone.$error}"
                         v-if="!$v.phone.phoneValidator"> заполните шаблон полностью
                    </div>
                  </div>

                  <div class="xf-lk-contact-detail__group _radio">
                    <div class="xf-lk-contact-detail__radio">
                      <input value="0" type="radio" id="male" name="sex" v-model="pickedSex">
                      <label for="male">Мужской</label>
                    </div>
                    <div class="xf-lk-contact-detail__radio">
                      <input value="1" type="radio" id="female" name="sex" v-model="pickedSex">
                      <label for="female">Женский</label>
                    </div>
                  </div>

                </div>
                <div class="mb-5"><button class="xf-lk-contact-detail__button js-xf-vm-submit" @click="saveUserData()">Сохранить изменения</button></div>

            </section>
          </div>
        </div>
    </div>
      </div>


</template>

<script>
  import Vue from 'vue'
  import config from '@/config/config.js'
  import { required, email, requiredUnless, maxLength } from 'vuelidate/lib/validators'
  const phoneValidator = (value) => value.replace(/[+()_]/g, '').length > 10 || value.replace(/[+()_]/g, '').length == 0

  export default {
    data () {
      return {
        day: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
          '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
       // userData: {firstName: '', lastName: '', phone: '', email: '', sex: '', birthDay: {day: '', month: '', year: ''} },
        pickedSex: 0,
        pickedDate: {day: 'дата', month: 'месяц', year: 'год'},
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneMinLength: true,
        showError: false,
        dateError: false,
        errorMessage: ''
      }
    },
    validations: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        phoneValidator
      }
    },
    methods: {

      removeSymbolseFromPhone (phone) {
        return phone.replace(/[+()_]/g, '')
      },
      checkDateOnSelect () {
        this.dateError = !this.checkDate()
      },
      saveUserData () {
        this.$v.firstName.$touch()
        this.$v.lastName.$touch()
        this.$v.email.$touch()
        this.$v.phone.$touch()
        this.dateError = !this.checkDate()
        if (!this.checkDate() || this.$v.firstName.$error ||
      this.$v.lastName.$error || this.$v.email.$error || this.$v.phone.$error) {
          this.showError = true
          this.errorMessage = 'Заполните правильно поля формы'
        } else {
          this.showError = false
        }

        if (this.showError) {

        } else {
            this.$store.dispatch('clearInfo')
            this.$store.dispatch('clearError')
            let updatedData = {
              id: this.getUser.userId,
              name: this.firstName + ' ' + this.lastName,
              phone: this.phone,
              email: this.email,
              birthday: this.pickedDate.year + '-' + this.monthToMyString(this.pickedDate.month) + '-' + this.intToMyString(this.pickedDate.day, 2),
              sex: this.pickedSex
            }
            Vue.prototype.$http({
              url: config.API_URL + '/rest/users/update',
              method: 'POST',
              data: updatedData,
              headers: {'Content-Type': 'application/json'}})
            .then(resp => {
              this.$store.commit('setInfo', resp.data)
            })
            .catch(err => {
              this.$store.commit('setError', err)
            })
        }
      },
      formatDate (date) {
        const tmpDate = date.split('-', 3)
        return {day: tmpDate[2].split('T', 2)[0], month: this.month[Number(tmpDate[1]) - 1], year: tmpDate[0]}
      },
      getFirstName (name) {
        return name.split(' ')[0]
      },
      getLastName (name) {
        return name.split(' ')[1]
      },
      monthToMyString (mymonth) {
        for (var i = 0; i <= 11; i++) {
          if (this.month[i] === mymonth) {
            return this.intToMyString(i + 1, 2)
          }
        }
      },
      intToMyString (num, size) {
        let s = num + ''
        if (s.length < size) s = '0' + s
        return s
      },
      birthDay () {
        return this.pickedDate.year + '-' + this.monthToMyString(this.pickedDate.month) + '-' + this.intToMyString(this.pickedDate.day, 2)
      },
      checkDate () {
        let arrD = this.birthDay().split('-')
        let d = new Date(arrD[0], arrD[1], arrD[2])
        if ((d.getFullYear() == arrD[0]) && (this.intToMyString(d.getMonth(), 2) == arrD[1]) && (this.intToMyString(d.getDate(), 2) == arrD[2])) {
          return true
        } else { return false }
      }

    },
    computed: {
      year () {
        var years = []
        const initYear = new Date().getFullYear()
        for (var i = 0; i < 100; i++) {
          years.push(initYear - i)
        }
        return years
      },
      loading () {
        return this.$store.getters.getLoading
      },
      getUser () {
        return this.$store.getters.getUser
      }
    },
    created () {
      this.$store.commit('clearError')
      this.$store.commit('setLoading', true)
      // const myUserId = JSON.parse(localStorage.getItem('user')).userId
      Vue.prototype.$http({url: config.API_URL + '/rest/users/' + this.getUser.userId,
        method: 'GET',
        headers: {'Content-Type': 'application/json'}})
        .then(resp => {
          this.firstName = this.getFirstName(resp.data.name)
          this.lastName = this.getLastName(resp.data.name)
          this.phone = resp.data.phone
          this.email = resp.data.email
          this.sex = resp.data.sex
          this.pickedSex = resp.data.sex
          if (resp.data.birthday != null) {
            this.pickedDate = this.formatDate(resp.data.birthday)
          }
          // setTimeout(this.$store.commit('setLoading', false), 1000);
          this.$store.commit('setLoading', false)
        })
        .catch(err => {
          this.$store.commit('setError', err)
        })

    }
  }
</script>

<style>


  .text_normal {
    color:  rgba(0,0,0,.87);
  }

  .text_error {
    color: #df3f41;
  }

  .border_normal {
    border: 1px solid #dfdfdf;
  }
  .border_error {
    border: 1px solid #df3f41;
  }


  .myerror{
    font-size: 12px;
    padding-left: 10px;
  }
  .globalError {
    font-size: 18px;
    color: #df3f41;
  }


  .progressbar_cl {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .xf-lk__main-header {
    font-size: 24px;
    line-height: 28px;
    color: #444;
    font-family: Rotonda,sans-serif;
    margin-bottom: 27px;
  }
  * {
    box-sizing: border-box;
  }

  .xf-lk-contact-detail__group {
    width: 50%;
    padding: 0 9px;
    margin-bottom: 10px;
    position: relative;
  }
  .xf-lk-contact-detail__group_select {
    position:relative;
    width: 100%;
    padding: 0 9px;
    margin: 0 -9px 24px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

  }

  .xf-lk-contact-detail__panel {
    margin: 0 -9px 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  article,
  aside,
  footer,
  header,
  nav,
  section {
    display: block;
  }

  .xf-lk-contact-detail {
    padding-top: 20px;
    padding-right: 50px;

  }

  .xf-lk-main {
    padding-left: 28px;
    min-height: 300px;
    position: relative;
  }

  .xf-lk__main {
    -ms-flex: 1;
    flex: 1;
  }

  .xf-wrapper {
    width: 1000px;
    max-width: 1000px;
    margin: auto;
    padding: 0 20px;
    position: relative;
  }

  .xf-lk {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-family: Gothic, sans-serif;
  }

  .xf {
    background-color: #fff;
    font-size: 15px;
    position: relative;
    transition: all .5s ease;
    transition-delay: 0.1s;
  }

  body {
    margin: 0;
  }

  body {
    background-color: #fff;
    overflow: visible;
    word-wrap: break-word;
  }

  html {
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body,
  html {
    height: 100%;
    min-height: 100%;
    font-size: 0px;
  }

  body {
    min-width: 320px;
    font-family: GothicBook, sans-serif;
    line-height: 1.2;
  }

  body {
    font-size: 14px;
    font-family: Gothic, sans-serif;
  }

  .xf-lk-contact-detail__label {
    font-family: Rotonda, sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 4px;
    display: inline-block;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  input {
    overflow: visible;
  }

  .xf-lk-contact-detail__input {
    box-shadow: none;
    text-overflow: ellipsis;
    border-radius: 0;
    -webkit-appearance: none;
    padding: 0 9px;
    height: 40px;

    border-radius: 3px;
    font-size: 16px;

    width: 100%;
    display: block;
    font-family: GothicBook, sans-serif;
    transition: .3s;
    outline: none;
  }

  .xf-form__tooltip {
    border: 1px solid #ff0f00;
    color: #ff0f00;
    font-size: 13px;
    padding: 9px;
    position: relative;
    background: #fff;
    border-radius: 5px;
    top: 100%;
    display: block;
    z-index: 200;
    font-style: normal;
    display: none;
    position: absolute;
    width: 100%;
    padding: 5px 9px;
    border-color: rgba(255, 15, 0, .5);
    left: 0px;
  }

  .xf-form__tooltip::before {
    border: 7px solid;
    border-color: transparent transparent #ff0f00;
    left: 14px;
  }

  .xf-form__tooltip::after,
  .xf-form__tooltip::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    bottom: 100%;
  }

  .xf-form__tooltip::after {
    border: 6px solid;
    border-color: transparent transparent #fff;
    left: 15px;
  }

  .xf-form__tooltip::before {
    opacity: 0.5;
  }

  .xf-lk-contact-detail__group .xf-form__tooltip {
    width: auto;
    max-width: calc(100% - 18px);
    left: 9px;
    top: 100%;
    margin-top: 15px;
    bottom: auto;
  }

  .width30{
    width: 30%;
  }

  .width50{
    width: 50%;
  }
  .width20{
    width: 20%;
  }

  .select_b{
    padding: 0 9px;
  }
  .label_div{
    padding: 0 9px;
  }
  .xf-lk-contact-detail__radio label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    font-size: 16px;
    line-height: 19px;
    color: #444;
    padding-left: 31px;
  }
  .xf-lk-contact-detail__group._radio {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .xf-lk-contact-detail__button {
    font-family: Rotonda,sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    background-color: #7ac143;
    border-radius: 3px;
    padding: 0;
    box-shadow: none;
    height: 40px;
    line-height: 40px;
    border: none;
    -webkit-text-emphasis: center;
    text-emphasis: center;
    margin: 0 auto;
    width: 288px;
    transition: .3s;
    display: block;
  }

  .xf-lk-contact-detail__radio {
    margin-right: 49px;
  }

</style>
