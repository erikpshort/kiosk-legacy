import {models} from '../config/constants.js'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Schema = mongoose.Schema

var schema = new Schema({
    // REQUIRED
    type: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    tUpRepExp: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() },
    createdDate: { type: String, required: true, default: new Date()},
    // OPTIONAL\
    notes: { type: String },
    // Relations REQUIRED
    customerId: { type: ObjectId, ref: models.customer, required: true },
    creatorId: { type: ObjectId, ref: models.user.name, required: true }
    // SHOULD THIS GET THE CUSTOMER PHONE #
});

module.exports = mongoose.model(models.job.name, schema);