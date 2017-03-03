<template>
  <div class="Job">
    <h1>{{ msg }}</h1>
<!-- comments here for testing routes

    <h3>Active Job: {{this.$root.store.state.activeJob.name}}<h3> -->
 <!-- leave in in case want to refernce later...<form @submit.prevent="createList">-->
    <!--List 
    <input v-model="name">
  </form>
    <h3> available for text... </h3>-->
    <!--{{this.$root.store.state.activeLists}}-->
    <!--<hr>
    <div v-for="list in this.$root.store.state.activeLists">{{list.name}}</div>-->
    <!--<div v-for="list in this.$root.store.state.activeLists" > {{activeList.name}}  {{activeList.boardId}} </div>-->
<!--<hr>-->

   

<!--<div> </div>-->
  </div>
</template>

<script>
export default {
  name: 'job',
  data() {
    return {
             msg: 'Active Job'

    }
  }
//   methods:{
  
// //   },
// //   mounted(){
// //     this.$root.store.actions.getJob(this.$route.params.id)
        
//   },
// //   computed:{
// //     board(){
// //       return this.$root.store.state.activeJob
// //     }
//   }
// }
}
</script>

<style scoped>
</style>