import dbConnect from "../../../../utils/dbconnect";
const Note = require("../../../../models/note");

dbConnect();

export default async(req,res)=>{
    const {query: {id}, method} =  req;
    console.log("ID Method: ", method);
    console.log("ID URI", req.url)

    switch(method){
        case "GET": 
        try{
            const note = await Note.findById(id);
            if(!note){
                return res.status(400).json({success: false});
            }
            res.status(200).json({success: true, data: note});
        }catch(error){res.status(400).json({success: false})}
        break;
        case "PUT":
            try{
                const note = await Note.findByIdAndUpdate(id,req.body,{
                    new: true,
                    runValidators: true
                })
                res.status(200).json({success: true})
            }catch(error){res.status(400).json({success: false})}
            break;
        case "DELETE":
            
            try{
                const deletedNote = await Note.deleteOne({_id: id});
                if(!deletedNote){
                    return( res.status(404).json({success: false}))
                }
                res.status(200).json({success: true})
            }catch(error){res.status(400).json({success:false})} break;
        default: res.status(400); break;
    }       

}