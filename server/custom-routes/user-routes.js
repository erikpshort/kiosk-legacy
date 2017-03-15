let jobs = require('../models/job')
let Users = require('../models/user')
let io = require('socket.io')
let twilio = require('twilio');

// var edge = require('edge');
// var fs = require('fs');
// var dymo = require('dymo');
// var qr = require('qr-image');

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

  },
  printQR: {
    path: '/printqr',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Printing Label'
      console.log(req.body)

      fs.unlink('customerfile.png', function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
      var userinput = {
        "_id": "208-111-2222",
        "fullName": "john doe",
      }
      console.log(userinput)

      var qr_svg = qr.image(userinput._id + " " + userinput.fullName, { type: 'png' });
      qr_svg.pipe(require('fs').createWriteStream('customerfile.png'));

      ///////////////  Printer testing
      // It takes a second or two for initialization to complete.
      setTimeout(function () {

        // Gets an array of IPrinter objects (Dymo printers on the current system)
        dymo.printers(null, function (err, printers) {
          if (err) throw err;
          console.log(printers);
        });


        fs.stat('customerfile.png', function (err, stats) {
          if (err) {
            return console.error(err);
          }
          console.log("before vars are set");
          var printArgs = {
            printer: 'DYMO LabelWriter 450 Turbo',   //name of printer
            label: 'test.label',                        //path to label filename
            fields: {
              title: userinput.fullName,
              phone: userinput._id
            },
            images: {
              photo: fs.readFileSync('customerfile.png')
            }
          };

          // A print object;
          dymo.print(printArgs, function (err, res) {
            if (err) throw err;
            console.log("Print job created.");
          });

        });

      }, 2000);
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


