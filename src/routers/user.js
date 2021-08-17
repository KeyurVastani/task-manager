const express = require('express')
const User = require('../models/user')
const router = new express.Router()



//  1) for user post(put data) the data
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    // console.log(req.body  );
    // res.send("testing perfectly work")

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    //     // res.send(e)
    // })
})

//login route
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }

})


// 2) get the user data

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})


//  3) get data through id properties
router.get('/users/:id', async (req, res) => {
    // console.log(req.params);

    const _id = req.params.id


    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("user not found")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }


    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send("user not found")
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send("this id data is not available  ", _id)
    // })
})


// 4) Update the data
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)  //return array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))

    if (!isValidOperation) {
        return res.status(400).send({ "error": "this data update is not present " })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send("no user found")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)

    }
})


// 5) Delete the data 
router.delete('/users/:id', async (req, res) => {


    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("no user found")
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router