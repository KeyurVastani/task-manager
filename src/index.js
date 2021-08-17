//this is a starting point of own application

const express = require('express')
require('./db/mongoose')                   //this is a connection of database
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app = express()
const port = process.env.PORT || 3000



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

//decryption key set


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