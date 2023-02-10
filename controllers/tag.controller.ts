import {RequestHandler} from "express";
import {Tag} from "../models/tag.model";
import {hexCodeArray} from "../services/hexCodeArray";

export const getTags: RequestHandler = async (req, res) => {
   const tags = await Tag.find();
   res.json(tags);
};

export const createTag: RequestHandler = async (req, res) => {
   const {name, color} = req.body;

   const colorIsValid =
      color.length === 6 &&
      color.split("").every((letter: string) => hexCodeArray.includes(letter));

   if (!colorIsValid) {
      res.status(400).send({
         message: "Color code is not valid",
         body: {color},
      });
      return;
   }

   const newTag = new Tag({
      name,
      color: `#${color}`,
   });

   try {
      const event = await newTag.save();
      res.status(201).json(event);
   } catch (err) {
      res.status(400).send(err);
   }
};
