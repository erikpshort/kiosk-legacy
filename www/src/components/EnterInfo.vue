<template>

  <div class="enterInfo">

    <h1>{{ msg }}</h1>

    <div class="container">

      <form class="col s12" @submit.prevent="returnCompanyInfo(name, companyName, phoneNumber, streetAddress, city, state, zip, email)">
        <div class="row">
          <div class="input-field col s6 offset-s3 offset-s3">
            <input id="name" v-model="name" type="text" placeholder="Name" class="validate" required>
            <!--<label for="icon_prefix">Company name</label>-->
          </div>
        </div>



        <div class="row">
          <div class="input-field col s6 offset-s3 offset-s3">
            <input v-model="companyName" type="text" name="CompanyName" placeholder="Company Name" class="validate">
            <!--<label for="icon_prefix">Company name</label>-->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">

            <label for="phonenum">Phone Number (format: xxx-xxx-xxxx):</label><br/><br/>
            <input v-model="phoneNumber" v-if="!phone[0]" id="phonenum" type="tel" class=" validate" placeholder=" xxx-xxx-xxxx" pattern="^\d{3}-\d{3}-\d{4}$"
              required>
            <input v-model="phoneNumber" v-if="phone[0]" id="phonenum" type="tel" class=" validate" :value="phone" pattern="^\d{3}-\d{3}-\d{4}$"
              required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input v-model="streetAddress" id="icon_prefix" type="text" placeholder="Street Address" class="validate">
            <label for="icon_prefix"></label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input v-model="city" id="icon_prefix" type="text" placeholder="City" class="validate">
            <label for="icon_prefix"></label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input v-model="state" id="icon_prefix" type="text" placeholder="State" class="validate">
            <label for="icon_prefix"></label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input v-model="zip" id="icon_prefix" type="text" placeholder="Zip" class="validate">
            <label for="icon_prefix"></label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s6 offset-s3">
            <input v-model="email" id="icon_prefix" type="email" placeholder="email@email.com" class="validate" required>
            <label for="icon_prefix"></label>
          </div>
        </div>

        <div class="row">
          <button type="submit"
            class="waves-effect waves-light btn ">Submit</button>
        </div>
      </form >
    </div>

  </div>

</template>

<script>
  export default {
    name: 'EnterInfo',
    data() {
      return {
        name: '',
        companyName: null,
        phoneNumber: this.$root.$data.store.state.activePhone,
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        msg: 'Please Enter Your Information'
      }
    },
    computed: {
      phone() {
        return this.$root.$data.store.state.activePhone
      }
    },
    methods: {
      returnCompanyInfo(name, companyName, phoneNumber, streetAddress, city, state, zip, email) {
        var body = {
          name: name,
          company: companyName,
          cellPhone: phoneNumber,
          address: streetAddress,
          password: "Measure71/No//",
          city: city,
          state: state,
          zip: zip,
          email: email
        }
        var message = {
          body: "Test message from Legacy Feed and Fuel",
          to: '+1' + phoneNumber
        }
        // console.log(message.to)
        this.$root.$data.store.state.activeCustomer = body
        this.$root.$data.store.actions.register(body)
        // this.$root.$data.store.actions.sms(message);
        this.$router.push('/ConfirmCompanyInfo')
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .validate {
    font-size: 36px
  }
  /*#telephone {
    font-size: 36px;
    text-align: center;
  }*/
  
   ::-webkit-input-placeholder {
    font-size: 36px;
    color: #d0cdfa;
    text-transform: uppercase;
    text-transform: uppercase;
    text-align: center;
  }
  
  input {
    text-align: center;
  }
</style>