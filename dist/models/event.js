"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const Event = (0, mongoose_1.model)("Event", new mongoose_1.Schema({
    endTime: {
        hour: {
            type: mongoose_1.Schema.Types.Number,
            required: true,
        },
        minutes: {
            type: mongoose_1.Schema.Types.Number,
            required: true,
        },
    },
    shortDescription: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag",
            // required: true,
        },
    ],
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Day",
        required: true,
    },
}));
exports.Event = Event;
