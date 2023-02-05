"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
const mongoose_1 = require("mongoose");
const Day = (0, mongoose_1.model)("Day", new mongoose_1.Schema({
    date: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
}));
exports.Day = Day;
