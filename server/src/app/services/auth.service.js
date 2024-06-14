import moment from "moment";
import jwt from "jsonwebtoken";
import {Admin, User} from "../models";
import {
    ACCOUNT_TYPE, 
    cache, 
    JWT_EXPIRES_IN, 
    LINK_STATIC_URL, 
    STATUS_ACTIVE, 
    TOKEN_TYPE
} from "@/configs";
import {FileUpload} from "@/utils/types";
import {
    comparePassword,
    generatePassword,
    generateToken
} from "@/utils/helpers";

export const tokenBlocklist = cache.create("token-block-list");

export async function checkValidAdminLogin({email, password}) {
    const admin = await Admin.findOne({
        email,
        status: STATUS_ACTIVE.ACTIVE,
    });

    if (admin) {
        const verified = comparePassword(password, admin.password);
        if (verified) {
            admin.account_type = ACCOUNT_TYPE.ADMIN;
            return admin;
        }
    }

    return false;
}

export function authToken(account_id, account_type) {
    const access_token = generateToken(TOKEN_TYPE.AUTHORIZATION, {account_id, account_type}, JWT_EXPIRES_IN);
    const decode = jwt.decode(access_token);
    const expire_in = decode.exp - decode.iat;
    return {
        access_token,
        expire_in,
        auth_type: "Bearer Token",
    };
}

// export async function register({name, email, password, phone, avatar}) {
//     if (avatar) {
//         avatar = avatar.save();
//     }

//     const admin = new Admin({
//         name,
//         email,
//         password: generatePassword(password),
//         phone,
//         avatar,
//     });

//     return await admin.save();
// }

export async function blockToken(token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp;
    const now = moment().unix();
    // return await tokenBlocklist.set(token, 1, expiresIn - now);
    await tokenBlocklist.set(token, 1, expiresIn - now);
}

// export async function profile(admin_id) {
//     const admin = await Admin.findOne({_id: admin_id}, {password: 0});
//     if (admin.avatar) {
//         admin.avatar = LINK_STATIC_URL + admin.avatar;
//     }

//     return admin;
// }

export async function profile(account) {
    let result;
    switch (account.account_type) {
        case ACCOUNT_TYPE.USER:
            result = await User.findOne({_id: account._id}, {password: 0});
            break;
        case ACCOUNT_TYPE.ADMIN:
            result = await Admin.aggregate([
                {
                    $match: {_id: account._id},
                },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role_ids",
                        foreignField: "_id",
                        as: "permissions",
                    },
                },
                {
                    $addFields: {
                        permissions: "$permissions.name",
                    },
                },
                // {
                //     $project: {
                //         password: 0,
                //         role_ids: 0,
                //     },
                // },
                {
                    $project: {
                        email:1,
                        name:1,
                        phone:1,
                        status:1,
                        avatar: {
                            $cond: {
                                if: { $ne: ["$avatar", ""] }, // Nếu avatar không rỗng
                                then: { $concat: [LINK_STATIC_URL, "$avatar"] }, // Gắn LINK_STATIC_URL vào trước avatar
                                else: "" // Trả về chuỗi rỗng nếu không có avatar
                            }
                        },
                        permissions:1
                        // password: 1,
                        // role_ids: 1,
                    },
                },
            ]);
            result = result["0"] || null;
            break;
    }

    // if (account.account_type === ACCOUNT_TYPE.USER) {
    //     result = {...result.toObject(), point: decodeNum(result.point)};
    // }

    return result;
}

// export async function updateProfile(currentAdmin, {name, phone, avatar}) {
//     currentAdmin.name = name;
//     // currentAdmin.email = email;
//     currentAdmin.phone = phone;
//     if (avatar) {
//         if (currentAdmin.avatar) {
//             FileUpload.remove(currentAdmin.avatar);
//         }
//         avatar = avatar.save("images");
//         currentAdmin.avatar = avatar;
//     }

//     return await currentAdmin.save();
// }

export async function updateAvatarProfile(currentAdmin, {avatar}) {
    if (avatar) {
        if (currentAdmin.avatar) {
            FileUpload.remove(currentAdmin.avatar);
        }
        avatar = avatar.save("images");
        currentAdmin.avatar = avatar;
    }

    return await currentAdmin.save();
}

export async function resetPassword(account, new_password) {
    account.password = generatePassword(new_password);
    await account.save();
    return account;
}