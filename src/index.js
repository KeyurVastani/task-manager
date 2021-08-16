//this is a starting point of own application

const express = require('express')
require('./db/mongoose')                   //this is a connection of database
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

//get the data from the client 
app.use(express.json())



// for user post the data
app.post('/users', (req, res) => {
    const user = new User(req.body)
    // console.log(req.body  );
    // res.send("testing perfectly work")

    user.save().then(() => {
        res.send(user)

    }).catch((e) => {
        res.status(400).send(e)
        // res.send(e)
    })



})

//for tasks post the data

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    // res.send("testing perfectly work")
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e) 
        
    })

})


// get the user data

app.get('/users', (req, res) => {

    User.find({ name: 'keyur', age: '23', password: 'keyur123' }).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})


//get data through id properties

app.get('/users/:id', (req, res) => {
    // console.log(req.params);

    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send("user not found")
        }
        res.send(user)
    }).catch((e) => {
        res.status(400).send("this id data is not available  ", _id)
    })

})




//when you enter url is wrong
app.post('*', (req, res) => {
    res.status(400).send({
        title: "This is a 404 Error",
        errorMessage: " please try again"
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