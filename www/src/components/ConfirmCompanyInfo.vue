<template>
  <div class="companyInfo">



    <div class="row">
      <div class="container" v-if="show">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <p>Please verify that the information below is correct.</p>
              <h4>{{customer.company}}</h4>
              <h4>{{customer.name}}</h4>
              <h4>{{customer.adress}}</h4>
              <h4 v-if="customer.city || customer.state">{{customer.city}}, {{customer.state}} {{customer.zip}}</h4>
              <h4 v-if="typeof activePhone == 'string'">{{activePhone}}</h4>
              <h4 v-if="typeof activePhone != 'string'"v-for="phone in activePhone">{{phone}}</h4>
              <h4>{{customer.email}}</h4>
            </div>
            <div class="card-action">
              <router-link :to="'/ServiceRequest'"><a>Is Correct</a></router-link>
              <a @click="show = !show">Is Not Correct</a>
            </div>
          </div>
        </div>
      </div>
      <div class="enterInfo" v-if="!show">
        <h5>{{ msg }}</h5>


        <div>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6 offset-s3 offset-s3">
                <input v-model="customer.name" type="text" name="Name" class="validate">
              </div>
            </div>



            <div class="row">
              <div class="input-field col s6 offset-s3 offset-s3">
                <input v-model="customer.company" type="text" name="CompanyName" class="validate">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6 offset-s3">

                <label for="phonenum">Phone Number (format: xxx-xxx-xxxx):</label><br/><br/>
                <input v-for="phone in customer.cellPhone" v-model="customer.cellPhone" type="tel" class=" validate" pattern="^\d{3}-\d{3}-\d{4}$">

              </div>
            </div>
            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input v-model="customer.address" id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix"></label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input v-model="customer.city" id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix"></label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input v-model="customer.state" id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix"></label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input v-model="customer.zip" id="icon_prefix" type="text" class="validate">
                <label for="icon_prefix"></label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6 offset-s3">
                <input v-model="customer.email" id="icon_prefix" type="email" class="validate">
                <label for="icon_prefix"></label>
              </div>
            </div>

            <div class="row">
              <button @click="putRequest(customer.name, customer.company, customer.cellPhone, customer.address, customer.city, customer.state, customer.zip, customer.email)"
                type="submit" class="waves-effect waves-light btn ">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Confirm your information',
        show: true,
      }
    },
    methods: {
      putRequest(name, company, phone, address, city, state, zip, email) {
        var body = {
          company: company,
          name: name,
          email: email,
          cellPhone: phone,
          address: address,
          state: state,
          city: city,
          zip: zip,
          _id: this.customer._id
        }
        var userId = this.customer._id
        this.$root.$data.store.state.activeCustomer = body
        this.$root.$data.store.state.activePhone = phone
        this.$root.$data.store.actions.changeUser(userId, body)
        this.show = true
      }
    },
    computed: {
      customer() {
        return this.$root.$data.store.state.activeCustomer
      },
      activePhone() {
        return this.$root.$data.store.state.activePhone
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .placeholder {
    font-size: 36px
  }
  
  .validate {
    font-size: 36px
  }
  
  #telephone {
    font-size: 36px;
    text-align: center;
  }
  
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