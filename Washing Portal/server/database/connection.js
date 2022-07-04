const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://Naman:Ratna1N4@cluster0.v6vju8a.mongodb.net/wm1?retryWrites=true&w=majority'

const connectDB= async ()=>{
    await mongoose.connect(MONGO_URL,()=>{
        console.log(`Connected Successfulling To Mongoose`)
    })
}
module.exports.connectDB = connectDB



// activeUser SCHEMA : CurrUser TABLE
// NOTE USE NEW WORD BEFORE CREATING A SCHEMA
const activeUser  = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Phone: {
        type:Number,
        required:true,
        unique:true
    },
    Email :{
        type:String,
        required:true,
        unique:true
    },
    Status :{
        type:String,
        required:true
    }
});

// CREATION OF A MODEL
const CurrUser = mongoose.model("CurrUser",activeUser)


// ADDITION
const addCurrUser= async (Username,Email,Phone,Status)=>{
    const newRow = new CurrUser({Username:Username,Phone:Phone,Email:Email,Status:Status})
    try {
        const n = await newRow.save();
        console.log(n)
    } catch (error) {
        console.log("Failed"+error)
    }
    // CREATION
    // const newRow = new CurrUser({Username:"Naman Anand",Phone:7838038429,Email:"a.naman@iitg.ac.in",Status:"Washing"})
    // const newRow = new CurrUser({Username:"Soumya",Phone:7838702181,Email:"anandnaman844@gmail.com",Status:"Drying"})
}
module.exports.addCurrUser = addCurrUser
// addCurrUser()




// GETTING DATA
const getCurrUser= async ()=>{
    var data = await CurrUser.find({})
    return  data
}
// getCurrUser()
module.exports.getCurrUser = getCurrUser;



// EDITING DATA
const editCurrUser= async (id)=>{
    try {
        var data = await CurrUser.find({_id:id})
        return  data
    } catch (error) {
        console.log("ERROR")
    }
}
module.exports.editCurrUser = editCurrUser;
// Updating DATA
const updateCurrUser= async (ID,STATUS)=>{
    try {
        const res = await CurrUser.updateOne({_id:ID},
            {$set : {
               Status : STATUS
            }}
        )   
    } catch (error) {
        console.log("Failed To Update The Curr User Status")
    }
}
// WHENEVER ASYNC AWAIT BETTER GO WITH TRY CATCH
module.exports.editCurrUser = editCurrUser;
module.exports.updateCurrUser = updateCurrUser;



// DELETING DATA
const removeCurrUser= async (ID)=>{
    try {
        const res = await CurrUser.deleteOne({_id:ID})
    } catch (error) {
        console.log("Failed To remove from Curr Users")
    }
}
module.exports.removeCurrUser = removeCurrUser

// *************************************************************************** *//
// QUEUE
const QueueSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Phone: {
        type:Number,
        required:true,
        unique:true
    },
    Email :{
        type:String,
        required:true,
        unique:true
    },
})

const QueueUser = mongoose.model('QueueUser',QueueSchema)

// ADDITION   To QUEUE
const addQueueUser= async (Username,Email,Phone)=>{
    var newRow = new QueueUser({Username:Username,Phone:Phone,Email:Email})
    try {
        const res = await newRow.save();
        console.log(res)   
    } catch (error) {
        console.log("Failed To Enter In Queue User"+error)
    }
}
module.exports.addQueueUser = addQueueUser



// GETTING ALL DATA
const getAllQueueUser= async ()=>{
    var data = await QueueUser.find({})
    return  data
}
// getCurrUser()
module.exports.getAllQueueUser = getAllQueueUser;


// GETTING PARTICULAR DATA
const getQueueUser= async (ID)=>{
    var data = await QueueUser.find({_id:ID})
    return  data
}
// getCurrUser()
module.exports.getQueueUser = getQueueUser;


//  DELETE QUEUE USER
const deleteQueueUser= async (ID)=>{
    try {
        const z = await QueueUser.deleteOne({_id:ID})
    } catch (error) {
        console.log("Failed To remove from Queue Users")
    }
}
module.exports.deleteQueueUser = deleteQueueUser




//*******************************************************************************//
