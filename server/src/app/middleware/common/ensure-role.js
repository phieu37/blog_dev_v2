import {responseError} from "@/utils/helpers";

// kiểm tra quyền truy cập của người dùng dựa trên loại tài khoản (account_type) 
export const ensureRole = (type) => (req, res, next) => {
    if (req.currentAccount.account_type === type) return next();
    return responseError(res, 403, "Không có quyền truy cập.");
};
