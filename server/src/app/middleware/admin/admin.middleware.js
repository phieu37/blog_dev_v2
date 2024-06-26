import {responseError} from "@/utils/helpers";
import { Admin } from "@/app/models";
import { isValidObjectId } from "mongoose";

export const checkAdminId = async function (req, res, next) {
    const _id = req.params.adminId ;

    if (isValidObjectId(_id)) {
        const admin = await Admin.findOne({_id});
        if (admin) {
            req.admin = admin;
            return next();
        }
    }

    return responseError(res, 404, "Quản trị viên không tồn tại hoặc đã bị xóa.");
};