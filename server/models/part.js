import  { models }  from  '../config/constants.js'

let  mongoose  =  require('mongoose')
let  ObjectId  =  mongoose.Schema.ObjectId
let  Schema  =  mongoose.Schema


var schema = new Schema({  
    archive:{type: Boolean, required: true, default: false},
    customerId: { type: ObjectId, ref: models.customer, required: true },
    jobId: { type: String, required: true },
    partNumber:  String,
    partQty:  Number,  
    partDescription:  String, 
    partPrice:  String,
    archive: {type: Boolean, required: true, default: false},
})

module.exports = mongoose.model(models.part.name, schema);