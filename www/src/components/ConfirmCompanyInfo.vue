<template>
  <div class="companyInfo">
    <!--<h1>{{ msg }}</h1>-->

  
<div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <!--<span class="card-title">Company/Person Name</span>-->
              <p>Please verify that the information below is correct.</p>
              <h4>Mary Smith</h4>
              <h4>123 Main St.</h4>
              <h4>Appleton, ID 83002</h4>
              <h4>1-847-263-5500</h4>
              <h4>msmith@aol.com</h4>
            </div>
            <div class="card-action">
              <a href="#"><router-link :to="'/ServiceRequest'">Is Correct</router-link></a>
              <a href="#"><router-link :to="'/EditInfo'">Is Not Correct</router-link></a>
            </div>
          </div>
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
        msg: 'This page shows company information for confirmation.'
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
  
  a {
    color: white;
  }

.container {
  /*display: flex;*/
/*position: absolute;*/
  /*height: 100%;
  width: 100%;*/
}

</style>