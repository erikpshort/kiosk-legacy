<template>
  <div class="AdminBoard">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col s4 orange jobText">Orange (four-stroke) Jobs
        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 green jobText">Green (two-stroke) Jobs
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 blue jobText">Blue Board Goes Here</div>
    </div>

    <div class="row">
      <div class="col s12 grey jobText">Jobs Being Worked On
        <div v-for="job in working(this.$root.store.state.activeJobs)" @click=removeFromWorking(job._id)>{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
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
          if (element.type == "four Stroke" && element.archive == false) { return true }
          else { return false }
        })
        return this.out_array;
      },
      twoStroke: function (arr_jobs) {
        //console.log(arr_jobs)
        this.out_array = arr_jobs.filter(function (element) {
          if (element.type == "two Stroke" && element.archive == false) { return true }
          else { return false }
        })
        return this.out_array;
      },
      working: function (arr_jobs) {
        //console.log(arr_jobs)
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == "working") { return true }
          else { return false }
        })
        return this.out_array;
      },
      addToWorking: function (data) {
        console.log("In test function with: ", data)
        //parse through the active jobs array to find the object with this id.
        //console.log(this.$root.store.state.activeJobs)
        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          //console.log(job._id)
          if (job._id == data) {
            console.log(job)
            console.log("----")
            job.archive = 'working'
            console.log(job)

          }
        }
      },
      removeFromWorking: function (data){
        console.log("In remove from working function with: ", data)
        //parse through the active jobs array to find the object with this id.
        //console.log(this.$root.store.state.activeJobs)
        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          //console.log(job._id)
          if (job._id == data) {
            console.log(job)
            console.log("----")
            job.archive = false
            console.log(job)

          }
        }
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
  .jobText {
    color: black;
    height: 350px;
  }
</style>