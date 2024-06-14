import { STATUS_ACTIVE } from "@/configs";
import { ObjectId, createModel } from "./base";

export const Admin = createModel(
    "Admin",
    "admins",
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
        role_ids: {
            type: [{ type: ObjectId, ref: "Role" }],
            default: [],
        },
        status: {
            type: Number,
            required: true,
            enum: Object.values(STATUS_ACTIVE),
        },
    },
    {
        virtuals: {
            roles: {
                options: {
                    ref: "Role",
                    localField: "role_ids",
                    foreignField: "_id",
                },
            },
        },
    },
);
