import { RequestHandler } from "express";
import { Event } from "../models/event";
import { isLocalDateTime, isLocalDateValid } from "../services/util";

export const getEvents: RequestHandler = async (req, res) => {
   await Event.aggregate([
      {
         $match: {
            $expr: {
               $and: [
                  { $gte: [{ $toInt: "$localDate" }, 20230203] },
                  { $lte: [{ $toInt: "$localDate" }, 20230209] },
               ],
            },
         },
      },
      { $sort: { localTime: 1 } },
      {
         $group: {
            _id: "$localDate",
            events: {
               $push: {
                  title: "$title",
                  localTime: "$localTime",
                  tags: "$tags",
                  description: "$description",
               },
            },
         },
      },
      { $project: { _id: 0, date: "$_id", events: 1 } },
      { $sort: { date: -1 } },
   ]).exec(function (err, result) {
      res.json(result);
   });
};

export const createEvent: RequestHandler = async (req, res) => {
   const { localDate, localTime, ...body } = req.body;

   if (!isLocalDateValid(localDate) || !isLocalDateTime(localTime)) {
      res.status(400).send({
         message: "localDate or localTime is not valid",
         body: { localDate, localTime },
      });
      return;
   }

   const newEvent = new Event({
      title: body.title,
      localDate: localDate,
      localTime: localTime,
      tags: body.tags,
      description: body.description,
   });

   try {
      const event = await newEvent.save();
      res.status(201).json(event);
   } catch (err) {
      res.status(400).send(err);
   }
};
