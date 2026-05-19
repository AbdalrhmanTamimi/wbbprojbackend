import users from "../database/users";
import express from 'express';
import error from "../class/error";
import bcrypt from "bcrypt";
import successfully from "../class/successfully";
const router = express.Router();
router.post('/' ,async (req,res,next)=>{
    try {
        const body = req.body as {username:string,password:string};
        if(await users.findOne({username:body.username})){
           return  res.status(error.error('').status).json(error.error('this username already exists'));
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = new users({username:body.username , password:hashedPassword});
        await newUser.save();
        (req.session as any).userId = newUser._id;
        return res.status(successfully.created('').status).json(successfully.created('done create user').json);
    }catch(e){
        next(e)
    }
})
export default router;