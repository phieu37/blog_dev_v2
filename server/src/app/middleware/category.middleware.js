import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import {Category} from "@/app/models";

export const checkCategoryId = async function (req, res, next) {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const category = await Category.findOne({_id});
        if (category) {
            req.category = category;
            return next();
        }
    }

    return responseError(res, 404, "Danh sách không tồn tại hoặc đã bị xóa");
};
