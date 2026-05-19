import mongoose from "mongoose";

const schema = new mongoose.Schema({
    price:{
        type:Number,
        required:true,
    },courseName:{
        type:String,
        required:true,

    },ownerName:{
        type:String,
        required:true,
    },userID:{
        type:String,
        required:true,
    },status:{type:Boolean, required:true},category:{type:String, required:true}
})
export default mongoose.model('Data',schema);
