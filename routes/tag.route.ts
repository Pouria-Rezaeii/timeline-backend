import {Router} from "express";
import * as tagControllers from "../controllers/tag.controller";

const tagRoutes = Router();

tagRoutes.get("/tags", tagControllers.getTags);
tagRoutes.post("/tags", tagControllers.createTag);

export default tagRoutes;
