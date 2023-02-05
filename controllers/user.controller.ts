import { RequestHandler } from "express";
import { Event } from "../models/event";

export const getEvents: RequestHandler = async (req, res) => {
   await Event.aggregate([
      // {
      //    $match: {
      //       localDate: {
      //          $gte: [{ $toInt: "$localDate" }, "200"],
      //          $lte: [{ $toInt: "$localDate" }, "20000000"],
      //       },
      //    },
      // },
      // {
      //    $group: {
      //       _id: { $dateToString: { format: "%Y-%m-%d", date: "$endDateTime" } },
      //       events: {
      //          $push: {
      //             title: "$title",
      //             endDate: { $dateToString: { format: "%H:%M", date: "$endDateTime" } },
      //             description: "$description",
      //             tags: "$tags",
      //          },
      //       },
      //    },
      // },
   ]).exec(function (err, result) {
      res.json(result);
   });
};

export const createEvent: RequestHandler = async (req, res) => {
   const body = req.body;

   const newEvent = new Event({
      title: body.title,
      localDate: body.localDate,
      localTime: body.localTime,
      tags: body.tags,
      description: body.description,
   });

   const event = await newEvent.save();

   res.status(201).json(event);
};
