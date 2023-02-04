import dotenv from "dotenv";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user";

dotenv.config();
const app = express();
const URI = `mongodb+srv://PouriaRezaei:${process.env.MONGODB_PASS}@cluster0.uxmyd.mongodb.net/timeline?retryWrites=true&w=majority`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
   next();
});

app.use(userRoutes);

mongoose
   .connect(URI)
   .then(() =>
      app.listen(4000, () => {
         console.log("Server is running...");
      })
   )
   .catch((err) => console.log(err));
