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
    <div class="row">
      <h4 class="col s4 offset-s4" v-if="showBacklog">WorkLog</h4>
      <span class="col s1 offset-s3" v-if="showBacklog" @click="toggleBacklog" id='showBacklog'>Hide</span>
      <span class="col s1 offset-s11 card grey darken-3 white-text" v-if="!showBacklog" @click="toggleBacklog" id='showBacklog'
        @drop="workingDropBackLog" @dragover.prevent>WorkLog</span>
    </div>
    <div class="row  card grey cardRow" v-if="showBacklog" @drop="workingDropBackLog" @dragover.prevent>
      <div id="fourStroke space" class="col s4  pendingRow">
        <modal v-if="showModal"></modal>
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
        <div v-for="(job,i) in fourStroke(activeJobs)" draggable="true" @dragstart.capture="drag(job)" v-bind:class="{'row card red grow':job.tUpRepExp=='Express'}">


          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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

      <div id="twoStroke space" class="col s4 pendingRow" @drop="workingDropBackLog" @dragover.prevent>
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
              {{job.jobNumber}}
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
      <div id="commercial space" class="col s4 pendingRow" @drop="workingDropBackLog" @dragover.prevent>
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
              {{job.jobNumber}}
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
      <h4 class="col s4 offset-s4" v-if="showWorking">In Progress</h4>
      <span class="col s1 offset-s3" v-if="showWorking" @click="toggleWorking" id='showBacklog'>Hide</span>
      <span class="col s1 offset-s11" v-if="!showWorking" @click="toggleWorking" id='showBacklog'>In Progress</span>
    </div>
    <div v-if="showWorking" id="workingBoard" class="row card blue-grey cardRow" @drop.capture="workingDropToDo" @dragover.prevent>
      <div id="fourStroke space" class="col s4  pendingRow">
        <modal v-if="showModal"></modal>
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
        <div v-for="(job,i) in workingJobsFourStroke" draggable="true" @dragstart.capture="drag(job)" v-bind:class="{'row card red grow':job.tUpRepExp=='Express'}">
          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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
              {{job.jobNumber}}
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
              {{job.jobNumber}}
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
    <div class="row">
      <h4 class="col s4 offset-s1" v-if="showPendingParts">Parts to be Ordered</h4>
      <h4 class="col s4 offset-s2" v-if="showPendingParts">Awaiting Parts</h4>
      <span class="col s1" v-if="showPendingParts" @click="togglePendingParts">Hide</span>
      <span class="col s1 offset-s11" v-if="!showPendingParts" @click="togglePendingParts">Parts</span>
    </div>

    <div class="row card grey cardRow" v-if="showPendingParts">
      <div id="pendingPartsToOrder" class="col s6 " @drop="pendingPartsToOrderDrop" @dragover.prevent>
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
        <div v-for="job in pendingOrderParts(activeJobs)" @click=addToWorking(job._id) draggable="true" @dragstart.capture="drag(job)">
          <div class="row" v-bind:class="{'row card orange lighten-1 grow': job.type1 in fs_css, 'row card cyan lighten-1 grow': job.type1 in com_css, 'row card green lighten-1 grow': job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.tUpRepExp=='Express'}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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
      <div id="pendingPartsToReceive" class="col s6 grey pendingRow" @drop="pendingPartsToReceiveDrop" @dragover.prevent>
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
          <div class="row" v-bind:class="{'row card orange lighten-1 grow': job.type1 in fs_css, 'row card cyan lighten-1 grow': job.type1 in com_css, 'row card green lighten-1 grow': job.type1 in ts_css, sharpen: job.type1=='Sharpen', express:job.tUpRepExp=='Express'}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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
      <h4 class="col s4 offset-s4" v-if="showPendingPickup">Ready for Pick-up</h4>
      <span class="col s1 offset-s3" v-if="showPendingPickup" @click="togglePendingPickup" id='showBacklog'>Hide</span>
      <span class="col s1 offset-s11" v-if="!showPendingPickup" @click="togglePendingPickup" id='showBacklog'>Ready for Pickup</span>
    </div>
    <div class="row  card grey cardRow" v-if="showPendingPickup" @drop="workingDropBackLog" @dragover.prevent>
      <div id="fourStroke space" class="col s4  pendingRow">
        <modal v-if="showModal"></modal>
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
        <div v-for="(job,i) in pendingPickup(activeJobs)" draggable="true" @dragstart.capture="drag(job)" v-bind:class="{'row card red grow':job.tUpRepExp=='Express'}">


          <div :class="{'row card orange lighten-1 grow':classSelection2(job, i),'row card orange darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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

      <div id="twoStroke space" class="col s4 pendingRow" @drop="workingDropBackLog" @dragover.prevent>
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
        <div v-for="(job,i) in pendingPickup(activeJobs)" draggable="true" @dragstart="drag(job)">


          <div :class="{'row card green lighten-1 grow':classSelection2(job, i),'row card green darken-3 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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
      <div id="commercial space" class="col s4 pendingRow" @drop="workingDropBackLog" @dragover.prevent>
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
        <div v-for="(job,i) in pendingPickup(activeJobs)" draggable="true" @dragstart="drag(job)">
          <div :class="{'row card cyan lighten-1 grow':classSelection2(job, i),'row card cyan darken-4 grow':classSelection(job, i)}">
            <div class="col s1">
              {{job.created | age}}
            </div>
            <div class="col s5">
              {{job.make}}
            </div>
            <div class="col s2">
              {{job.jobNumber}}
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
  </div>
</template>
<script>
  import modal from './Modal.vue'
  export default {
    name: 'adminBoard',
    components: { modal },
    data() {
      return {
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
          "HomeOwnerWalkBehind": true,
          "HomeOwnerZeroTurn": true,
          "HomeownerTractor": true
        },

        com_css: {
          "Commercial Walk": true,
          "Commercial Deck": true,
          "Commercial Rider": true,
          "CommericalWalk": true,
          "CommericalDeck": true,
          "CommericalRider": true
        },
        ts_css: { "HandheldPower": true },

      }
    },
    methods: {
      classSelection(job, i) {
        if (job.tUpRepExp == 'Express') {
          return true
        } else {
          return false
        }
      },
      classSelection2(job, i) {
        if ((i % 2 != 0 || i % 2 == 0) && job.tUpRepExp != 'Express') {
          return true
        } else {
          return false
        }
      },
      classSelection3(job, i) {
        if (i % 2 != 0 && job.tUpRepExp != 'Express') {
          return true
        } else {
          return false
        }
      },
      toggleModal(job) {
        console.log(job.customerId)
        this.$root.store.actions.getSingleCustomer("58b9f7638f4f33979c7054b9")
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
          "HomeOwnerWalkBehind": true,
          "HomeOwnerZeroTurn": true,
          "HomeownerTractor": true
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
          var ts = { "HandheldPower": true };
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
        var com = { "CommericalWalk": true, "CommericalDeck": true, "CommericalRider": true }
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
        console.debug("In drag with job: ", job)
        //console.debug("In event)
        event.dataTransfer.setData('text/javascript', JSON.stringify(job))
      },
      workingDropBackLog() {
        console.debug("In working drop backog.")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.debug("Job: ", job)
        //This is because of Business Logic.  They want these done right away
        if (job.make != 'chainBlade') {
          console.debug("Job Status: ", job.jobStatus)
          console.debug("Changing job status to pending.")
          job.jobStatus = 'pending'
          console.debug("Job Status: ", job.jobStatus)
          //console.log(job)
          this.$root.$data.store.actions.changeJob(job._id, job)
        }
      },
      workingDropToDo() {
        console.debug("In working drop todo.")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.debug("Job Status: ", job.jobStatus)
        job.jobStatus = 'working',
          console.debug("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
      },
      pendingPartsToOrderDrop() {
        console.debug("In pending parts to order drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.debug("Job Status: ", job.jobStatus)
        job.jobStatus = 'pendingPartsToOrder',
          console.debug("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
      },
      pendingPartsToReceiveDrop() {
        console.debug("In pending parts to recieve drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.debug("Job Status: ", job.jobStatus)
        job.jobStatus = 'parts on order',
          console.debug("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
      },
      pendingPickupDrop() {
        console.debug("In pending parts to recieve drop")
        var job = JSON.parse(event.dataTransfer.getData('text/javascript'))
        console.debug("Job Status: ", job.jobStatus)
        job.jobStatus = 'ready for pickup',
          console.debug("Job Status: ", job.jobStatus)
        console.log("Job Object just before being sent to store: ", job)
        this.$root.$data.store.actions.changeJob(job._id, job)
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
    computed: {
      activeJobs() {
        return this.$root.store.state.activeJobs
      },
      workingJobsFourStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && job.type1 == ("HomeOwnerWalkBehind" || "HomeOwnerZeroTurn" ||
            "HomeownerTractor")
        })
      },
      workingJobsTwoStroke() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && job.type1 == "HandheldPower"
        })
      },
      workingJobsCommercial() {
        return this.$root.store.state.activeJobs.filter((job) => {
          return job.jobStatus == "working" && job.type1 == ("CommericalWalk" || "CommericalDeck"|| "CommericalRider")
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
  /*div {
    margin:0px;
  }*/
  
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
    max-height: calc(100vh - 400px);*/
    /*max-height: 100vh;*/
    overflow: auto;
    border: 2px solid white;
  }
  
  .pendingRow {
    color: black;
    min-height: calc(50vh);
    max-height: calc(75vh - 100px);
    /*max-height: 100vh;*/
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