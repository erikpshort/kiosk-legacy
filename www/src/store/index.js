import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost/api/',
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
    error: {}

}

let handleError = (err) => {
    state.error = err
}

export default {

    //ALL DATA LIVES IN THE STATE
    state,
    //ACTIONS ARE RESPONSIBLE FOR MAKING ALL ASYNC CALLS
    actions: {
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
        getActiveAdmins(){
            api('activeadmins').then(res => {
                state.activeAdmins = res.data.data
            }).catch(handleError)
        },
        getArchivedAdmins(){
            api('archivedadmins').then(res => {
                state.archivedAdmins = res.data.data
            }).catch(handleError)
        },
        getActiveCustomers(){
            api('activecustomers').then(res => {
                state.activeCustomers = res.data.data
            }).catch(handleError)
        },
        getActiveCustomers(){
            api('archivedcustomers').then(res =>{
                state.archivedCustomers = res.data.data
            }).catch(handleError)
        },
        getCustomerJobs(custId){
            api('users/' + custId + '/jobs').then(res => {
                state.customerJobs = res.data.data
            }).catch(handleError)
        }

        // getCollabBoards(){
        //     api('sharedBoards').then(res => {
        //         state.collabBoards = res.data.data
        //     }).catch(handleError)
        // },
        // getUserBoards() {
        //     api('userboards').then(res => {
        //         state.userBoards = res.data.data
        //     }).catch(handleError)
        // },
        // getBoards() {
        //     api('boards').then(res => {
        //         state.boards = res.data.data
        //     }).catch(handleError)
        // },
        //COPY ALL BELOW
        // getBoard(id) {
        //     api('boards/' + id)
        //         .then(res => {
        //             state.activeBoard = res.data.data
        //         })
        //         .catch(handleError)
        // },
        // setBoard(board) {
        //     state.activeBoard = board
        // },
        // createBoard(board) {
        //     api.post('boards', board)
        //         .then(res => {
        //             this.getUserBoards()
        //         })
        //         .catch(handleError)
        // },
        // changeBoard(id, board) {
        //     api.put('boards/' + id, board)
        //         .then(res => {
        //             this.getUserBoards()
        //         })
        // },
        // deleteBoard(id) {
        //     api.delete('boards/' + id)
        //         .then(res => {
        //             this.getUserBoards()
        //         })
        // },
        //TO HERE
        // getLists() {
        //     api('lists').then(res => {
        //         state.lists = res.data.data
        //     }).catch(handleError)
        // },
        //     getLists(id) {
        //         api('boards/' + id + '/lists')
        //             .then(res => {
        //                 state.lists = res.data.data
        //             })
        //             .catch(handleError)
        //     },
        //     createList(list) {
        //         api.post('lists', list)
        //             .then(res => {
        //                 this.getLists(list.boardId)
        //             })
        //             .catch(handleError)
        //     },
        //     changeList(id, obj, boardId){
        //         api.put('lists/' + id, obj)
        //         .then(res => {
        //             this.getLists(boardId)
        //         }).catch(handleError)
        //     },
        //     deleteList(id, boardId){
        //         api.delete('lists/' + id)
        //         .then(res=>{
        //             this.getLists(boardId)
        //         })
        //         .catch(handleError)
        //     },
        //     // getTasks() {
        //     //     api('tasks').then(res => {
        //     //         state.tasks = res.data.data
        //     //     }).catch(handleError)
        //     // },
        //     getTasks(id) {
        //         api('boards/' + id + '/tasks' )
        //             .then(res => {
        //                 state.tasks = res.data.data
        //             })
        //             .catch(handleError)
        //     },
        //     createTask(task) {
        //         api.post('tasks/', task)
        //             .then(res => {
        //                 this.getTasks(task.boardId)
        //             })
        //             .catch(handleError)
        //     },
        //     changeTask(boardId, object, id){
        //         api.put('tasks/' + id, object)
        //         .then(res => {
        //             this.getTasks(boardId)
        //         }).catch(handleError)
        //     },
        //     deleteTask(x, y, task){

        //         api.delete('tasks/' + x, task)
        //         .then(res=>{
        //             this.getTasks(y)
        //         })
        //         .catch(handleError)

        // }
    }
}