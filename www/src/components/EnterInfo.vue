<template>
  <div class="enterInfo">
    <h1>{{ msg }}</h1>

    <div class="container">

    <form class="col s12">
      <div class="row">
        <div class="input-field col s6 offset-s3 offset-s3">
          <input v-model="companyName" type="text" name="CompanyName" placeholder="Company Name" class="validate">
          <!--<label for="icon_prefix">Company name</label>-->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 offset-s3">
          
  <label for="phonenum">Phone Number (format: xxx-xxx-xxxx):</label><br/><br/>
  <input v-model="phoneNumber" id="phonenum" type="tel" class=" validate" placeholder=" xxx-xxx-xxxx" pattern="^\d{3}-\d{3}-\d{4}$"  >

    <!--      <input type="tel" name="number" placeholder="XXX-XXX-XXXX" pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$">
          <input id="icon_telephone" type="tel" class="validate">
          <label for="icon_telephone"></label> -->
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
      <button @click="returnCompanyInfo()" class="waves-effect waves-light btn ">Submit</button>
      </div>

    </form>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'EnterInfo',
    data() {
      return {
        msg: 'Please Enter Your Company Information',
        companyName: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    methods: {
      returnCompanyInfo : function(){
      console.log("--------------------------------")
      console.log("Company Name:", this.companyName)
      console.log("Phone Number:", this.phoneNumber)
      console.log("Street Address:", this.streetAddress)
      console.log("City", this.city)
      console.log("State:", this.state)
      console.log("Zip:", this.companyName)
      console.log("--------------------------------")
      
      } 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

input {text-align: center;}

</style>