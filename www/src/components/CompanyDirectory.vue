<template>
  <div class="companyDirectory">
    <h1>{{ msg }}</h1>
    <ul class="collection" >
      <li class="collection-item" v-for="company in customers" @click.prevent="compPicked(company)">{{company.company}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'companyDirectory',
    data() {
      return {
        msg: 'Please Select Your Company',
      }
    },methods:{
      compPicked(company){
        this.$root.$data.store.state.activeCustomer = company
        return this.$router.push('/ConfirmCompanyInfo')
      }
    },
    computed: {
      customers() {
        return this.$root.$data.store.state.activeCustomers.filter(cus => {
          console.log(cus.company)
          if(cus.company === '' || cus.company === null){
            return
          }else{return cus}
        })
        
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
</style>