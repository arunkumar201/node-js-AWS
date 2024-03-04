import express, { Request, Response } from "express";

import multer from "multer";
import { uploadObject } from "../s3/uploadObject";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, '-')
		cb(null,uniqueSuffix + "-" + file.originalname
		)
  }
})


const upload = multer({storage })

const uploadRoute = express.Router(); 
uploadRoute.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to the Rest Api with ts- upload APIS" });
});

uploadRoute.post("/single",upload.single('homeImages'),async (req,res) => {
  const body = req.body;
  if (!req.file) {
    return res.status(200).json({
       message:"file not found"
    })
  }     
  const file =req.file.buffer;
  await uploadObject(Buffer.from(file), req.file.filename)
	console.log(`received body is ${JSON.stringify(body)}`);
	console.log(`received file is ${JSON.stringify(req.file)}`);
	res.redirect("/")
});
export default uploadRoute;
