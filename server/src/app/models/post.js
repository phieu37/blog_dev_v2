
import {ObjectId, createModel} from "./base";

export const Post = createModel("Post", "posts", {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    thumbnail: {
        type: String,
        default: "",
    },
    // views: { 
    //     type: Number,
    //     default: 0 
    // },
    author_id: {
        type: ObjectId,
        required: true,
        ref: "Author",
    },
    category_ids: {
        type: [{type: ObjectId, ref: "Category"}],
        required: true,
    },
});
