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
exports.createEvent = exports.getTimelines = void 0;
const day_1 = require("../models/day");
const event_1 = require("../models/event");
const getTimelines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = req.params["page-size"] ? Number(req.params["page-size"]) : 1;
    const page = req.params.page ? Number(req.params.page) : 1;
    const count = yield day_1.Day.count();
    yield day_1.Day.find()
        .sort({ $natural: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .select("-__v")
        .populate([{ path: "events", select: { endTime: 1, shortDescription: 1, tags: 1 } }])
        .exec(function (err, result) {
        res.json({ result, page: page, count });
    });
});
exports.getTimelines = getTimelines;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const sortedDays = yield day_1.Day.find().sort({ $natural: -1 }).limit(1);
    let latestDay = sortedDays[0];
    if (!latestDay || latestDay.date !== new Date(body.date).toISOString()) {
        latestDay = yield new day_1.Day({
            date: new Date(body.date).toISOString(),
            events: [],
        }).save();
    }
    const event = yield new event_1.Event({
        endTime: {
            hour: body.endTime.hour,
            minutes: body.endTime.minutes,
        },
        shortDescription: body.shortDescription,
        description: body.description,
        tags: body.tags,
        parentId: latestDay._id,
    }).save();
    yield day_1.Day.updateOne({ _id: latestDay._id }, // filter
    { $set: { events: [...latestDay.events, event._id] } });
    res.status(201).json(event);
});
exports.createEvent = createEvent;
