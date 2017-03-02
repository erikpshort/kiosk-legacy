const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'user',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  customer: {
    name: 'Customer',
    endpoint: 'customer'
  },
  job: {
    name: 'Job',
    endpoint: 'job'
  }

}


export {
  actions,
  models
}