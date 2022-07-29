const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "First name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    instagram:{
        type: String,
        required: [true, "Instagram User is required"]
    },
    imageList: {
        type: Array
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);



UserSchema.pre('validate', function (next) {
    console.log(this.password)
    console.log(this.get('confirmPassword'))

    if (this.password !== this.get("confirmPassword")) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const User = mongoose.model('User', UserSchema);
module.exports = User