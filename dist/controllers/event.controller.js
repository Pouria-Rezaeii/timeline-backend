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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.getEventsByDays = void 0;
const event_model_1 = require("../models/event.model");
const util_1 = require("../services/util");
const getEventsByDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = (req.query["from"] || "");
    const to = (req.query["to"] || "");
    if (!(0, util_1.isLocalDateValid)(from) || !(0, util_1.isLocalDateValid)(to)) {
        res.status(400).send({
            message: "date-from or date-to is not provided or they are not valid",
            body: { from, to },
        });
        return;
    }
    yield event_model_1.Event.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $gte: [{ $toInt: "$localDate" }, Number(from)] },
                        { $lte: [{ $toInt: "$localDate" }, Number(to)] },
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
                        _id: "$id",
                        title: "$title",
                        localTime: "$localTime",
                        tags: "$tags",
                    },
                },
            },
        },
        { $project: { _id: 0, date: "$_id", events: 1 } },
        { $sort: { date: -1 } },
    ]).exec(function (err, result) {
        res.json(result);
    });
});
exports.getEventsByDays = getEventsByDays;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { localDate, localTime } = _a, body = __rest(_a, ["localDate", "localTime"]);
    if (!(0, util_1.isLocalDateValid)(localDate) || !(0, util_1.isLocalTimeValid)(localTime)) {
        res.status(400).send({
            message: "localDate or localTime is not valid",
            body: { localDate, localTime },
        });
        return;
    }
    if (!body.tags.length) {
        res.status(400).send({
            message: "tags is not provided",
            body: { tags: body.tags },
        });
    }
    const eventsSortedByDate = yield event_model_1.Event.find().sort({ localDate: -1 }).limit(1);
    const latestEvent = eventsSortedByDate[0];
    if (latestEvent &&
        +latestEvent.localDate === +localDate - 1 &&
        latestEvent.localTime !== "2359") {
        // means: it's not the first event of database and this is the first event of the day && last day events are not completed yet
        yield new event_model_1.Event({
            title: body.title,
            localDate: +localDate - 1,
            localTime: "2359",
            tags: body.tags,
            description: body.description,
        }).save();
    }
    const newEvent = new event_model_1.Event({
        title: body.title,
        localDate: localDate,
        localTime: localTime,
        tags: body.tags,
        description: body.description,
    });
    try {
        const event = yield newEvent.save();
        res.status(201).json(event);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createEvent = createEvent;
