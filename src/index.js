//this is a starting point of own application

const express = require('express')
require('./db/mongoose')                   //this is a connection of database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000




//express middleware

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send("you can't fatch data")
//     }else{
//         next()
//     }      
// })


// app.use((req,res,next)=>{
//         res.status(503 ).send("site is under mantainses")    
// })

//get the data from the client 
app.use(express.json())
app.use(userRouter) //register the router
app.use(taskRouter)


//when you enter url is wrong
app.post('*', (req, res) => {
    res.status(400).send({
        title: "This is a 404 Error",
        errorMessage: " please try again and post somerequest"
    })

})

app.get('*', (req, res) => {
    res.status(400).send({
        title: "This is a 404 Error",
        errorMessage: " please try again"
    })

})

app.listen(port, () => {
    console.log("Server is run on port : " + port);

})

// //decryption key set-------------------------------------------------------
// const bcrypt=require('bcryptjs')

// const myFunction =async()=>{
//     const password='12345keyur'
//     const hashedPassword=await bcrypt.hash(password,8)  //8 is a number of round
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch= await bcrypt.compare(password,hashedPassword)
//     console.log(isMatch);
// }

// myFunction()


// //jwt Token-------------------------------------
// const jwt=require('jsonwebtoken')

// const myFunction=async()=>{
//           //this is a create a token
//      const token = jwt.sign({_id:'jwt123'} ,'thisismynewcourse',{expiresIn:'1 second'})
//      console.log(token);


//     // varify the token
//         const data=    jwt.verify(token,'thisismynewcourse')
//         console.log(data);
// }

// myFunction()




// // useing task we find user
// const Task= require('./models/task')

// const main = async()=>{
//     const task=  await Task.findById('611defef740f1906e9a9ddc5') 
//     await task.populate('owner').execPopulate()  //find the user which is associate with this task
//     console.log(task.owner);  

// }
// main()



//using the user we find the task
// const User = require('./models/user')
// const main = async () => {
//     const user = await User.findById('611ded308c10080540ee69a8')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }
// main()





 