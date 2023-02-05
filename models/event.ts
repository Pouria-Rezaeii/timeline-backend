import { Schema, model } from "mongoose";

const Event = model(
   "Event",
   new Schema({
      endTime: {
         hour: {
            type: Schema.Types.Number,
            required: true,
         },
         minutes: {
            type: Schema.Types.Number,
            required: true,
         },
      },
      shortDescription: {
         type: Schema.Types.String,
         required: true,
      },
      description: {
         type: Schema.Types.String,
      },
      tags: [
         {
            type: Schema.Types.ObjectId,
            ref: "Tag",
            // required: true,
         },
      ],
      parentId: {
         type: Schema.Types.ObjectId,
         ref: "Day",
         required: true,
      },
   })
);

export { Event };
