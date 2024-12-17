import mongoose from 'mongoose'

const MessageSchema =new mongoose.Schema({
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  receverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  messagetext:{
    type: String
  },
  picture:{
    type: String
  },
  documant:{
    type: String
  },read:{
    type: Boolean,
    default:false
  }
}, {timestamp:true})

const Message=mongoose.model('message',MessageSchema)

export default Message