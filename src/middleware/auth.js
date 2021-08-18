const jwt= require('jsonwebtoken')
const User= require('../models/user')



const auth=async(req,res,next)=>{
    try{
        const token= req.header("Authorization").replace("Bearer ","")
        const decoded= jwt.verify(token,'thisismynewcourse')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        next()

    }catch(e){
        res.status(401).send("you are not authenticate")
    }
}


module.exports=auth





//Tests code in Postman
// if(pm.response.code  ===  200){
//     pm.environment.set('authToken',pm.response.json().token)
// }