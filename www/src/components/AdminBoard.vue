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
      <span @click="toggleBacklog" id='showBacklog' class='dropdown-button btn red'>Hide Backlog</span>
    </div>

    <div class="row" v-if="showBacklog">
      <div id="fourStroke" class="col s4 orange pendingRow" @drop="workingDrop" @dragover.prevent>Orange (four-stroke) Jobs

        <div v-for="job in fourStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id) draggable="true" @dragstart.capture="drag(job)">

          <div class="row">
            <div class="col s4">
              Age: {{job.created | age}}
            </div>
            <div class="col s4">
              Make: {{job.make}}
            </div>
            <div class="col s4">
              Model: {{job.model}}
            </div>
          </div>

        </div>
      </div>
      <div id="twoStroke" class="col s4 green pendingRow" @drop="workingDrop" @dragover.prevent>Green (two-stroke) Jobs
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)" @click=addToWorking(job._id) draggable="true" @dragstart="drag(job._id,$event)">Age: {{job.created | age}} {{job.make}} {{job.model}}</div>
      </div>
      <div id="commercial" class="col s4 blue pendingRow" @drop="workingDrop" @dragover.prevent>Commerical Jobs
        <div v-for="job in comerical(this.$root.store.state.activeJobs)" @click=addToWorking(job._id) draggable="true" @dragstart="drag(job._id,$event)">Age: {{job.created | age}} {{job.make}} {{job.model}}</div>
      </div>
    </div>

    <div class="row">
      <span @click="toggleWorking" id='showWorking' class='dropdown-button btn red'>Hide Working</span></div>

    <div class="row" v-if="showWorking">
      <div id="workingBoard" class="col s12 grey workRow" @drop.capture="workingDrop" @dragover.prevent>Jobs Being Worked On

        <div v-for="job in working(this.$root.store.state.activeJobs)" click="removeFromWorking(job._id)"><span v-bind:class="{fourStroke: job.type1 in fs_css, commercial: job.type1 in com_css, twoStroke: job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.type2=='Express'}"
            draggable="true" @dragstart="drag(job._id,$event)">{{job.created | age}}  Make:{{job.make}} Model:{{job.model}}</span></div>
      </div>
    </div>

    <!--This is the start of the parts board-->
    <div class="row">
      <span @click="togglePendingParts" id='showPendingParts' class='dropdown-button btn red'>Hide Pending Parts</span>
    </div>

    <div class="row" v-if="showPendingParts">
      <div id="pendingOrderParts" class="col s6 purple workRow" @drop="workingDrop" @dragover.prevent>Jobs for which parts need to be ordered.

        <div v-for="job in pendingOrderParts(this.$root.store.state.activeJobs)" @click=addToWorking(job._id) draggable="true" @dragstart.capture="drag(job)">Age: {{job.created | age}} Make: {{job.make}} Model: {{job.model}}</div>
      </div>
      <div id="pendingRecieveParts" class="col s6 brown workRow" @drop="workingDrop" @dragover.prevent>Jobs for which we are waiting on recieveing parts
        <div v-for="job in pendingRecieveParts(this.$root.store.state.activeJobs)" @click=addToWorking(job._id) draggable="true"
          @dragstart="drag(job._id,$event)">Age: {{job.created | age}} {{job.make}} {{job.model}}</div>
      </div>
    </div>

    <!--This is the end of the parts board-->

    <!--This is the end of the awating pickup board-->

    <div class="row">
      <span @click="togglePendingPickup" id='showPendingPickup' class='dropdown-button btn red'>Hide Pending Pickup</span></div>

    <div class="row" v-if="showPendingPickup">
      <div id="workingBoard" class="col s12 grey workRow" @drop.capture="workingDrop" @dragover.prevent>Jobs Pending Customer Pickup

        <div v-for="job in pendingPickup(this.$root.store.state.activeJobs)" click="removeFromWorking(job._id)"><span v-bind:class="{fourStroke: job.type1 in fs_css, commercial: job.type1 in com_css, twoStroke: job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.type2=='Express'}"
            draggable="true" @dragstart="drag(job._id,$event)">{{job.created | age}}  Make:{{job.make}} Model:{{job.model}}</span></div>
      </div>
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

        showBacklog: true,
        showWorking: true,
        showPendingParts: true,
        showPendingPickup: true,

        fs_css: {
          "Homeowner Walk Behind": true,
          "Homeowner Zero Turn": true,
          "Homeowner Tractor": true
        },

        com_css: {
          "Commercial Walk": true,
          "Commercial Deck": true,
          "Commercial Rider": true
        },
        ts_css: { "Handheld Power": true },

      }
    },
    methods: {
      //takes in a full array of job objects, and returns an array of only those where the type is four-stroke.
      fourStroke: function (arr_jobs) {
        //this object holds the type1 catagories that belong on the fourStroke board.
        var fs = {
          "Homeowner Walk Behind": true,
          "Homeowner Zero Turn": true,
          "Homeowner Tractor": true
        };

        this.out_array = arr_jobs.filter(function (element) {
          if ((element.type1 in fs) && element.archive == false && element.jobStatus == 'pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      twoStroke: function (arr_jobs) {
        //takes in an array of job objects, and returns an array of only those where the type is two-stroke.
        this.out_array = arr_jobs.filter(function (element) {
          //the ts object holds the catagoreis for the two stroke board. 
          var ts = { "Handheld Power": true };
          if (element.type1 in ts && element.archive == false && element.jobStatus == 'pending') { return true }
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
        var com = { "Commercial Walk": true, "Commercial Deck": true, "Commercial Rider": true }
        this.out_array = arr_jobs.filter(function (element) {
          if ((element.type1 in com) && element.archive == false && element.jobStatus == 'pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingOrderParts: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'pendingOrderParts') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingRecieveParts: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'pendingRecieveParts') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingPickup: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'pendingPickuo') { return true }
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
      removeFromWorking: function (jobId) {
        //loop through the active jobs array to find the object with this id and change the job.archive field to false        

        var arr_activeJobs = this.$root.store.state.activeJobs
        for (var i = 0; i < arr_activeJobs.length; i++) {
          var job = arr_activeJobs[i];
          if (job._id == jobId) {
            job.jobStatus = 'pending'
          }
        }
      },
      drag: function (job) {
        console.log(job)
        console.log(event)
        event.dataTransfer.setData('text/javascript', JSON.stringify(job))
      },
      workingDrop: function (ev) {
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log(job)
        // ev.preventDefault();
        // //console.debug(ev)
        // console.log()
        // var draggedJobId = ev.dataTransfer.getData("text/html")
        // console.log(draggedJobId)
        // var arr_activeJobs = this.$root.store.state.activeJobs
      },
      toggleWorking: function () {
        this.showWorking = !this.showWorking
        var buttonText = ''
        if (this.showBacklog)
        { buttonText = 'Hide Working' }
        else
        { buttonText = 'Show Working' }
        document.getElementById('showWorking').innerText = buttonText;
      },
      toggleBacklog: function () {
        this.showBacklog = !this.showBacklog
        var buttonText = ''
        if (this.showBacklog)
        { buttonText = 'Hide Backlog' }
        else
        { buttonText = 'Show Backlog' }
        document.getElementById('showBacklog').innerText = buttonText;
      },
      togglePendingParts: function () {
        this.showPendingParts = !this.showPendingParts
        var buttonText = ''
        if (this.showPendingParts)
        { buttonText = 'Hide Pending Parts' }
        else
        { buttonText = 'Show Pending Parts' }
        document.getElementById('showPendingParts').innerText = buttonText;
      },
      togglePendingPickup: function () {
        this.showPendingPickup = !this.showPendingPickup
        var buttonText = ''
        if (this.showPendingPickup)
        { buttonText = 'Hide Pending Pickup' }
        else
        { buttonText = 'Show Pending Pickup' }
        document.getElementById('showPendingPickup').innerText = buttonText;
      },
    },
    computed: {},
    filters: {
      age: function (createdInMs) {
        var now = Date.now()
        var ageInMs = now - createdInMs;
        var ageInDays = (ageInMs / (1000 * 60 * 60 * 24))
        return Math.floor(ageInDays);
      }
    },
    mounted() {
      this.$root.$data.store.actions.getActiveJobs()
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pendingRow {
    color: black;
    height: 55vh;
    overflow: auto
  }

    .workRow {
    color: black;
    height: 30vh;
    overflow: auto
  }
  
  .fourStroke {
    color: black;
    background-color: orange;
  }
  
  .twoStroke {
    background-color: green;
  }
  
  .commercial {
    background-color: cornflowerblue;
  }
  
  .sharpen {
    background-color: yellow;
  }
  
  .express {
    color: red;
  }
</style>