"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.getEvents = void 0;
const event_1 = require("../models/event");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield event_1.Event.aggregate([
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
});
exports.getEvents = getEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newEvent = new event_1.Event({
        title: body.title,
        localDate: body.localDate,
        localTime: body.localTime,
        tags: body.tags,
        description: body.description,
    });
    const event = yield newEvent.save();
    res.status(201).json(event);
});
exports.createEvent = createEvent;
