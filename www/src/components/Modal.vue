<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="row">
                            <h4 class="col s4">
                                {{modalJob.model}}
                            </h4>
                            <h4 class="col s4">
                                {{modalJob.make}}
                            </h4>
                            <h4 class="col s4">
                                {{modalJob.cellPhone}}
                            </h4>
                        </div>
                    </div>
                    <div class="modal-body row">
                        {{modalJob.customerNotes}}
                    </div>
                    <div class="modal-body row">
                        <input type="text" placeholder="Mechanic Notes" v-model="mechanicNotes">
                    </div>
                    <div class="modal-body row">
                        <div class="col s5">
                            <input type="number" v-model="partNumber" placeholder="Part Number">
                        </div>
                        <div class="col s5">
                            <input type="text" v-model="partDescription" placeholder="Part Description">
                        </div>
                        <div class="col s2">
                            <input type="number" v-model="partQty" placeholder="Qty">
                        </div>
                    </div>
                    <div class="modal-body row">
                        {{modalJob.created | age}} Days Old
                    </div>
                    <div class="modal-footer">
                        <footer name="footer">
                            <button type="submit" @submit.prevent="addMechNotesandPart()">Submit and Close</button>
                            <a @click="showModal()">hide</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {
                mechanicNotes: '',
                partDescription: '',
                partNumber: '',
                partQty: null,
            }
        },
        mounted() {
            $(document).ready(function () {
                // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
                $('.modal').modal();
            });
        },
        filters: {
            age: function (createdInMs) {
                var now = Date.now()
                var ageInMs = now - createdInMs;
                var ageInDays = (ageInMs / (1000 * 60 * 60 * 24))
                return Math.floor(ageInDays);
            }
        },
        computed:{
            modalJob(){
                return this.$root.store.state.modalJob
            }
        },
        methods:{
            showModal(){
                if(this.$parent.showModal){
                    this.$parent.showModal = false
                }else{
                    this.$parent.showModal = true
                }
            }
        }
    }

</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    
    .modal-container {
        width: 75%;
        margin: 0px auto;
        padding: 20px 30px;
        height: 75% !important;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }
    
    .modal-header h3 {
        margin-top: 0;
    }
    
    .modal-body.row {
        margin: 20px 0;
        text-align: center
    }
    
    .modal-default-button {
        float: right;
    }
    /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
    
    .modal-enter {
        opacity: 0;
    }
    
    .modal-leave-active {
        opacity: 0;
    }
    
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    
    slot {
        text-align: center
    }
    a {
        float: right;
    }
footer {
    margin-top: 100px;
    position: relative;
    left: 0;
    bottom: 0;
    width: 75%;
    overflow:hidden;
}
</style>