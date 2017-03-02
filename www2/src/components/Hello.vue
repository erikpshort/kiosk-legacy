<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
        <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <!--<i class="material-icons prefix">phone</i>-->
          <input id="telephone" type="tel" class="validate">
          <label for="telephone"><span class="placeholder"></span></label>
        </div>
      </div>
    </form>

 <div class="row">
    <a class="waves-effect waves-light btn">ENTER</a>
    </div>
     <div class="row">
       <h4>or</h4>
    </div>
     <div class="row">
    <a class="waves-effect waves-light btn"><router-link :to="'/companyDirectory'">Find By Company Name</router-link></a>
    </div>

     <div class="row">
    <a class="waves-effect waves-light btn"><router-link :to="'/EnterInfo'">Register as a New Company</router-link></a>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Please Enter Your Phone Number'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.placeholder {font-size: 36px}
#telephone {font-size: 36px; text-align: center;}

</style>