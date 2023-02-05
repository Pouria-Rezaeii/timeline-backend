import { Router } from "express";
import * as userControllers from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/events", userControllers.getEvents);
userRoutes.post("/events", userControllers.createEvent);

export default userRoutes;
