import multer from 'multer';
import __dirname from '../src/utils.js';

const storage = multer.diskStorage({

    destination: function(req, file,cb){
        cb(null,__dirname+'/public/img') 
    },

    filename: function(req, file, cb){
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`) 
    }
})

export const uploader = multer({storage});