<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="container">

    <form class="col s12">
      <div class="row">
        <div class="input-field col s6 offset-s3 offset-s3">
          <input type="text" name="CompanyName" placeholder="Company Name" class="validate">
          <!--<label for="icon_prefix">Company name</label>-->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 offset-s3">
          <input id="icon_telephone" type="tel" class="validate">
          <label for="icon_telephone">Telephone</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s6 offset-s3">
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Street Address</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s6 offset-s3">
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">City</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s6 offset-s3">
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">State</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s6 offset-s3">
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Zip</label>
        </div>
      </div>

      <div class="row">
  <button type = "submit">Submit</button>
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
        msg: 'Please Enter Your Company Information'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .placeholder {
    font-size: 36px
  }
  
  #telephone {
    font-size: 36px;
    text-align: center;
  }

::-webkit-input-placeholder {
 font-size: 14px;
 color: #d0cdfa;
 text-transform: uppercase;
 text-transform: uppercase;
 text-align: center;
}

input {text-align: center;}

</style>