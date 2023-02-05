import { RequestHandler } from "express";
import { Day } from "../models/day";
import { Event } from "../models/event";

export const getTimelines: RequestHandler = async (req, res) => {
   const pageSize = req.params["page-size"] ? Number(req.params["page-size"]) : 1;
   const page = req.params.page ? Number(req.params.page) : 1;

   const count = await Day.count();
   await Day.find()
      .sort({ $natural: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select("-__v")
      .populate([{ path: "events", select: { endTime: 1, shortDescription: 1, tags: 1 } }])
      .exec(function (err, result) {
         res.json({ result, page: page, count });
      });
};

export const createEvent: RequestHandler = async (req, res) => {
   const body = req.body;
   const sortedDays = await Day.find().sort({ $natural: -1 }).limit(1);
   let latestDay = sortedDays[0];

   if (!latestDay || latestDay.date !== new Date(body.date).toISOString()) {
      latestDay = await new Day({
         date: new Date(body.date).toISOString(),
         events: [],
      }).save();
   }
   const event = await new Event({
      endTime: {
         hour: body.endTime.hour,
         minutes: body.endTime.minutes,
      },
      shortDescription: body.shortDescription,
      description: body.description,
      tags: body.tags,
      parentId: latestDay._id,
   }).save();

   await Day.updateOne(
      { _id: latestDay._id }, // filter
      { $set: { events: [...latestDay.events, event._id] } }
   );

   res.status(201).json(event);
};
