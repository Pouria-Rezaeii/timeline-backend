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
exports.createTag = exports.getTags = void 0;
const tag_model_1 = require("../models/tag.model");
const hexCodeArray_1 = require("../services/hexCodeArray");
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield tag_model_1.Tag.find();
    res.json(tags);
});
exports.getTags = getTags;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, color } = req.body;
    const colorIsValid = color.length === 6 &&
        color.split("").every((letter) => hexCodeArray_1.hexCodeArray.includes(letter));
    if (!colorIsValid) {
        res.status(400).send({
            message: "Color code is not valid",
            body: { color },
        });
        return;
    }
    const newTag = new tag_model_1.Tag({
        name,
        color: `#${color}`,
    });
    try {
        const event = yield newTag.save();
        res.status(201).json(event);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createTag = createTag;
