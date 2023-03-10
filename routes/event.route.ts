import {Router} from "express";
import * as eventControllers from "../controllers/event.controller";

const eventRoutes = Router();

eventRoutes.get("/events-by-days", eventControllers.getEventsByDays);
eventRoutes.post("/events", eventControllers.createEvent);
eventRoutes.delete("/events/:id", eventControllers.deleteEvent);

export default eventRoutes;
