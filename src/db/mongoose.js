//this file is export in index.js

const mongoose = require('mongoose');
// const validator = require('validator')


//mongoose connection
mongoose.connect('mongodb+srv://Keyur_Vastani:Keyur_Vastani@cluster0.rh3wt.mongodb.net/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
    // (error) => {
    //     if (error) {
    //         return console.log("unable to connect");
    //     }
    //     console.log("connection correctly");
    // }
)


//mongoose model define  //model in under avelo User is a collection name
// const User = mongoose.model("User", {
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },

//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,

//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Email is  invalid")
//             }
//         }
//     },

//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('password cannot contain "password"')
//             }
//         }
//     },

//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {                       //custome validator
//             if (value < 0) {
//                 throw new Error("you are under ages")
//             }

//         }
//     }
// })

// //create instances of the model that actually add thedata in the database
// const me = new User({
//     name: "sohanna",
//     age: 23,
//     email: 'sohan123456@gmail.com',
//     password: "1234ghjd"


// })


// //save to the database 

// me.save().then(() => {
//     console.log(me);

// }).catch((e) => {
//     console.log(e);
// })



//--------------------------create a Task model----------------------------------------

// const Task = mongoose.model("Task", {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: true,

//     },

// })


// const task1 = new Task({
//     description: "Lunch ",
//     completed: true
// })




// task1.save().then(() => {
//     console.log(task1);

// }).catch((e) => {
//     console.log(e);
// })
