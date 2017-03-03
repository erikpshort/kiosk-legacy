<template>
    <div class="Orangejobs">
        <h1>{{ msg }}</h1>
        <!--This is where the v-for goes for the activeJobs-->
        <!--This is raw data: {{this.$root.store.state.activeJobs}}-->
        <h4>
            <router-link :to="'/addJob'">Create new activeJob</router-link>
        </h4>

        <h3>All activeJobs shown here.</h3>

        <Job></Job>


        <!--
    <div class="activeJob" v-for="activeJob in this.$root.store.state.activeJobs">
      <router-link :to="'/activeJob/'+activeJob._id">{{activeJob.name}}</router-link>
      <span @click="$root.store.actions.removeJob(activeJob)">  x</span></li>
    </div>
    <hr>

    <h3>User Id: {{this.$root.store.state.user._id}}</h3>
    <div class="userJob" v-for="activeJob in this.$root.store.state.userJobs">
      <router-link :to="'/activeJob/'+activeJob._id">{{activeJob.name}}</router-link>
      <span @click="$root.store.actions.removeJob(activeJob)">  x</span></li>
    </div>-->

        <div class="row">
            <div class="col-md-3">
                <span><button type = "submit">Assign Job</button></span>
            <!--</div>
            <div class="col-md-6"></div>
            <div class="col-md-3">-->
                <span><button type = "submit">Delete Job</button></span>
            </div>
        </div>


    </div>
</template>

<script>
  


    export default {
        name: 'orangejobs',
        data() {
            return {
                msg: 'Welcome to The Backlog'
            }
        },
        // mounted: function () {
        //   // this.$root.$data.store.actions.checkAuth()
        //   this.$root.$data.store.actions.getJobs()
        //   this.$root.$data.store.actions.getUserJobs(this.$root.store.state.user._id)
        // },

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }


    ul {
        list-style-type: none;
        padding: 0;
    }


    li {
        display: inline-block;
        margin: 0 10px;
    }


     {
        color: #42b983;
    }


    .Job {
        border: 1px solid black;
    }
</style>