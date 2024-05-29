import Joi from "joi";
import {Author} from "../models";
import {MAX_STRING_SIZE, VALIDATE_NAME_REGEX} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {tryValidateOrDefault} from "@/utils/helpers";
import {STATUS_ACTIVE} from "@/configs/enum";
import {convertToTimestamp} from "@/utils/helpers/timestamp.helper";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    status: tryValidateOrDefault(Joi.number().valid(...Object.values(STATUS_ACTIVE)), null),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at","name", "email"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Họ và tên")
        .replace(/ + /g, " ")
        .lowercase()
        .pattern(VALIDATE_NAME_REGEX)
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    return VALIDATE_NAME_REGEX.test(value) ? value : helpers.error("string.invalidName");
                }),
        ),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const author = await Author.findOne({email: value});
                    return !author ? value : helpers.error("any.exists");
                }),
        ),
    bio: Joi.string().trim().allow("").min(0).max(1000),
    birthday: Joi.string()
        .allow("")
        .required()
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
    // status: Joi.number()
    //     .valid(...Object.values(STATUS_ACTIVE))
    //     .required()
    //     .label("Trạng thái"),
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .label("Ảnh đại diện")
        .allow(""),
    // .required(),
    certificate: Joi.string().trim().allow("").max(MAX_STRING_SIZE).label("Chứng chỉ").required(),
    date: Joi.string()
        .allow("")
        .required()
        .label("Định dạng ngày")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
});

export const updateItem = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Họ và tên")
        .replace(/ + /g, " ")
        .lowercase()
        .pattern(VALIDATE_NAME_REGEX)
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    return VALIDATE_NAME_REGEX.test(value) ? value : helpers.error("string.invalidName");
                }),
        ),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const authorId = req.params.id;
                    const author = await Author.findOne({
                        email: value,
                        _id: {$ne: authorId},
                    });
                    return !author ? value : helpers.error("any.exists");
                }),
        ),
    bio: Joi.string().trim().allow("").max(1000),
    birthday: Joi.string()
        .allow("")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
    // status: Joi.number()
    //     .valid(...Object.values(STATUS_ACTIVE))
    //     .required()
    //     .label("Trạng thái"),
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện"),
    certificate: Joi.string().trim().max(MAX_STRING_SIZE).label("Chứng chỉ"),
    date: Joi.string()
        .allow("")
        .label("Định dạng ngày")
        .custom((value, helpers) => convertToTimestamp(value, helpers)),
});
