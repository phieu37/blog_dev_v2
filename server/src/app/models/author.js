
// import {STATUS_ACTIVE} from "@/configs/enum";
import {createModel} from "./base";

export const Author = createModel("Author", "authors", {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    bio: {
        type: String,
        default: "",
    },
    birthday: {
        type: Number,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    // status: {
    //     type: Number,
    //     default: "",
    //     required: true,
    //     enum: Object.values(STATUS_ACTIVE),
    // },
});
