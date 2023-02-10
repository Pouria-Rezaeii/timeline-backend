import {Schema, model} from "mongoose";

const Tag = model(
   "Tag",
   new Schema({
      name: {
         type: Schema.Types.String,
         required: true,
      },
      color: {
         type: Schema.Types.String,
         required: true,
      },
   })
);

export {Tag};
