import mongoose from "mongoose";

const UserSchema  = mongoose.Schema({
  fullName:{
    type:String,
    require:true
  },
  username:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type: String,
    require:true,
    minlength: 6
  },
  
  gender:{
    type:String, 
    require:true,
    enum:["male" , "female"]
  },
  profilePic:{
    type:String,
    default:""
  }
})

const User = mongoose.model("Users" , User)
export default User; 