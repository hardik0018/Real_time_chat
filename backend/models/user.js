import mongoose from 'mongoose'

const Usershema=new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  phone:{
    type: Number,
    require:true,
    unique:true
  },
  img:{
    type:String
  },
  about:{
    type:String,
    defaut:''
  },
 gender:{
    type:String,
  }
}, {timestamp:true})

const  User=mongoose.model('user',Usershema)

export default User;