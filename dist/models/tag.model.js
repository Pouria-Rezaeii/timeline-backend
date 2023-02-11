"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const mongoose_1 = require("mongoose");
const Tag = (0, mongoose_1.model)("Tag", new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    color: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
}));
exports.Tag = Tag;
