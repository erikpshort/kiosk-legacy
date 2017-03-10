<template>
    <div class="row text-white container">
        <form class="col s12" @submit.prevent="logIn(admin.email, pWord)">
            <div class="row">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" placeholder="email@email.com" v-model="admin.email" required aria-required="true">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate" placeholder="password" v-model="pWord" required aria-required="true">
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action" @click.prevent="logIn(admin.email, pWord)">Submit
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'adminLogin',
        data() {
            return {
                pWord: null
            }
        },
        methods: {
            logIn(email, pw) {
                var user = {
                    email: email,
                    password: pw
                }
                this.$root.$data.store.actions.logIn(user)
            },
        },
        computed: {
            admin() {
                return this.$root.$data.store.state.activeAdmin
            },
            loggedInData() {
                return this.$root.$data.store.state.loggedInData

            }
        }

    }

</script>

<style scoped>
    .validate {
        font-size: 36px;
        text-align: center
    }
    
     ::-webkit-input-placeholder {
        font-size: 36px;
        color: #d0cdfa;
        text-transform: uppercase;
        text-transform: uppercase;
        text-align: center;
    }
</style>