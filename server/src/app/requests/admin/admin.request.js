import Joi from "joi";
import {Admin} from "../../models";
import {MAX_STRING_SIZE, STATUS_ACTIVE, VALIDATE_NAME_REGEX, VALIDATE_PASSWORD_REGEX, VALIDATE_PHONE_REGEX} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {tryValidateOrDefault} from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "email", "phone"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createAdmin = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_NAME_REGEX)
        .required()
        .label("Họ và tên"),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await Admin.findOne({email: value});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow("")
        // .required()
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const user = await Admin.findOne({phone: value});
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
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
    // .required(),
    status: Joi.number().valid(STATUS_ACTIVE.ACTIVE, STATUS_ACTIVE.INACTIVE).required().label("Trạng thái"),
});

export const updateAdmin = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_NAME_REGEX)
        .required()
        .label("Họ và tên"),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const adminId = req.admin._id;
                    // const adminId = req.params.id;
                    const admin = await Admin.findOne({
                        email: value,
                        _id: {$ne: adminId}
                    });
                    return !admin ? value : helpers.error("any.exists");
                }),
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow("")
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const adminId = req.admin._id;
                    const admin = await Admin.findOne({
                        phone: value,
                        _id: {$ne: adminId}
                    });
                    return !admin ? value : helpers.error("any.exists");
                }),
        ),
    // phone: Joi.string()
    //     .trim()
    //     .pattern(VALIDATE_PHONE_REGEX)
    //     .allow("")
    //     // .required()
    //     .label("Số điện thoại")
    //     .custom(
    //         (value, helpers) =>
    //             new AsyncValidate(value, async function (req) {
    //                 const userId = req.params.id;
    //                 const user = await Admin.findOne({
    //                     phone: value,
    //                     _id: {$ne: userId}
    //                 });
    //                 return !user ? value : helpers.error("any.exists");
    //             }),
    //     ),
    // password: Joi.string().min(6).max(MAX_STRING_SIZE).label("Mật khẩu"),
    // avatar: Joi.object({
    //     originalname: Joi.string().trim().required().label("Tên ảnh"),
    //     mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
    //         .required()
    //         .label("Định dạng ảnh"),
    //     buffer: Joi.binary().required().label("Ảnh đại diện"),
    // })
    //     .instance(FileUpload)
    //     .allow("")
    //     .label("Ảnh đại diện"),
    // .required(),
    status: Joi.number().valid(STATUS_ACTIVE.ACTIVE, STATUS_ACTIVE.INACTIVE).required().label("Trạng thái"),
});

export const changeStatus = Joi.object({
    status: Joi.number()
        .valid(STATUS_ACTIVE.ACTIVE, STATUS_ACTIVE.INACTIVE)
        .required()
        .label("Trạng thái"),
});

export const resetPassword = Joi.object({
    new_password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .required()
        .label("Mật khẩu"),
});

export const changePassword = Joi.object({
    password: Joi.string()
        .min(6)
        .max(MAX_STRING_SIZE)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .required()
        .label("Mật khẩu"),
});