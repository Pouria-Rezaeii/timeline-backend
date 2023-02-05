import { Schema, model } from "mongoose";

const Day = model(
   "Day",
   new Schema({
      date: {
         type: Schema.Types.String,
         required: true,
      },
      events: [
         {
            type: Schema.Types.ObjectId,
            ref: "Event",
         },
      ],
   })
);

export { Day };
