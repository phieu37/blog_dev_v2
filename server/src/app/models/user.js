import { STATUS_ACTIVE } from "@/configs";
import { createModel } from "./base";

export const User = createModel(
    "User",
    "users",
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        status: {
            type: Number,
            required: true,
            enum: Object.values(STATUS_ACTIVE),
        },
    },
);
