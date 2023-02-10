import {Schema, model} from "mongoose";

const Event = model(
   "Event",
   new Schema({
      localDate: {
         type: Schema.Types.String,
         required: true,
      },
      localTime: {
         type: Schema.Types.String,
         required: true,
      },
      title: {
         type: Schema.Types.String,
         required: true,
      },
      description: {
         type: Schema.Types.String,
      },
      tags: [
         {
            type: Schema.Types.String,
            required: true,
         },
      ],
   })
);

export {Event};
