import jwt from 'jsonwebtoken'

export const generateToken=async(data,res)=>{
const token=jwt.sign({_id:data}, 'secret', { expiresIn: '7d' });
    
  return token
  }