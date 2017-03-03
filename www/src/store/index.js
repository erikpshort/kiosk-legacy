import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 20000,
    withCredentials: true

})

// api.post('http://localhost:3000/api/login', {
//     email: 'erik@erik.com',
//     password: 'pw123'
// })

//REGISTER ALL DATA HERE
let state = {
    activeAdmin: [],
    activeAdmins: [],
    activeCustomer: [],
    activeCustomers: [],
    activeJob: [],
    activeJobs: [],
    archivedAdmin: [],
    archivedAdmins: [],
    archivedCustomer: [],
    archivedCustomers: [],
    archivedJob: [],
    archivedJobs: [],
    customerJobs: [],
    activePhone: [],
    error: {}

}

let handleError = (err) => {
    state.error = err
}

export default {

    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS ARE RESPONSIBLE FOR MAKING ALL ASYNC CALLSf
    actions: {
        //REGISTER - LOGIN - LOGOUT - AUTHENTICATION
        register(user) {
            api.post('register', user)
                .then(res => {
                    state.activeUser = res.data.data
                    state.loggedOut = false
                }).catch(handleError)
        },
        logIn(user) {
            api.post('login', user)
                .then(res => {
                    state.activeUser = res.data.data
                    state.loggedOut = false
                    this.getCollabBoards()
                    this.getUserBoards()
                    console.log('Logged In')
                    console.log(state.loggedOut)
                }).catch(handleError)
        },
        logOut() {
            api.delete('logOut').then(res => {
                state.loggedOut = true
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
            }).catch(handleError)
        },
        postJob(body) {
            api.post('jobs', body).then(res => {
                this.activeJob = res.data.data
                this.getActiveJobs()
            }).catch(handleError)
        },
        //PUTS
        changeUser(userId, body) {
            api.put('users/' + userId, body).then(res => {
                this.activeAdmin()
                this.activeCustomers()
            }).catch(handleError)
        },
        changeJob(jobId, body) {
            api.put('job' + jobId, body).then(res => {
                this.activeJobs()
            }).catch(handleError)
        }
    }
}