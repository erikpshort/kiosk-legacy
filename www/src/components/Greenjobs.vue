<template>
    <div class="Greenjobs">
        <!--This is where the v-for goes for the activeJobs-->
        <!--This is raw data: {{this.$root.store.state.activeJobs}}-->


        <!--<h4>
            <router-link :to="'/addJob'">Create new activeJob</router-link>
        </h4>-->

        <!--<h5>All Orange (Four-Stroke) shown here.</h5>-->
        <div v-for="job in twoStroke(this.$root.store.state.activeJobs)">{{job.created}} {{job.make}} {{job.model}} {{job.notes}}</div>
        <h3>JWTO</h3>
        <hr>
        <!--<h5>Debug: All activeJobs shown here.</h5>-->
        <!--Uncomment the line below to show ALL active jobs for debugging.-->
        <!--<div> {{this.$root.store.state.activeJobs}}</div>-->
        <!--<div v-for="job in this.$root.store.state.activeJobs">{{job}}</div>-->

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
                msg: 'Welcome to The Backlog',
                jobTypeMessage: 'These are orange jobs'
            }
        },
        mounted() {
            //   this.$root.$data.store.actions.getActiveAdmins()
            //   this.$root.$data.store.actions.getActiveCustomers()
            this.$root.$data.store.actions.getActiveJobs()
        },
        methods: {
            //takes in an array of job objects, and returns those where the type is four-stroke.
            twoStroke: function (arr_jobs) {
                console.log(arr_jobs)
                this.out_array = arr_jobs.filter(function (element) {
                    if (element.type == "two Stroke") { return true }
                    else { return false }
                })
                return this.out_array;
            }
        }

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


    .Job {
        border: 1px solid black;
    }
</style>