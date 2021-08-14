const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb+srv://Keyur_Vastani:Keyur_Vastani@cluster0.rh3wt.mongodb.net/'
const Database_name = "task-mamager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log("unable to connect");
    }


    console.log("connect correctly");
    const db = client.db(Database_name)
    // db.collection("users").findOne({ _id: ObjectId("61177b476bfe3f1772bce646")}, (error, user) => {
    //     if (error) {
    //         console.log("unable to find");
    //     }
    //     console.log(user); 

    // })


    // find multiple data ---------------------------------

    // db.collection("users").find({ address: "patedds" }).toArray((error, user) => {
    //     console.log(user);

    // })
    // db.collection("users").find({ address: "patedds" }).count((error, user) => {
    //     console.log(user);

    // })


    // find particular data--------------------------------
    // find all data from task which is not completed
    db.collection('task').find({ completed: false }).toArray((error, user) => {
        console.log(user);

    })


})