const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,

            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is  invalid")
                }
            }
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('password cannot contain "password"')
                }
            }
        },

        age: {
            type: Number,
            default: 0,
            validate(value) {                       //custome validator
                if (value < 0) {
                    throw new Error("you are under ages")
                }

            }
        }
    }
)

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })  //email:email
    if (!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }
    return user
}







//meddleware concept
//Hash the plaintext password before save
userSchema.pre('save', async function (next) {
    const user = this                     //this is provide the access the data which is provide in the postman when user is created
    // console.log("just before saving");
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User