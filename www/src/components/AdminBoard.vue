<template>
  <div class="AdminBoard">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col s4">Orange (four-stroke) Board
        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4">Green (two-stroke) Board<div v-for="job in twoStroke(this.$root.store.state.activeJobs)">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div></div>
      <div class="col s4">Blue Board Goes Here</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'adminBoard',
    data() {
      return {
        msg: 'This is the admin Board',
      }
    },
    methods: {
      //takes in an array of job objects, and returns those where the type is four-stroke.
      fourStroke: function (arr_jobs) {
        //console.log(arr_jobs)
        this.out_array = arr_jobs.filter(function (element) {
          if (element.type == "four Stroke") { return true }
          else { return false }
        })
        return this.out_array;
      },
        twoStroke: function (arr_jobs) {
        //console.log(arr_jobs)
        this.out_array = arr_jobs.filter(function (element) {
          if (element.type == "two Stroke") { return true }
          else { return false }
        })
        return this.out_array;
      }
    },
    computed: {},
    mounted() {
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