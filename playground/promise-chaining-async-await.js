require('../src/db/mongoose')
const Task = require('../src/models/task')



const UpdateDocument = async (id, completed) => {
        const results = await Task.findByIdAndUpdate(id, { completed }, () => {
                console.log("data is updates");
        })
        const count = await Task.countDocuments({ completed }) // completed:completed this type syntex
        return count

}

UpdateDocument('611a0196e30b080debf0360e', false).then((count) => {
        console.log("count is", count);
}).catch((e) => {
        console.log(e);
})