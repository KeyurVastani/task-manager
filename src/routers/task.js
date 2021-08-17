const express= require('express')
const Task = require('../models/task')
const router= new express.Router()


// for tasks post the data

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    // res.send("testing perfectly work")

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


// 5) get the tasks data

router.get('/tasks', async (req, res) => {


    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({ completed: true }).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})


// 6)get tasks data through id properties
router.get('/tasks/:id', async (req, res) => {
    // console.log(req.params);

    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send("user not found")
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send("this id data is not available  ", _id)
    // })
})


// 8) update the tasks data
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))

    if (!isValidOperation) {
        return res.status(400).send({ "error": "this data update is not present " })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save() 
         
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send("no task found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)

    }
})


//delete the task
router.delete('/tasks/:id', async (req, res) => {


    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send("no task found")
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports=router