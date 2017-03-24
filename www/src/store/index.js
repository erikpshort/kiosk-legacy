import router from '../router'
import axios from 'axios'
let api = axios.create({
    baseURL: 'http://192.168.0.39:3000/api/',
    timeout: 20000,
    withCredentials: true

})

console.warn("makeing a post with hard coded login information.")
api.post('http://localhost:3000/api/login', {
    email: 'legacyfeed@outlook.com',
    password: 'pw123'
})


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
    activePart: {},
    activePhone: '',
    customerJobs: [],
    loggedInUser: {},
    loggedInData: {},
    modalJob: {},
    parts: {},
    error: null,
    connect: false,
    message: null

}

let handleError = (err) => {
    state.error = err
}

export default {
    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS ARE RESPONSIBLE FOR MAKING ALL ASYNC CALLSf
    actions: {
        stateChange(){
            this.getActiveJobs();
            this.getActiveAdmins();
            this.getActiveCustomers();
            this.getParts();
        },
        sms(body) {
            api.post('sms', body)
                .then(res => {
                    console.log(res)
                }).catch(handleError)
        },
        printqr(body) {
            api.post('printqr', body)
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
        logIn(user) {
            api.post('login', user).then(res => {
                state.loggedInData = res.data
                if (res.data.data.admin) {
                    state.loggedInUser = res.data.data
                    return router.push('/AdminBoard')
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
            api('activejobs').then(res => {
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
        getSingleCustomer(customerId) {
            api('user/' + customerId).then(res => {
                state.activeCustomer = res.data.data
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
                //console.log(state.activeCustomer)
            }).catch(handleError)
        },
        getParts() {
            api('part').then(res => {
                state.parts = res.data.data
                //console.log(state.parts)
            }).catch(handleError)
        },
        //POST
        postUser(body) {
            api.post('user', body).then(res => {
                this.activeCustomer = res.data.data
                this.getActiveJobs()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        },
        postJob(body) {
            api.post('job', body).then(res => {
                this.activeJob = res.data.data
                this.getActiveJobs()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        },
        postParts(body) {
            api.post('part', body).then(res => {
                this.activePart = res.data.data
                this.getParts()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        },
        changeUser(userId, body) {
            api.put('user/' + userId, body).then(res => {
                state.activeCustomer = body
                this.activeAdmin()
                this.activeCustomers()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        },
        changeJob(jobId, body) {
            api.put('job/' + jobId, body).then(res => {
                this.getActiveJobs()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        },
        changePart(partId, body) {
            api.put('part/' + partId, body).then(res => {
                state.activePart = res.data.data
                this.getParts()
                router.app.$socket.emit('storeChange')
            }).catch(handleError)
        }
    }
}


