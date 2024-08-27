import express from "express";
import { PORT, mongodbURL } from "./config.js";
const app = express();
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js';
import cors from "cors";
//middleware for parsing body request
app.use(express.json());


//middleware for handling cors policy
//option1 :Allow all the origin withh default cors(*)
app.use(cors());
//option2 : allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         method: ["PUT","DELETE", "GET", "POST"],
//         allowedHeader: ['Content-Type'],
//     })
// )

app.get("/", (req, res) => {
  res.send("Welcome to mern class");
});


app.use("/books", bookRoute);

//configuring mongodb database
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App is connected to the database");
    app.listen(PORT, (request, response)=>{
        console.log(`App starting at port ${PORT}`)
    })
   
  })
  .catch((error) => {
    console.log(error);
  });
