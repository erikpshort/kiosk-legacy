<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form class="col s12">
      <div class="row">

        <div class="input-field col s6 offset-s3">
          <label for="phonenum">Phone Number (format: ###-###-####):</label><br/><br/>
          <form @submit.prevent="phoneNum(phone)"><input id="phonenum" type="tel" class=" validate" placeholder="###-###-####" pattern="^\d{3}-\d{3}-\d{4}$" v-model="phone"></form>
        </div>
      </div>
    </form>

    <div class="row">
      <a @click.prevent="phoneNum(phone)" class="waves-effect waves-light btn">ENTER</a>
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
        console.log("Phone number entered: ", phone)
        this.$root.$data.store.state.activePhone = phone
        var newCustomer = null
        var newAdmin = null
        var hello = this.activeCustomers.forEach(customer => {
          customer.cellPhone.filter(num => {
            if (num === phone) {
              newCustomer = customer
            }
          })
        })
        var goodBye = this.activeAdmins.forEach(admin => {
          admin.cellPhone.filter(numb => {
            if (numb === phone) {
              newAdmin = admin
            }
          })
        })
        if (newCustomer != null) {
          this.$root.$data.store.state.activeCustomer = newCustomer
          return this.$router.push('ConfirmCompanyInfo')
        } else if (newAdmin != null) {
          this.$root.$data.store.state.activeAdmin = newAdmin
          return this.$router.push('AdminLogin')
        } else {
          return this.$router.push('EnterInfo')
        }
      }
    },



    // methods: {
    //   phoneNum2(phone) {
    //     for (var i = 0; i < this.activeCustomers.length; i++) {
    //       var element = this.activeCustomers[i];
    //       console.log(element)
    //       for (var e = 0; e < element.cellPhone.length; e++) {
    //         var singlePhone = element.cellPhone[e];
    //         console.log(singlePhone)
    //         if (singlePhone == phone) {
    //           this.$root.$data.store.state.activeCustomer = customer
    //           this.$root.$data.store.state.activePhone = phone
    //           console.log('1st if')
    //           return this.$router.push('ConfirmCompanyInfo')
    //         }
    //       }
    //     }
    //   },
    //   erik(phone) {
    //     var z = 0
    //     while (z < this.activeCustomers.length) {
    //       this.activeCustomers.forEach(customer => {
    //         customer.cellPhone.forEach(cellPhone => {
    //           if (cellPhone == phone) {
    //             this.$root.$data.store.state.activeCustomer = customer
    //             this.$root.$data.store.state.activePhone = phone
    //             console.log('1st if')
    //             z = this.activeCustomers.length
    //             return this.$router.push('ConfirmCompanyInfo')
    //           } else {
    //             z += 1
    //             console.log(z)
    //           }
    //         })
    //       })
    //     }
    //   },
    //   another(phone) {
    //     var x = []
    //     // this.activeCustomers.forEach(customer => {
    //     //   x.push(customer)
    //     // })
    //     this.activeCustomers.filter(function (customer) {
    //       customer.cellPhone.forEach(cellphone => {
    //         if (cellphone == phone) {
    //           return x.push(customer)
    //         } else {
    //           return
    //         }
    //       })
    //     })
    //     console.log(x)
    //   },
    //   //     phoneNum(phone) {
    //   //       console.log("Phone number entered: ", phone)
    //   //       this.activeCustomers.forEach(customer => {
    //   //         customer.cellPhone.forEach(num => {
    //   //           console.log(num)
    //   //           if (num === phone) {
    //   //             this.$root.$data.store.state.activeCustomer = customer
    //   //             this.$root.$data.store.state.activePhone = phone
    //   //             console.log('1st if')
    //   //             return this.$router.push('ConfirmCompanyInfo')
    //   //           }
    //   //           else {
    //   //           }
    //   //         })) {} else {
    //   //           console.log('3st Else')
    //   //           return this.adminPhone(phone)
    //   //         }
    //   //   })
    //   // },
    //   adminPhone(phone) {
    //     console.log("here")
    //     if (this.activeAdmins.forEach(admin => {
    //       admin.cellPhone.forEach(num => {
    //         if (num === phone) {
    //           console.log("admin if")
    //           this.$root.$data.store.state.activeAdmin = admin
    //           this.$root.$data.store.state.activePhone = phone
    //           return this.$router.push('CompanyDirectory')
    //         } else {
    //         }
    //       })
    //     })) { } else {
    //       console.log("admin else")
    //       this.$root.$data.store.state.activePhone = phone
    //       return this.$router.push('EnterInfo')
    //     }
    //   }
    // },
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