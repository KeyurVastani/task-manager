const express= require('express')
const Task = require('../models/task')
const auth =require('../middleware/auth')
const router= new express.Router()


// for tasks post the data

// router.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)
//     // res.send("testing perfectly work")

//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }

//     // task.save().then(() => {
//     //     res.status(201).send(task)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     // })
// })

router.post('/tasks',auth, async (req, res) => {
    const task =new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// 5) get the tasks data

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(201).send(tasks)
//     } catch (e) {
//         res.status(500).send(e)
//     }

//     // Task.find({ completed: true }).then((tasks) => {
//     //     res.send(tasks)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })



// we use filtering in this part because this return all the task
// Get  /tasks?completed=true 
// Get  /tasks?limit=2&skip=2
// Get  /tasks?sortBy=createdAt:desc

router.get('/tasks',auth, async (req, res) => {
    const match={}
    const sort={}

    if(req.query.completed){    //this is a string  not a boolean 
        match.completed= req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc'?-1:1
    }

    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match ,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:sort ,
            }
        }).execPopulate()
        res.send(req.user.tasks)
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

// router.get('/tasks/:id', async (req, res) => {
//     // console.log(req.params);

//     const _id = req.params.id

//     try {
//         const task = await Task.findById(_id)
//         if (!task) {
//             return res.status(404).send("task not found")
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send(e)
//     }

//     // Task.findById(_id).then((task) => {
//     //     if (!task) {
//     //         return res.status(404).send("user not found")
//     //     }
//     //     res.send(task)
//     // }).catch((e) => {
//     //     res.status(400).send("this id data is not available  ", _id)
//     // })
// })

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
       const task =await Task.findOne({_id ,owner:req.user._id})
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})


// 8) update the tasks data
// router.patch('/tasks/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((item) => allowedUpdates.includes(item))

//     if (!isValidOperation) {
//         return res.status(400).send({ "error": "this data update is not present " })
//     }

//     try {
//         const task = await Task.findById(req.params.id)
//         updates.forEach((update)=>task[update]=req.body[update])
//         await task.save() 
         
//         // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!task) {
//             return res.status(404).send("no task found")
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send(e)

//     }
// })

router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item))

    if (!isValidOperation) {
        return res.status(400).send({ "error": "this data update is not present " })
    }
    try {

        const task=await Task.findOne({_id:req.params.id, owner:req.user._id})      
        if (!task) {
            return res.status(404).send("no task found")
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save() 
        res.send(task)
    } catch (e) {
        res.status(500).send(e)

    }
})



// 9) delete the task
// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if (!task) {
//             return res.status(404).send("no task found")
//         }
//         res.send(task)

//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


router.delete('/tasks/:id', auth,async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({_id:req.params.id,owner:req.user._id})
        if (!task) {
            return res.status(404).send("no task found")
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports=router