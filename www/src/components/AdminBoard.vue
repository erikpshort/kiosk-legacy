<!--Todo/Question List-->
<!--Are we sorting the correct fields with the fourStroke/TwoStroke Methods-->
<!--We need to change that field that add to working is using to move jobs around page-->
<!--Prusumabally we can use this field to control where (i.e. in which box a job shows)-->

<!--Need universal sort schema to perform the sorting.-->
<!--Thre seem to be new types in the store-->
<!--Relevant Fields: Created, jobStaus, type1, type2, whereAmI (?)-->
<!--How do we want these relevant fields to be used.-->

<!--Need to tie to actual data in the store.-->
<!--Is this tied correctly to actual data.-->

<!--Need to make some design decisions on the UI so not so ugly.-->
<!--Does it make sense to pull the filering functionaly into a method (drier)-->

<!--Need to add to all methods a put back to the DB so this information stays consistent-->

<template>
  <div class="AdminBoard">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col s4 orange jobText">Orange (four-stroke) Jobs
        <!--fourStroke is a method that returns a array of objects which we then v-for to display in this column.-->
        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 green jobText">Green (two-stroke) Jobs
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 blue jobText">Blue Board Goes Here</div>
    </div>
    <div class="row">
      <div class="col s12 grey jobText">Jobs Being Worked On
        <div v-for="job in working(this.$root.store.state.activeJobs)" @click=removeFromWorking(job._id)><span v-bind:class="{ fourStroke: job.type=='four Stroke', twoStroke: job.type=='two Stroke'}">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</span></div>
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
      //takes in a full array of job objects, and returns an array of only those where the type is four-stroke.
      fourStroke: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          //for the moment if element.archive = false they the job is shown in their colored board.
          //the element.archive value is set to 'working' if this job should be "moved" to the working board.
          //eventaully this flagging should be done in the jobStatus property (we don't have test objects with this field right now.)
          if (element.type == "four Stroke" && element.archive == false) { return true }
          else { return false }
        })
        return this.out_array;
      },
      twoStroke: function (arr_jobs) {
      //takes in an array of job objects, and returns an array of only those where the type is two-stroke.
        this.out_array = arr_jobs.filter(function (element) {
          if (element.type == "two Stroke" && element.archive == false) { return true }
          else { return false }
        })
        return this.out_array;
      },
      working: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == "working") { return true }
          else { return false }
        })
        return this.out_array;
      },
      addToWorking: function (jobId) {
        //loop through the active jobs array to find the object with the given id and change the job.archive field to 'working' (should use different field in future.)
        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          if (job._id == jobId) {
            job.archive = 'working'
          }
        }
      },
      removeFromWorking: function (jobId){
        //loop through the active jobs array to find the object with this id and change the job.archive field to false        
        console.log("In remove from working function with: ", jobId)
        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          if (job._id == jobId) {
            job.archive = false
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

.fourStroke { background-color: orange; }
.twoStroke { background-color: green; }
.blue { background-color: blue;}
</style>

