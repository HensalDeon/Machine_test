import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import bodyParser from "body-parser";

/**Routes */
import authRouter from "./routes/authRouter.js"
import blogRouter from "./routes/blogRouter.js";

import dotenv    from "dotenv";
dotenv.config();
const app = express();

/** middlewears */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.disable("x-powered-by"); //less hackers know about our stack


/** HTTP GET request */
app.get("/", (req, res) => {
    res.status(201).json("Home GET request");
});

/** api routes */
app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

/** start server when only we have a valid connection*/
connect().then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server connected to http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the server");
    } 
}).catch(error =>{
    console.log("Inavlid database connection");
})
