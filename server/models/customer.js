// import { models } from '../config/constants'

// let mongoose = require('mongoose')
// let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId


// let schema = new Schema({
//     company: { type: String, unique: true },
//     name: { type: String, required: true },
//     cellPhone: {
//         type: String,
//         unique: true,
//         validate: {
//             validator: function (v) {
//                 return /\d{3}-\d{3}-\d{4}/.test(v);
//             },
//             message: '{VALUE} is not a valid phone number!'
//         },
//         required: [true, 'User phone number required']
//     },
//     address: { type: Schema.Types.Mixed },
//     city: { type: String },
//     state: { type: String },
//     zip: { type: String },
//     email: { type: String, unique: true },
//     createdDate: { type: String, required: true, default: new Date() },
//     created: { type: Number, required: true, default: Date.now() },
//     archive: { type: Boolean, required: true, default: false },
// })

// module.exports = mongoose.model(models.user.name, schema)