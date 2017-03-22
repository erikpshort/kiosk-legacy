<template>
  <div class="companyDirectory">
    <h1>{{ msg }}</h1>
    <ul class="collection row">
      <li class="collection-item col s4 grow" v-for="company in sortCompany(customers)" @click.prevent="compPicked(company)">{{company.company}}</li>
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
    }, methods: {
      compPicked(company) {
        this.$root.$data.store.state.activePhone = company.cellPhone
        this.$root.$data.store.state.activeCustomer = company
        return this.$router.push('/ConfirmCompanyInfo')
      },
      sortCompany(arr) {
        var x = arr.sort(function (a, b) {
          var nameA = a.company.toUpperCase(); // ignore upper and lowercase
          var nameB = b.company.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        return x
      }
    },
    computed: {
      customers() {
        return this.$root.$data.store.state.activeCustomers.filter(cus => {
          if (cus.company === '' || cus.company === null) {
            return
          } else { return cus }
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
    .grow {
    font-size: 23px;
    border: 2px solid lightgrey;
  }
</style>