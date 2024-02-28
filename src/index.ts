import bodyParser, { urlencoded } from "body-parser";
import express, { Request, Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import { ENVConfig } from "./config/env.config";
import { PORT } from "./constants/index";
import cors from "cors";
import learningRoute from "./routes/learning.route";
import { limiter } from "./middleware/limiter/rateLimiter.middleware";
import passport from "passport";
import passportAuth from "./config/passport.config";
import status from 'express-status-monitor'
import uploadRoute from "./routes/upload.route";
import userRoutes from "./routes/crud.route";

const app = express();
app.use(limiter);
app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(status())
app.set("view engine","ejs");
app.set("views","./views");
app.use(passport.initialize());
passportAuth.initialize();


//Database Instance
const db = new Database(ENVConfig.DATABASE_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: ENVConfig.DB_NAME,
} as ConnectOptions);

//Connect with DATABASE
db.connect().catch((err: unknown) =>
	console.error("Error connecting to database:", err)
);

//homepage 
app.get("/",(_,res) => {
	return res.render("homePage")
})
//getting server status
app.get("/server-status", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is up running! ",
	});
});

app.use('/upload',uploadRoute)

//middlewares
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//Routes
app.use(userRoutes);
app.use('/learning',learningRoute)

app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
	console.log(`http://localhost:${PORT}/server-status`);
});
