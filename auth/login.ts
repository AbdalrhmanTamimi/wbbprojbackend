import express from 'express';
import bcrypt from 'bcrypt';
import users from "../database/users";
import error from '../class/error'
import successfully from "../class/successfully";
const router = express.Router();
router.use(express.json());
router.post('/' , async (req,res,next)=>{
    try{
    const body = req.body as {username:string , password:string};
    const user = await users.findOne({username:body.username})
    if(!user) {
        return res.status(error.error('').status).json(error.error('no user found').json);
    }
    if(!await bcrypt.compare(body.password, user.password)) {
        return res.status(error.error('').status).json(error.error('worng password').json);
    }else{
        (req.session as any).userId = user._id;
        return res.status(successfully.done('').status).json(successfully.done('done sign in').json);
    }}catch (e){
        next(e)
    }
})
export default router;
