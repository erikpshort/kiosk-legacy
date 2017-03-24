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
  <div>
    <modal v-if="showModal"></modal>
    <div class="fixed">
      <div class="flexing">
        <span class="card grey darken-3 white-text grow header" v-if="!showBacklog" @click="showBacklog = !showBacklog" id='showBacklog'
          @drop.capture="workingDropBackLog" @dragover.prevent>WorkLog</span>
        <span class="card grey darken-3 white-text grow header" v-if="!showPrep" @click="showPrep=!showPrep" @drop.capture="pendingPrepDrop"
          @dragover.prevent>Prep</span>
        <span class="card grey darken-3 white-text grow header" v-if="!showWorking" @click="showWorking = !showWorking" id='showBacklog'
          @drop.capture="workingDropToDo" @dragover.prevent>In Progress</span>
        <span class="card grey darken-3 white-text grow header" v-if="!showPendingParts" @click="showPendingParts=!showPendingParts"
          @drop.capture="pendingPartsToOrderDrop" @dragover.prevent>Need to Order Parts</span>
        <span class="card grey darken-3 white-text grow header" v-if="!showPendingParts" @click="showPendingParts=!showPendingParts"
          @drop.capture="pendingPartsToReceiveDrop" @dragover.prevent>Awaiting Parts</span>
        <span class="card grey darken-3 white-text grow header" v-if="!showPendingPickup" @click="showPendingPickup=!showPendingPickup"
          @drop.capture="pendingPickupDrop" @dragover.prevent>Ready for Pickup</span>
      </div>
    </div>
    <!--this is the start of the worklog board-->
    <div class="row">
      <h4 class="col s4 offset-s4" v-if="showBacklog" @click="showBacklog = !showBacklog" @drop="workingDropBackLog" @dragover.prevent>WorkLog</h4>

    </div>
    <div class="row  card grey pendingRow" v-if="showBacklog" @drop="workingDropBackLog" @dragover.prevent>
      <div id="fourStroke space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border margin grow">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job,i) in fourStroke(activeJobs)" draggable="true" @dragstart.capture="drag(job)">

          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>

        </div>
      </div>

      <div id="twoStroke space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job, i) in twoStroke(activeJobs)" draggable="true" @dragstart="drag(job)">


          <div :class="{'row card green lighten-1 grow':classSelection2(job, i),'row card green darken-3 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>


        </div>
      </div>
      <div id="commercial space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job, i) in comerical(activeJobs)" draggable="true" @dragstart="drag(job)">
          <div :class="{'row card cyan lighten-1 grow':classSelection2(job, i),'row card cyan darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h4 class="col s4 offset-s4" v-if="showPrep" @click="showPrep = !showPrep" @drop="pendingPrepDrop" @dragover.prevent>Prep</h4>
    </div>
    <div class="row" v-if="showPrep">
      <div id="chainBladePrep" class="col s6 card grey pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="job in chainBladeJobs" draggable="true" @dragstart.capture="drag(job)">
          <div class="row card yellow grow margin">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
      <div id="pendingPartsToReceive" class="col s6 card grey pendingRow" @drop="pendingPrepDrop" @dragover.prevent>
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="job in prepJobs" draggable="true" @dragstart="drag(job)">
          <div class="row" v-bind:class="{'row card orange lighten-1 grow': job.type1 in fs_css, 'row card cyan lighten-1 grow': job.type1 in com_css, 'row card green lighten-1 grow': job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.type2=='Express'}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--this is the start of the todo board-->
    <div class="row">
      <h4 class="col s4 offset-s4" v-if="showWorking" @click="showWorking = !showWorking" @drop.capture="workingDropToDo" @dragover.prevent>In Progress</h4>
    </div>
    <div class="row card blue-grey pendingRow" v-if="showWorking" @drop.capture="workingDropToDo" @dragover.prevent>
      <div id="fourStroke space" class="col s4  pendingRow">
        <div class="row card blue-grey darken-2 white-text border margin grow">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job,i) in workingJobsFourStroke" draggable="true" @dragstart.capture="drag(job)" v-bind:class="{'row card red grow':job.type2=='Express'}">
          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>

        </div>
      </div>

      <div id="twoStroke space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job, i) in workingJobsTwoStroke" draggable="true" @dragstart="drag(job)">


          <div :class="{'row card green lighten-1 grow':classSelection2(job, i),'row card green darken-3 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>


        </div>
      </div>
      <div id="commercial space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job, i) in workingJobsCommercial" draggable="true" @dragstart="drag(job)">
          <div :class="{'row card cyan lighten-1 grow':classSelection2(job, i),'row card cyan darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--This is the start of the parts board-->
    <div class="row" @click="showPendingParts=!showPendingParts">
      <h4 class="col s4 offset-s1" v-if="showPendingParts" @drop="pendingPartsToOrderDrop" @dragover.prevent>Need to Order Parts</h4>
      <h4 class="col s4 offset-s2" v-if="showPendingParts" @drop="pendingPartsToReceiveDrop" @dragover.prevent>Awaiting Parts</h4>
    </div>

    <div class="row" v-if="showPendingParts">
      <div id="pendingPartsToOrder" class="col s6 card grey pendingRow " @drop="pendingPartsToOrderDrop" @dragover.prevent>
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="job in pendingOrderParts(activeJobs)" draggable="true" @dragstart.capture="drag(job)">
          <div class="row" v-bind:class="{'row card orange lighten-1 grow': job.type1 in fs_css, 'row card cyan lighten-1 grow': job.type1 in com_css, 'row card green lighten-1 grow': job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.type2=='Express'}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
      <div id="pendingPartsToReceive" class="col s6 card grey pendingRow" @drop="pendingPartsToReceiveDrop" @dragover.prevent>
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="job in pendingPartsToReceive(activeJobs)" draggable="true" @dragstart="drag(job)">
          <div class="row" v-bind:class="{'row card orange lighten-1 grow': job.type1 in fs_css, 'row card cyan lighten-1 grow': job.type1 in com_css, 'row card green lighten-1 grow': job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.type2=='Express'}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--This is the end of the parts board-->

    <!--This is the end of the awating pickup board-->
    <div class="row">
      <h4 class="col s4 offset-s4" v-if="showPendingPickup" @click="showPendingPickup=!showPendingPickup" @drop="pendingPickupDrop"
        @dragover.prevent>Ready for Pick-up</h4>
    </div>
    <!--Start of Pickup Board-->
    <div class="row  card grey pendingRow" v-if="showPendingPickup" @drop="pendingPickupDrop" @dragover.prevent>
      <div id="fourStroke space" class="col s4  pendingRow">
        <div class="row card blue-grey darken-2 white-text border margin grow">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job,i) in finishedJobsFourStroke" draggable="true" @dragstart.capture="drag(job)" v-bind:class="{'row card red grow':job.type2=='Express'}">


          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>

        </div>
      </div>

      <div id="twoStroke space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job,i) in finishedJobsTwoStroke" draggable="true" @dragstart="drag(job)">


          <div :class="{'row card green lighten-1 grow':classSelection2(job, i),'row card green darken-3 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>


        </div>
      </div>
      <div id="commercial space" class="col s4 pendingRow">
        <div class="row card blue-grey darken-2 white-text border grow margin">
          <div class="col s1">
            Age
          </div>
          <div class="col s5">
            Make
          </div>
          <div class="col s2">
            Job #
          </div>
          <div class="col s3">
            Model
          </div>
        </div>
        <div v-for="(job,i) in finishedJobsCommercial" draggable="true" @dragstart="drag(job)">
          <div :class="{'row card cyan lighten-1 grow':classSelection2(job, i),'row card cyan darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job._id}}
            </div>
            <div class="col s3">
              {{job.model}}
            </div>
            <div class="col s1" @click="toggleModal(job)">
              <a>+</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a id="scale-demo" class="btn-floating btn-large scale-transition" @drop.capture="archiveDrop()" @dragover.prevent>
      <i class="material-icons">archive</i>
    </a>
  </div>
</template>
<script>
  import modal from './Modal.vue'
  export default {
    name: 'adminBoard',
    components: { modal },
    sockets: {
      stateChange() {
        this.$root.$data.store.actions.stateChange()
      },
    },
    data() {
      return {
        showPrep: true,
        modalJob: {},
        showModal: false,
        msg: 'This is the Admin Board',
        showBacklog: true,
        showWorking: true,
        showPendingParts: true,
        showPendingPickup: true,
        fs_css: {
          "Homeowner Walk Behind": true,
          "Homeowner Zero Turn": true,
          "Homeowner Tractor": true,
        },
        com_css: {
          "Commercial Walk": true,
          "Commercial Deck": true,
          "Commercial Rider": true,
        },
        ts_css: { "Handheld Power": true },
      }
    },
    methods: {
      classSelection(job, i) {
        if (job.type2 == 'Express') {
          return true
        } else {
          return false
        }
      },
      classSelection2(job, i) {
        if (job.type2 != 'Express') {
          return true
        } else {
          return false
        }
      },
      toggleModal(job) {

        console.log(job.customerId)
        this.$root.store.actions.getSingleCustomer(job.customerId)
        this.$root.store.state.modalJob = job
        if (!this.showModal) {
          this.showModal = true
        } else if (this.showModal) {
          this.showModal = false
        }
      },
      //takes in a full array of job objects, and returns an array of only those where the type is four-stroke.
      fourStroke: function (arr_jobs) {
        //this object holds the type1 catagories that belong on the fourStroke board.
        var fs = {
          "Homeowner Walk Behind": true,
          "Homeowner Zero Turn": true,
          "Homeowner Tractor": true,
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
        //We will need to change this when we deal with actual data  Commercial is spelled wrong
        var com = {
          "Commercial Walk": true,
          "Commercial Deck": true,
          "Commercial Rider": true,
        }
        this.out_array = arr_jobs.filter(function (element) {
          if ((element.type1 in com) && element.archive == false && element.jobStatus == 'pending') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingOrderParts: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'pendingPartsToOrder') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingPartsToReceive: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'parts on order') { return true }
          else { return false }
        })
        return this.out_array;
      },
      pendingPickup: function (arr_jobs) {
        this.out_array = arr_jobs.filter(function (element) {
          if (element.archive == false && element.jobStatus == 'ready for pickup') { return true }
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
        //console.log("In event)
        event.dataTransfer.setData('text/javascript', JSON.stringify(job))
      },
      pendingPrepDrop() {
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        if (job.type1 != 'Sharpen') {
          job.jobStatus = 'Prep'
          console.log(job)
          this.$root.$data.store.actions.changeJob(job._id, job)
          Materialize.toast("Dropped in Prep", 5000)
        }
      },
      workingDropBackLog() {
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log("Job: ", job)
        //This is because of Business Logic.  They want these done right away
        if (job.make != 'chainBlade') {
          job.jobStatus = 'pending'
          //console.log(job)
          this.$root.$data.store.actions.changeJob(job._id, job)
          Materialize.toast("Dropped to WorkLog Board", 5000)
        }
      },
      archiveDrop() {
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        job.archive = true,
          console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
      },
      workingDropToDo() {
        console.log("In working drop todo.")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log("Job Status: ", job.jobStatus)
        job.jobStatus = 'working',
          console.log("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
        Materialize.toast("Dropped to In Progress", 5000)
      },
      pendingPartsToOrderDrop() {
        console.log("In pending parts to order drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log("Job Status: ", job.jobStatus)
        job.jobStatus = 'pendingPartsToOrder',
          console.log("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
        Materialize.toast("Dropped to Need to Order Parts", 5000)
      },
      pendingPartsToReceiveDrop() {
        console.log("In pending parts to recieve drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log("Job Status: ", job.jobStatus)
        job.jobStatus = 'parts on order',
          console.log("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
        Materialize.toast("Dropped to Awaiting Parts", 5000)
      },
      pendingPickupDrop() {
        this.$socket.emit('changePending')
        console.log("In pending parts to recieve drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.log("Job Status: ", job.jobStatus)
        job.jobStatus = 'ready for pickup',
          console.log("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
        Materialize.toast("Dropped to Pending Pickup", 5000)
      }
    },
    computed: {
      prepJobs() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == 'Prep' && !job.archive
        })
      },
      chainBladeJobs() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.type1 == 'Sharpen' && !job.archive
        })
      },
      activeJobs() {
        return this.$root.store.state.activeJobs
      },
      workingJobsFourStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && (job.type1 == "Homeowner Walk Behind" || job.type1 == "HomeOwner Zero Turn" || job.type1 == "Homeowner Tractor") && !job.archive
        })
      },
      workingJobsTwoStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && job.type1 == "Handheld Power" && !job.archive
        })
      },
      workingJobsCommercial() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && (job.type1 == "Other" || job.type1 == "Commercial Walk" || job.type1 == "Commercial Deck" || job.type1 == "Commercial Rider") && !job.archive
        })
      },
      finishedJobsFourStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "ready for pickup" && (job.type1 == "Homeowner Walk Behind" || job.type1 == "Homeowner Zero Turn" || job.type1 == "Homeowner Tractor") && !job.archive
        })
      },
      finishedJobsTwoStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "ready for pickup" && job.type1 == "Handheld Power" && !job.archive
        })
      },
      finishedJobsCommercial() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "ready for pickup" && (job.type1 == "Other" || job.type1 == "Commercial Walk" || job.type1 == "Commercial Deck" || job.type1 == "Commercial Rider") && !job.archive
        })
      }
    },
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
      this.$root.$data.store.actions.getParts()
      $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #scale-demo {
    position: fixed;
    right: 5px;
    bottom: 5px;
  }
  
  .flexing {
    display: flex;
    justify-content: space-around;
  }
  
  .header {
    width: 16.6%;
  }
  
  .grow {
    margin: 0px;
    font-size: 23px;
    border: 1px solid grey;
  }
  
  .margin {
    margin-bottom: 1%;
  }
  
  span {
    float: right
  }
  
  .border {
    border: 2px solid white;
  }
  
  .cardRow {
    color: black;
    /*min-height: calc(50vh);
    max-height: calc(100vh - 1px);*/
    /*max-height: 100vh;*/
    overflow: auto;
    border: 2px solid white;
  }
  
  .pendingRow {
    color: black;
    min-height: calc(50vh);
    max-height: 75vh;
    overflow: auto;
  }
  
  .fourStroke {
    color: black;
    background-color: orange;
  }
  
  .twoStroke {
    background-color: green;
  }
  
  .commercial {
    border: 5px solid white !important;
  }
  
  .sharpen {
    background-color: yellow;
  }
  
  .express {
    color: red;
  }
  
  a {
    color: black;
  }
</style>