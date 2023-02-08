import { Router } from "express";
import * as userControllers from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/events", userControllers.getEvents);
userRoutes.post("/events", userControllers.createEvent);

userRoutes.get("/tags", userControllers.getTags);
userRoutes.post("/tags", userControllers.createTag);

export default userRoutes;
