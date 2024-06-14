import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import {Admin} from "@/app/models";

export const checkAdminId = async function (req, res, next) {
    const _id = req.params.id;

    if (isValidObjectId(_id)) {
        const admin = await Admin.findOne({_id});
        if (admin) {
            req.admin = admin;
            return next();
        }
    }

    return responseError(res, 404, "Người dùng không tồn tại hoặc đã bị xóa");
};

