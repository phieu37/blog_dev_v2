
import {ObjectId, createModel} from "./base";

export const Category = createModel("Category", "categories", {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    post_ids: {
        type: [{type: ObjectId, ref: "Post"}],
        default: [],
    },
});
