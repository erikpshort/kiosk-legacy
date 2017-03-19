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
    useCustomRoutes: true
  },
  part: {
    name: 'Part',
    endpoint: 'part'
  },
  job: {
    name: 'Job',
    endpoint: 'job',
    useCustomRoutes: true
  }

}


export {
  actions,
  models
}