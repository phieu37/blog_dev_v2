import Joi from "joi";
import {Author, Category} from "../models";
import {MAX_STRING_SIZE} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {tryValidateOrDefault} from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "title", "category_ids", "author_id"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "asc"),
    categoryId: tryValidateOrDefault(Joi.string().trim(), ""),
    authorId: tryValidateOrDefault(Joi.string().trim(), ""),
}).unknown(true);

export const createItem = Joi.object({
    title: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tiêu đề"),
    content: Joi.string().label("Nội dung"),
    thumbnail: Joi.object({
        originalname: Joi.string().trim().required().label("Hình nhỏ"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Hình minh họa"),
    })
        .instance(FileUpload)
        // .required()
        .label("Hình minh họa"),
    author_id: Joi.string()
        .required()
        .label("Tác giả")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const author = await Author.findOne({_id: value});
                    return author ? value : helpers.error("any.notExistsAuthor");
                }),
        ),
    category_ids: Joi.array()
        .unique()
        .required()
        .label("Danh mục")
        // .custom(
        //     (value, helpers) =>
        //         new AsyncValidate(value, async function () {
        //             const category_ids = await Category.find({_id: {$in: value}});
        //             return category_ids.length === value.length ? value : helpers.error("any.notExistsCategory");
        //         }),
        // ),
});

export const updateItem = Joi.object({
    title: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Tiêu đề"),
    content: Joi.string().label("Nội dung"),
    thumbnail: Joi.object({
        originalname: Joi.string().trim().required().label("Tên ảnh"),
        mimetype: Joi.valid("image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary().required().label("Ảnh minh họa"),
    })
        .instance(FileUpload)
        // .required()
        .label("Ảnh minh họa"),
    author_id: Joi.string()
        // .required()
        .label("Tác giả")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const author = await Author.findOne({_id: value});
                    return author ? value : helpers.error("any.notExistsAuthor");
                }),
        ),
    category_ids: Joi.array()
        // .unique()
        // .required()
        .label("Danh mục")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const category_ids = await Category.find({_id: {$in: value}});
                    return category_ids.length === value.length ? value : helpers.error("any.notExistsCategory");
                }),
        ),
});
