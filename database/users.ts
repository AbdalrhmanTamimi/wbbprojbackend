import mongoose from "mongoose";
const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        trim:true,
        unique: true

    },password:{
        type:String,
        required:true,
    
    }

})
export default mongoose.model('Users',schema);
