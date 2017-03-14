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
        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>id: {{job._id}} {{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 green jobText">Green (two-stroke) Jobs
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>id: {{job._id}} {{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
      <div class="col s4 blue jobText">Blue Board Goes Here

        <div v-for="job in comerical(this.$root.store.state.activeJobs)" @click=addToWorking(job._id)>id: {{job._id}} {{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 grey jobText">Jobs Being Worked On
        <div v-for="job in working(this.$root.store.state.activeJobs)" @click=removeFromWorking(job._id)><span v-bind:class="{fourStroke: job.type1 in fs_css, commercial: job.type1 in com_css, twoStroke: job.type1 in ts_css, sharpen: job.type1=='Sharpen'}">{{job._id}} Make:{{job.make}} Model:{{job.model}} Notes:{{job.customerNotes}}</span></div>
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
        fs_css : {
          "Homeowner Walk Behind":true, 
          "Homeowner Zero Turn": true,
          "Homeowner Tractor":true
        },

        com_css : {"Commercial Walk":true, 
                    "Commercial Deck":true, 
                    "Commercial Rider":true},
        ts_css : {"Handheld Power":true},

      }
    },
    methods: {
      //takes in a full array of job objects, and returns an array of only those where the type is four-stroke.
      fourStroke: function (arr_jobs) {
        //this object holds the type1 catagories that belong on the fourStroke board.
        var fs = {
          "Homeowner Walk Behind":true, 
          "Homeowner Zero Turn": true,
          "Homeowner Tractor":true};

        this.out_array = arr_jobs.filter(function (element) {
          if ((element.type1 in fs) && element.archive == false  && element.jobStatus=='pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      twoStroke: function (arr_jobs) {
      //takes in an array of job objects, and returns an array of only those where the type is two-stroke.
        this.out_array = arr_jobs.filter(function (element) {
          //the ts object holds the catagoreis for the two stroke board. 
          var ts = {"Handheld Power":true};
          if (element.type1 in ts && element.archive == false && element.jobStatus=='pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      working: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.jobStatus == "working") { return true }
          else { return false }
        })
        return this.out_array;
      },
      comerical: function (arr_jobs) {
        //the com object holds the the type1 values for the commerical board. 
        var com = {"Commercial Walk":true, "Commercial Deck":true, "Commercial Rider":true}
        this.out_array = arr_jobs.filter(function (element) {
          if ((element.type1 in com) && element.archive == false && element.jobStatus=='pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      addToWorking: function (jobId) {
        //loop through the active jobs array to find the object with the given id and change the job.status field to 'working'
        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          if (job._id == jobId) {
            job.jobStatus = 'working'            
          }
        }
      },
      removeFromWorking: function (jobId){
        //loop through the active jobs array to find the object with this id and change the job.archive field to false        

        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          if (job._id == jobId) {
            job.jobStatus = 'pending'
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
.commercial { background-color: cornflowerblue;}
.sharpen { background-color: red;}
</style>

