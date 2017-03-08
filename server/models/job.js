import {models} from '../config/constants.js'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Schema = mongoose.Schema

var schema = new Schema({
    // REQUIRED
<<<<<<< HEAD
    type1: {type: String, required: true, default:'Handheld Power'},
    type2: { type: String, required: true, default:'Unkown' },
    make: { type: String, required: true },
    model: { type: String, required: true },
    tUpRepExp: { type: String, required: true },//Tune-up - Repair - Express
    created: { type: Number, required: true, default: Date.now() },
    createdDate: { type: String, required: true, default: new Date()},
    email: {type: String, required: true},
    whereAmI: {type: String, required: true, default: 'Work log'},
=======
    type: { type: String, required: true }, //type of job 'four-stroke', 'two-strok' ect. 
    make: { type: String, required: true },
    model: { type: String, required: true },
    tUpRepExp: { type: String, required: true }, //nature of job tune up or repair.
    created: { type: Number, required: true, default: Date.now() },
    createdDate: { type: String, required: true, default: new Date()},
    jobStatus: { type: String, required: true, default: 'pending'},  //pending, working, parts on order, ready for pickup etc.
>>>>>>> 04dff0fba964c24e1e92773f0320347a287abf8e
    // OPTIONAL\
    customerNotes:{type: String},
    mechanicNotes: {type: String},
    mechanic: {type: String},
    hoursWorked: {type: Number},
    sendText: {type: Boolean, required: true, default: false},
    mechanicId: {type: Schema.Types.Mixed},
    partsRequired:[{partNumber: String, partQty: Number, partDescription: String, partPrice: String}],
    signatures:[{type: String}],
    // Relations REQUIRED
    archive:{type: Boolean, required: true, default: false},
    customerId: { type: ObjectId, ref: models.customer, required: true },
    creatorId: { type: ObjectId, ref: models.user.name, required: true },
    cellPhone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    },
});

module.exports = mongoose.model(models.job.name, schema);