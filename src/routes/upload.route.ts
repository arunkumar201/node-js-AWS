import express, { Request, Response } from "express";

import multer from "multer";

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

uploadRoute.post("/single",upload.single('homeImages'),(req,res) => {
	const body = req.body;
	console.log(`received body is ${JSON.stringify(body)}`);
	console.log(`received file is ${JSON.stringify(req.file)}`);
	res.redirect("/")
});
export default uploadRoute;
