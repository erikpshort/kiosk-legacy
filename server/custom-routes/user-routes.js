let jobs = require('../models/job')
let Users = require('../models/user')
let io = require('socket.io')
let twilio = require('twilio');

//commeted out at dave's suggestion to successfully build server. 
//On a proper server these variables will be supplied by server environment.
// let client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
// will need this for text messaging

export default {
  activeJobs: {
    path: '/activejobs',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Active Jobs'
      jobs.find({ archive: false })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  archivedJobs: {
    path: '/archivedjobs',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find archived Jobs'
      jobs.find({ archive: true })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  activeAdmin: {
    path: '/activeadmins',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Active Administrative Users'
      Users.find({ admin: true, archive: false })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  archivedAdmin: {
    path: '/archivedadmins',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Archived Administrative Users'
      Users.find({ admin: true, archive: true })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  activeCustomers: {
    path: '/activecustomers',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Active Customer Users'
      Users.find({ admin: false, archive: false })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  archivedCustomers: {
    path: '/archivedcustomers',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Archived Customer Users'
      Users.find({ admin: false, archive: true })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  customerJobs: {
    path: '/user/:id/jobs',
    reqType: 'get',
    method(req, res, next) {
      if (!req.session.uid) {
        return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
      }
      let action = 'Find Customers Jobs'
      jobs.find({ customerId: req.params.id })
        .then(data => {
          res.send(handleResponse(action, data))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  smsText: {
    path: '/sms',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Sending SMS'
      console.log(req.body)
      client.sendMessage({
        to: req.body.to,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: req.body.body
      }, function (err, message) {
        if (err) {
          console.error(err.message);
        } else if (message) {
          console.log(message)
          res.send(handleResponse(err, message))
        }
      })
    }

  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}


