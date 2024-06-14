import jwt, {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import {isUndefined} from "lodash";
import {Admin, User} from "@/app/models";
import {tokenBlocklist} from "@/app/services/auth.service";
import {ACCOUNT_TYPE, SECRET_KEY, STATUS_ACTIVE, TOKEN_TYPE} from "@/configs";
import {responseError, getToken} from "@/utils/helpers";

export async function verifyToken(req, res, next) {
    try {
        // 1 Lấy Token Từ Header
        const token = getToken(req.headers);

        if (token) {
            // 2 Kiểm Tra Token Có Trong Danh Sách Đen Không
            const allowedToken = isUndefined(await tokenBlocklist.get(token));
            // 3 Xác Minh và giải mã Token
            if (allowedToken) {
                const {type, data} = jwt.verify(token, SECRET_KEY);

                // 4 Xử Lý Token Loại AUTHORIZATION
                if (type === TOKEN_TYPE.AUTHORIZATION) {
                    let account;
                    switch(data.account_type){
                        case ACCOUNT_TYPE.USER:
                            account = await User.findOne({_id: data.account_id, status: STATUS_ACTIVE.ACTIVE});
                            break;
                        case ACCOUNT_TYPE.ADMIN:
                            account = await Admin.findOne({_id: data.account_id, status: STATUS_ACTIVE.ACTIVE});
                            break;
                    }
                    if (account) {
                        account.account_type = data.account_type;
                        req.currentAccount = account;
                        return next();
                    }
                }

                // 5 Xử Lý Token Loại FORGOT_PASSWORD
                if (type === TOKEN_TYPE.FORGOT_PASSWORD) {
                    const account = await Admin.findOne({_id: data.account_id, status: STATUS_ACTIVE.ACTIVE});
                    
                    if (account) {
                        account.account_type = data.account_type;
                        req.currentAccount = account;
                        return next();
                    }
                }
            }
        }

        return responseError(res, 401, "Từ chối truy cập");
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
                return responseError(res, 401, "Mã xác thực đã hết hạn");
            } else if (error instanceof NotBeforeError) {
                return responseError(res, 401, "Mã xác thực không hoạt động");
            } else {
                return responseError(res, 401, "Mã xác thực không hợp lệ");
            }
        }

        return next(error);
    }
}
