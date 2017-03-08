<template>
  <div class="AdminBoard">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col s4 orange jobText">Orange (four-stroke) Jobs
        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 green jobText">Green (two-stroke) Jobs
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 blue jobText">Blue Board Goes Here</div>
    </div>

    <div class="row">
      <div class="col s12 grey jobText">Jobs Being Worked On

      </div>

    </div>



  </div>
</template>

<script>
  export default {
    name: 'adminBoard',
    data() {
      return {
        msg: 'This is the Admin Board',
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
.jobText {color:black;
height: 350px;

}





</style>