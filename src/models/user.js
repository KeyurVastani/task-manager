const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
        },
        tokens:[{
            token:{
                type:String,
                required :true
            }
        }]
    }
)

// for login method
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



//for token generation
userSchema.methods.generateAuthToken= async function(){
    const user=this
    const token= jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    user.tokens=user.tokens.concat({token}) //token:token
    await user.save()
    return token

}


userSchema.methods.toJSON =function(){
    const user=this 
    const userObject= user.toObject()
    delete userObject.password
    delete userObject.tokens
    
    return userObject
}




// document meddleware concept
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