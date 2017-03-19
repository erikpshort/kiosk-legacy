// let jobs = require('../models/job')
// import { actions, models } from '../config/constants'

// export default {
//     changeJob: {
//         path: '/addParts/:id',
//         reqType: 'put',
//         method(req, res, next) {
//             var id = req.params.id || req.query.id || '';
//             var parts = req.body.partsRequired;
//             var mNotes = req.body.mechanicNotes
//             console.log(parts, "myField")
//             if (!req.session.uid) {
//                 return res.status(401).send(handleResponse(null, null, new Error("User Not Authenticated")))
//             }
//             let action = 'Updating Job'
//             jobs.findOneAndUpdate({ _id: id }, {
//                 $push: { partsRequired: parts },
//             }, { mechanicNotes: mNotes }).then(data => {
//                 return res.send(handleResponse(action, { message: 'Successfully Added Part' }))
//             })
//                 .catch(error => {
//                     return next(handleResponse(action, null, error))
//                 })
//         }
//     }
// }
// function handleResponse(action, data, error) {
//     var response = {
//         schemaType: models.name,
//         action: action,
//         data: data
//     }
//     if (error) {
//         response.error = error
//     }
//     return response
// }