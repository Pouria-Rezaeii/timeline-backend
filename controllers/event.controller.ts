import {RequestHandler} from "express";
import {Event} from "../models/event.model";
import {isLocalTimeValid, isLocalDateValid} from "../services/util";

export const getEventsByDays: RequestHandler = async (req, res) => {
   const from = (req.query["from"] || "") as string;
   const to = (req.query["to"] || "") as string;

   if (!isLocalDateValid(from) || !isLocalDateValid(to)) {
      res.status(400).send({
         message: "date-from or date-to is not provided or they are not valid",
         body: {from, to},
      });
      return;
   }

   await Event.aggregate([
      {
         $match: {
            $expr: {
               $and: [
                  {$gte: [{$toInt: "$localDate"}, Number(from)]},
                  {$lte: [{$toInt: "$localDate"}, Number(to)]},
               ],
            },
         },
      },
      {$sort: {localTime: 1}},
      {
         $group: {
            _id: "$localDate",
            events: {
               $push: {
                  _id: "$id",
                  title: "$title",
                  localTime: "$localTime",
                  tags: "$tags",
               },
            },
         },
      },
      {$project: {_id: 0, date: "$_id", events: 1}},
      {$sort: {date: -1}},
   ]).exec(function (err, result) {
      res.json(result);
   });
};

export const createEvent: RequestHandler = async (req, res) => {
   const {localDate, localTime, ...body} = req.body;

   if (!isLocalDateValid(localDate) || !isLocalTimeValid(localTime)) {
      res.status(400).send({
         message: "localDate or localTime is not valid",
         body: {localDate, localTime},
      });
      return;
   }

   if (!body.tags.length) {
      res.status(400).send({
         message: "tags is not provided",
         body: {tags: body.tags},
      });
   }

   const eventsSortedByDate = await Event.find().sort({localDate: -1}).limit(1);
   const latestEvent = eventsSortedByDate[0];
   if (
      latestEvent &&
      +latestEvent.localDate === +localDate - 1 &&
      latestEvent.localTime !== "2359"
   ) {
      // means: it's not the first event of database and this is the first event of the day && last day events are not completed yet
      await new Event({
         title: body.title,
         localDate: +localDate - 1,
         localTime: "2359",
         tags: body.tags,
         description: body.description,
      }).save();
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
