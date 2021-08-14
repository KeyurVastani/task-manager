// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId


// destructure
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb+srv://Keyur_Vastani:Keyur_Vastani@cluster0.rh3wt.mongodb.net/'
const Database_name = "task-mamager"

// const id = new ObjectId()
// console.log(id.getTimestamp());
// console.log(id.id.length);
// console.log(id.toHexString().length);




//database connection

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log("unable to connect");
    }


    console.log("connect correctly");
    const db = client.db(Database_name)


    //insert one ---------------------- 

    // const db = client.db(Database_name)
    // db.collection("users").insertOne({
    //     name: 'manan', age: 75
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("unable to insert data");
    //     }
    //     console.log(result);
    // })


    // insert many----------------------


    db.collection("task").insertMany([{
        decription: "sdfasdfdsfasfsa",
        completed: false
    }, {
        decription: "dfggsdvdsfgdfg",
        completed: true
    }, {
        decription: "dfshbergtegdfv",
        completed: true
    }, {
        decription: "drgasdrtgfdbv",
        completed: false
    }, {
        decription: "dsfgstrtrtrt",
        completed: true
    }
    ], (error, result) => {
        if (error) {
            return console.log("unable to insert data");
        }
        console.log(result.insertedCount);
    })
})

///