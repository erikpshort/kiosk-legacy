let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
    name: { type: String, required: true },
    company: { type: String, unique: true },
    cellPhone: [{
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    }],
    password: { type: String },
    address: { type: Schema.Types.Mixed },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    email: { type: String, unique: true },
    admin: { type: Boolean, required: true, default: false },
    twilio: { type: Boolean, required: true, default: false },
    twilioValCode: { type: String, default: null},
    createdDate: { type: String, required: true, default: new Date() },
    created: { type: Number, required: true, default: Date.now() },
    archive: { type: Boolean, required: true, default: false },
})

schema.pre('save', function (next) {
    var user = this;
    if (user.password) {
        if (!user.isModified('password')) {
            return next();
        }
        bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    user.password = hash;
                    next();
                });
            }
        });
    }else{return next()}
});

schema.methods.validatePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err || !isMatch) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('User', schema)