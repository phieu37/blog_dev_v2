
import {ObjectId, createModel} from "./base";

export const Certificate = createModel("Certificate", "certificates", {
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    author_id: {
        type: ObjectId,
        required: true,
        ref: "Author",
    },
});
