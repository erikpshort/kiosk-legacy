<template>
  <div class="companyInfo">


    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <p>Please verify that the information below is correct.</p>
              <h4>{{customer.company}}</h4>
              <h4>{{customer.name}}</h4>
              <h4>{{customer.adress}}</h4>
              <h4>{{customer.city}}, {{customer.state}} {{customer.zip}}</h4>
              <h4>{{activePhone}}</h4>
              <h4>{{customer.email}}</h4>
            </div>
            <div class="card-action">
              <a href="#">Is Correct</a>
              <a href="#">Is Not Correct</a>
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



  #telephone {
    font-size: 36px;
    text-align: center;
  }

  {
    color: white;
  }



  .container {
    /*display: flex;*/
    /*position: absolute;*/
    /*height: 100%;
  width: 100%;*/
  }
</style>