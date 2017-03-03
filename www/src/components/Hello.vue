<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
        <form class="col s12">
      <div class="row">
    
        <div class="input-field col s6 offset-s3">
          <!--<i class="material-icons prefix">phone</i>-->
<label for="phonenum">Phone Number (format: xxx-xxx-xxxx):</label><br/><br/>
  <input id="phonenum" type="tel" class=" validate" placeholder=" xxx-xxx-xxxx" pattern="^\d{3}-\d{3}-\d{4}$"  >



     <!--      <input type="tel" name="number" pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$">
          <input id="telephone" type="tel" class="validate">
          <label for="telephone"><span class="placeholder"></span></label>  -->
        </div>
      </div>
    </form>

 <div class="row">
    <a class="waves-effect waves-light btn"><router-link :to="'/ConfirmCompanyInfo'">ENTER</router-link></a>
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
a {color: white}

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