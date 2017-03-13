import router from '../router'
import axios from 'axios'
// import twilio from 'twilio'

// var twilio = require('twilio');
// var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 20000,
    withCredentials: true

})

// api.post('http://localhost:3000/api/login', {
//     email: 'erik@erik.com',
//     password: 'erik'
// })


//REGISTER ALL DATA HERE
let state = {
    activeAdmin: {},
    activeAdmins: [],
    activeCustomer: {},
    activeCustomers: [],
    activeJob: {},
    activeJobs: [],
    archivedAdmin: {},
    archivedAdmins: [],
    archivedCustomer: {},
    archivedCustomers: [],
    archivedJob: {},
    archivedJobs: [],
    customerJobs: [],
    activePhone: '',
    loggedInUser: {},
    loggedInData: {},
    error: {},

}

let handleError = (err) => {
    state.error = err
}

export default {

    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS ARE RESPONSIBLE FOR MAKING ALL ASYNC CALLSf
    actions: {
        sms(body) {
            api.post('sms', body)
                .then(res => {
                    console.log(res)
                }).catch(handleError)
        },
        //REGISTER - LOGIN - LOGOUT - AUTHENTICATION
        register(body) {
            api.post('register', body)
                .then(res => {
                    state.activeUser = res.data.data
                    state.activeCustomer = res.data.data

                }).catch(handleError)
        },
        // logInMethod(res) {
        //     if (res.data.data.admin) {
        //         console.log("respons first ", res)
        //         state.loggedInUser = res.data.data
        //         return router.push('/backlog')
        //     } else if (!res.data.data.admin) {
        //         console.log("else if", res.data.data.admin)
        //         Materialize.toast('Hello', 4000)
        //     } else {
        //         console.log(res.data.error)
        //     }
        // },
        logIn(user) {
            api.post('login', user).then(res => {
                state.loggedInData = res.data
                if (res.data.data.admin) {
                    state.loggedInUser = res.data.data
                    return router.push('/backlog')
                } else if (!res.data.data.admin) {
                    Materialize.toast('You do not have Administrative Permissions', 6000)
                }
            }).catch(err => {
                if (state.loggedInData.error == "Invalid Email or Password") {
                    Materialize.toast(state.loggedInData.error, 6000)
                } else {
                    Materialize.toast("Must Provide Email and Password", 6000)
                    Materialize.toast("You may need to Register", 4000)
                }
                // If you need to call a function from a component use below method
                // router.getMatchedComponents('/AdminLogin')[0].methods.afterLogIn(state.loggedInData)
            }, handleError)
        },
        logOut() {
            api.delete('logOut').then(res => {
            }).catch(handleError)
        },
        authenticate() {
            api('authenticate').then(res => {
                console.log('Authorized')
                state.activeUser = res.data.data
            }).catch(handleError)
        },
        //GETS
        getActiveJobs() {
            console.log("action is hitting...")
            api('activejobs').then(res => {
                console.log("active jobs res  "  ,res)
                state.activeJobs = res.data.data
            }).catch(handleError)
        },
        getarchivedJobs() {
            api('archivedjobs').then(res => {
                state.archivedJobs = res.data.data
            }).catch(handleError)
        },
        getActiveAdmins() {
            api('activeadmins').then(res => {
                state.activeAdmins = res.data.data
            }).catch(handleError)
        },
        getArchivedAdmins() {
            api('archivedadmins').then(res => {
                state.archivedAdmins = res.data.data
            }).catch(handleError)
        },
        getActiveCustomers() {
            api('activecustomers').then(res => {
                state.activeCustomers = res.data.data
            }).catch(handleError)
        },

        getArchivedCustomers() {

            api('archivedcustomers').then(res => {
                state.archivedCustomers = res.data.data
            }).catch(handleError)
        },
        getCustomerJobs(custId) {
            api('users/' + custId + '/jobs').then(res => {
                state.customerJobs = res.data.data
            }).catch(handleError)
        },
        //POST
        postUser(body) {
            api.post('users', body).then(res => {
                this.activeCustomer = res.data.data
                this.getActiveJobs()
                console.log(this.activeCustomer)
            }).catch(handleError)
        },
        postJob(body) {
            api.post('job', body).then(res => {
                this.activeJob = res.data.data
                this.getActiveJobs()
            }).catch(handleError)
        },
        //PUTS
        changeUser(userId, body) {
            api.put('user/' + userId, body).then(res => {
                state.activeCustomer = body
                this.activeAdmin()
                this.activeCustomers()
            }).catch(handleError)
        },
        changeJob(jobId, body) {
            api.put('job' + jobId, body).then(res => {
                this.activeJobs()
            }).catch(handleError)
        }
    },
}
