import Joi from "joi";
import { Admin } from "@/app/models";
import {
    MAX_STRING_SIZE,
    VALIDATE_NAME_REGEX,
    VALIDATE_PHONE_REGEX
} from "@/configs";
import { AsyncValidate, FileUpload } from "@/utils/types";
import { comparePassword } from "@/utils/helpers";

export const login = Joi.object({
    email: Joi.string().trim().max(MAX_STRING_SIZE).lowercase().email().required().label("Email"),
    password: Joi.string().max(MAX_STRING_SIZE).required().label("Mật khẩu"),
});

// export const register = Joi.object({
//     name: Joi.string()
//         .trim()
//         .max(MAX_STRING_SIZE)
//         .required()
//         .label("Họ và tên")
//         .replace(/ + /g, " ")
//         .lowercase()
//         .pattern(VALIDATE_NAME_REGEX)
//         // .pattern(new RegExp(VALIDATE_NAME_REGEX))
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async function () {
//                     return VALIDATE_NAME_REGEX.test(value) ? value : helpers.error("string.invalidName");
//                 }),
//         ),
//     email: Joi.string()
//         .trim()
//         .max(MAX_STRING_SIZE)
//         .lowercase()
//         .email()
//         .required()
//         .label("Email")
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async function () {
//                     const user = await Author.findOne({email: value});
//                     return !user ? value : helpers.error("any.exists");
//                 }),
//         ),
//     password: Joi.string().min(6).max(MAX_STRING_SIZE).required().label("Mật khẩu"),
//     phone: Joi.string()
//         .trim()
//         .pattern(VALIDATE_PHONE_REGEX)
//         .allow("")
//         .required()
//         .label("Số điện thoại")
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async function () {
//                     const user = await Author.findOne({phone: value});
//                     return !user ? value : helpers.error("any.exists");
//                 }),
//         ),
//     avatar: Joi.object({
//         originalname: Joi.string().trim().required().label("Tên ảnh"),
//         mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
//             .required()
//             .label("Định dạng ảnh"),
//         buffer: Joi.binary().required().label("Ảnh đại diện"),
//     })
//         .instance(FileUpload)
//         .allow("")
//         .label("Ảnh đại diện")
//         // .required(),

//     // avatar: Joi.alternatives().try(
//     //     Joi.object({
//     //         originalname: Joi.string().trim().required().label("Tên ảnh"),
//     //         mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
//     //             .required()
//     //             .label("Định dạng ảnh"),
//     //         buffer: Joi.binary().required().label("Ảnh đại diện"),
//     //     })
//     //         .instance(FileUpload)
//     //         .required(),
//     //     Joi.array()
//     //         .items(
//     //             Joi.object({
//     //                 originalname: Joi.string().trim().required().label("Tên ảnh"),
//     //                 mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
//     //                     .required()
//     //                     .label("Định dạng ảnh"),
//     //                 buffer: Joi.binary().required().label("Ảnh đại diện"),
//     //             })
//     //                 .instance(FileUpload)
//     //                 .required(),
//     //         )
//     //         .label("Danh sách ảnh đại diện")
//     //         .max(3)
//     //         .allow("")
//     //         .required(),
//     // ),
// });

export const updateAvatarProfile = Joi.object({
    avatar: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow("")
        .label("Ảnh đại diện")
});

export const updateProfile = Joi.object({
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
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow("")
        // .required()
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const admin = await Admin.findOne({
                        phone: value,
                        _id: { $ne: req.currentAccount._id }
                    });
                    return !admin ? value : helpers.error("any.exists");
                }),
        ),
    // email: Joi.string()
    //     .trim()
    //     .lowercase()
    //     .email()
    //     .max(MAX_STRING_SIZE)
    //     .required()
    //     .label("Email")
    //     .custom(
    //         (value, helpers) =>
    //             new AsyncValidate(value, async function (req) {
    //                 const user = await Author.findOne({email: value, _id: {$ne: req.currentAuthor._id}});
    //                 return !user ? value : helpers.error("any.exists");
    //             }),
    //     ),
    // name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Họ và tên"),
    // phone: Joi.string()
    //     .trim()
    //     .pattern(VALIDATE_PHONE_REGEX)
    //     .allow("")
    //     .label("Số điện thoại")
    //     .custom((value, helpers) => {
    //         if (value) {
    //             return new AsyncValidate(value, async function (req) {
    //                 const admin = await Admin.findOne({
    //                     phone: value,
    //                     deleted: false,
    //                     _id: {$ne: req.currentAccount._id},
    //                 });
    //                 return !admin ? value : helpers.error("any.exists");
    //             });
    //         }
    //         return value;
    //     }),
    // avatar: Joi.object({
    //     originalname: Joi.string().trim().required().label("Tên ảnh"),
    //     mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
    //         .required()
    //         .label("Định dạng ảnh"),
    //     buffer: Joi.binary().required().label("Ảnh đại diện"),
    // })
    //     .instance(FileUpload)
    //     .allow("")
    //     .label("Ảnh đại diện")
    //    // .required(),
    // avatar: Joi.alternatives().try(
    //     Joi.object({
    //         originalname: Joi.string().trim().required().label("Tên ảnh"),
    //         mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
    //             .required()
    //             .label("Định dạng ảnh"),
    //         buffer: Joi.binary().required().label("Ảnh đại diện"),
    //     })
    //         .instance(FileUpload)
    //         .required(),
    //     Joi.array()
    //         .items(
    //             Joi.object({
    //                 originalname: Joi.string().trim().required().label("Tên ảnh"),
    //                 mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
    //                     .required()
    //                     .label("Định dạng ảnh"),
    //                 buffer: Joi.binary().required().label("Ảnh đại diện"),
    //             })
    //                 .instance(FileUpload)
    //                 .required(),
    //         )
    //         .label("Danh sách ảnh đại diện")
    //         .max(3)
    //         .allow("")
    //         .required(),
    // ),
});

export const changePassword = Joi.object({
    password: Joi.string()
        .required()
        .label("Mật khẩu cũ")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, (req) =>
                    comparePassword(value, req.currentAccount.password)
                        ? value
                        : helpers.message("{#label} không chính xác"),
                ),
        ),
    new_password: Joi.string()
        .min(8)
        .max(MAX_STRING_SIZE)
        .required()
        .label("Mật khẩu mới")
        .invalid(Joi.ref("password")),
});

// export const forgotPassword = Joi.object({
//     email: Joi.string()
//         .trim()
//         .required()
//         .max(MAX_STRING_SIZE)
//         .label("Email")
//         .custom(
//             (value, helpers) =>
//                 new AsyncValidate(value, async function (req) {
//                     const admin = await Admin.findOne({
//                         email: value,
//                         deleted: false,
//                     });
//                     if (!admin) {
//                         return helpers.error("any.not-exists");
//                     }
//                     if (admin.status === STATUS_ACTIVE.INACTIVE) {
//                         return helpers.error("any.locked");
//                     }
//                     req.adminForgotPassword = admin;
//                     return value;
//                 }),
//         ),
// });

// export const resetPassword = Joi.object({
//     password: Joi.string()
//         .min(8)
//         .max(MAX_STRING_SIZE)
//         .pattern(VALIDATE_PASSWORD_REGEX)
//         .required()
//         .label("Mật khẩu mới"),
// });
