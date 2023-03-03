import {RequestHandler} from "express";
import {Event} from "../models/event.model";
import {isLocalTimeValid, isLocalDateValid} from "../services/util";

export const getEventsByDays: RequestHandler = async (req, res) => {
   const {query} = req;
   const from = (query["from"] || "") as string;
   const to = (query["to"] || "") as string;
   const pageSize = Number(query["page-size"] || 5);
   const page = Number(query.page || 1);

   if ((from && !isLocalDateValid(from)) || (to && !isLocalDateValid(to))) {
      res.status(400).send({
         message: "date-from or date-to is not valid",
         body: {from, to},
      });
      return;
   }

   Event.aggregate([
      {
         $match: {
            $expr: {
               $and: [
                  {$gte: [{$toInt: "$localDate"}, Number(from || 0)]},
                  {$lte: [{$toInt: "$localDate"}, Number(to || 99999999)]},
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
                  _id: "$_id",
                  title: "$title",
                  localTime: "$localTime",
                  tags: "$tags",
                  description: "$description",
               },
            },
         },
      },
      {$sort: {_id: -1}},
      {$skip: pageSize * (page - 1)},
      {$limit: Math.min(pageSize, 10)},
      {$project: {_id: 0, date: "$_id", events: 1}},
   ]).exec(function (err, result) {
      res.json({result, page});
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
   if (latestEvent && latestEvent.localTime !== "2359") {
      // means: it's not the first event of the database && last day events are not completed yet
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

export const deleteEvent: RequestHandler = async (req, res) => {
   const event = await Event.findByIdAndDelete(req.params.id);
   res.json(event);
};
