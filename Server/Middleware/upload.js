import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import multer from "multer";



const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'user-profiles',
        allowed_formats:["jpg","png","jpeg"],
    },
});

const upload =multer({storage});

export default upload;