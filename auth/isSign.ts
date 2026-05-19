import express from 'express';
import bcrypt from 'bcrypt';
import users from "../database/users";
import error from '../class/error'
import successfully from "../class/successfully";
const router = express.Router();
router.use(express.json());
router.get('/' , async (req,res,next)=>{
    try{
        const session = (req.session as any).userId
        if(!session){
            res.status(200).json({isSign:false});
            return;
        }
        res.status(200).json({isSign:true ,ID:session});
        }catch (e){
        next(e)
    }
})
export default router;