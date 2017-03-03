<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form class="col s12">
      <div class="row">

        <div class="input-field col s6 offset-s3">
          <!--<i class="material-icons prefix">phone</i>-->
          <label for="phonenum">Phone Number (format: xxx-xxx-xxxx):</label><br/><br/>
          <form @submit.prevent="phoneNum(phone)"><input id="phonenum" type="tel" class=" validate" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" v-model="phone"></form>
          <!--      <input type="tel" name="number" pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$">
          <input id="telephone" type="tel" class="validate">
          <label for="telephone"><span class="placeholder"></span></label>  -->
        </div>
      </div>
    </form>

    <div class="row">
      <a class="waves-effect waves-light btn" @click="phoneNum(phone)">ENTER</a>
      </div>
      <div class="row">
  
      <div class="row">
        <h4>or</h4>
      </div>

      <div class="row">
        <a class="waves-effect waves-light btn">
          <router-link :to="'/companyDirectory'">Find By Company Name</router-link>
        </a>
      </div>

      <div class="row">
        <a class="waves-effect waves-light btn">
          <router-link :to="'/EnterInfo'">Register as a New Customer</router-link>
        </a>
      </div>

    </div>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Please Enter Your Phone Number',
        phone: ''
      }
    },
    methods: {
      phoneNum(phone) {
        console.log(phone)
        this.activeCustomers.forEach(customer => {
          customer.cellPhone.forEach(num => {
            if (num == phone) {
              this.$root.$data.store.state.activeCustomer = customer
              return this.$router.push('/CompanyInfo')
            } else if (this.activeAdmins.forEach(admin => {
              admin.cellPhone.forEach(num => {
                if (num == phone) {
                  this.$root.$data.store.state.activeAdmin = admin
                  return this.$router.push('companyDirectory')
                }
              })
            })) { }
            else {
              this.$root.$data.store.state.activePhone = phone
              return this.$router.push('EnterInfo')
            }
          })
        })
      }
    },
    computed: {
      activeAdmins() {
        return this.$root.$data.store.state.activeAdmins
      },
      activeCustomers() {
        return this.$root.$data.store.state.activeCustomers
      },
      activeJobs() {
        return this.$root.$data.store.state.activeJobs
      }
    },
    mounted() {
      this.$root.$data.store.actions.getActiveAdmins()
      this.$root.$data.store.actions.getActiveCustomers()
      this.$root.$data.store.actions.getActiveJobs()
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