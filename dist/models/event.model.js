"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const Event = (0, mongoose_1.model)("Event", new mongoose_1.Schema({
    localDate: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    localTime: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.String,
            required: true,
        },
    ],
}));
exports.Event = Event;
