import cloudinary from "../config/cloudinary.config.js";

export const uploadFile=async(req,res)=>{
    try{
        if(!req.file){
            res.status(400).json({message:"No file upload."});
        }
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI='data:' + req.file.mimetype + ';base64,' + b64;

        const result=await cloudinary.uploader.upload(dataURI,{
            resource_type:'auto',
        });
        res.status(200).json({
            message:'File uploaded successfully',
            url:result.secure_url,
            public_id:result.public_id,
        });
    }
    catch(error){
        res.status(500).json({message:'Server error'});
        console.log(`Error in uploading:${error}`);
    }
}