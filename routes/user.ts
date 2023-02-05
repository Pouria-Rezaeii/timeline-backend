import { Router } from "express";
import * as userControllers from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/timelines", userControllers.getTimelines);
userRoutes.post("/event", userControllers.createEvent);

export default userRoutes;
