import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import eventRoutes from "./routes/event.route";
import tagRoutes from "./routes/tag.route";

dotenv.config();
const app = express();
const URI = `mongodb+srv://PouriaRezaei:${process.env.MONGODB_PASS}@cluster0.uxmyd.mongodb.net/timeline?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors({origin: "*", optionsSuccessStatus: 200}));

app.use((req, res, next) => {
   // console.log("+++++++++++++++++++++++ Body: ", req.body);
   next();
});

app.use(eventRoutes);
app.use(tagRoutes);

mongoose
   .connect(URI)
   .then(() =>
      app.listen(4000, () => {
         console.log("Server is running...");
      })
   )
   .catch((err) => console.log(err));
