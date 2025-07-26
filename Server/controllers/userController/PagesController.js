import User from '../../models/User.js'

export const setProfile=async(req,res)=>{
    try{
        
        
        if(!req.user){
            return res.status(401).json({message:"users not defiend....."})
        }
        const user=req.user
        console.log(user);
        return res.status(200).json({message:"the user daya profile sussefull...",user})
    }catch(error){
        res.status(401).json({message:"set profile faceing errors....."})
    }
}