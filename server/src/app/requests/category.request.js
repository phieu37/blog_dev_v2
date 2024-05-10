import Joi from "joi";
import {MAX_STRING_SIZE} from "@/configs";
import {tryValidateOrDefault} from "@/utils/helpers";

export const readRoot = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("name", "created_at"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Danh mục"),
    description: Joi.string().trim().max(MAX_STRING_SIZE).allow("").required().label("Mô tả"),
});

export const updateItem = Joi.object({
    name: Joi.string().trim().max(MAX_STRING_SIZE).required().label("Danh mục"),
    description: Joi.string().trim().max(MAX_STRING_SIZE).allow("").required().label("Mô tả"),
});
