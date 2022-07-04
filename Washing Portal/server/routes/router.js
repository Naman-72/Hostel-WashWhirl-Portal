const express = require('express');
const router = express.Router()
const db = require('../database/connection');
const { mail } = require('../mail/mail');

// db.getCurrUser()

// NOTE* DONT FORGET TO RELOAD WHILE CHECK
router.get('/', async (req,res)=>{
    let users = await db.getCurrUser()
    let queueusers = await db.getAllQueueUser()
    res.render('base',{users : users,queueusers:queueusers})
})





// ADD CURR USER
router.get('/addUser',((req,res)=>{
    res.render('addUser.ejs')
}))

router.post('/addUser', async (req,res)=>{
    try {
        let res = await db.addCurrUser(req.body.Username,req.body.Email,req.body.Phone,req.body.Status)
        // console.log(res)
    } catch (error) {
        console.log("Sorry ! Failed To Add To Curr User")
    }
    res.redirect('/')
})


// ADD IN QUEUE 
router.get('/addQueue',((req,res)=>{
    res.render('addQueue.ejs')
}))

router.post('/addQueue', async (req,res)=>{
    try {
        let a = await db.addQueueUser(req.body.Username,req.body.Email,req.body.Phone)
    } catch (error) {
        console.log("Sorry ! Failed To Add To Queue User "+error)
    }
    res.redirect('/')
})



// EDIT STATUS OF CURR USER
router.get('/editStatus/:id',async (req,res)=>{
    let data = await db.editCurrUser(req.params.id)
    res.render('editStatus',{userdata:data[0]})
})
router.post('/editStatus/:id',async (req,res)=>{
    try {
      await  db.updateCurrUser(req.params.id,req.body.Status.toString())
    } catch (error) {
        console.log("Please Try Again")
    }
    // console.log(req.body.Status)
    res.redirect('/')
})





// DELETE CURR USER
router.get('/remove/:id',async (req,res)=>{
    let data = await db.editCurrUser(req.params.id)
    console.log(data)
    res.render('deleteUser',{userdata:data[0]})
})
router.post('/remove/:id',async (req,res)=>{
    db.removeCurrUser(req.params.id)
    console.log("HELLO")
    try {
        await mail()
        console,log("WORLD")
    } catch (error) {
        console.log(error)
    }
    res.redirect('/')
})

// DELETE QUEUE USER
router.get('/removeFromQueue/:id', async (req,res)=>{
    try {
        let data = await db.getQueueUser(req.params.id)
        console.log(data)
        res.render('removeFromQueue',{userdata:data})
    } catch (error) {
        console.log("Mistake In Get Remove From Queue")
    }
})
router.post('/removeFromQueue/:id', async (req,res)=>{
    try {
        let data = await db.deleteQueueUser(req.params.id)
    } catch (error) {
        console.log("Mistake In Get Remove From Queue")
    }
    res.redirect('/')
})


router.get('*',(req,res)=>{
    res.render('404page')
})
module.exports.router = router