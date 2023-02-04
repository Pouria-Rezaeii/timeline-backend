import { Router } from "express";
import * as userControllers from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", userControllers.getIndex);

export default userRoutes;
