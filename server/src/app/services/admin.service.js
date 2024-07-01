import { LINK_STATIC_URL } from "@/configs";
import { generatePassword } from "@/utils/helpers";
// import { FileUpload } from "@/utils/types";
import { Admin } from "../models";

export async function create({ name, email, password, phone, avatar, status }) {
    if (avatar) {
        avatar = avatar.save();
    }

    const admin = new Admin({
        name,
        email,
        phone,
        avatar,
        password: generatePassword(password),
        status
    });
    await admin.save();
    return admin;
}

export async function filter({ q, page, per_page, field, sort_order }) {
    q = q ? { $regex: q, $options: "i" } : null;

    const filter = {
        ...(q && { $or: [{ name: q }, { email: q }] }),
    };

    const admins = (
        await Admin.find(filter, { password: 0 })
            .skip((page - 1) * per_page)
            .limit(per_page)
            .sort({ [field]: sort_order }))
        .map((admin) => {
            if (admin.avatar) {
                admin.avatar = LINK_STATIC_URL + admin.avatar;
            }
            return admin;
        });

    const total = await Admin.countDocuments(filter);
    return { total, page, per_page, admins };
}

export async function getList({q, page, per_page, field, sort_order}, req) {
    const currentAccount = req.currentAccount;
    q = q ? {$regex: q, $options: "i"} : null;
    page = page ? parseInt(page) : 1;
    per_page = per_page ? parseInt(per_page) : 20;
    field = field || "created_at";
    sort_order = sort_order ? (sort_order === "asc" ? 1 : -1) : -1;

    const filter = {
        _id: {$ne: currentAccount._id},
        ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
    };

    const admins = (await Admin.find(filter, {password: 0})
        .skip((page - 1) * per_page)
        .limit(per_page)
        .sort({[field]: sort_order})).map((admin) => {
        if (admin.avatar) {
            admin.avatar = LINK_STATIC_URL + admin.avatar;
        }
        return admin;
    });

    const total = await Admin.countDocuments(filter);
    return {total, page, per_page, admins};
}

// export async function getList({q, page, per_page, field, sort_order}, req) {
//     const currentAccount = req.currentAccount;
//     q = q ? {$regex: q, $options: "i"} : null;
//     page = page ? parseInt(page) : 1;
//     per_page = per_page ? parseInt(per_page) : 20;
//     field = field || "created_at";
//     sort_order = sort_order ? (sort_order === "asc" ? 1 : -1) : -1;

//     const filter = {
//         _id: {$ne: currentAccount._id},
//         ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
//     };

//     const admins = await Admin.find(filter, {password: 0})
//         .skip((page - 1) * per_page)
//         .limit(per_page)
//         .sort({[field]: sort_order});

//     const total = await Admin.countDocuments(filter);
//     return {total, page, per_page, admins};
// }

export async function getTotalAdmins() {
    const total = await Admin.countDocuments({});
    return { total };
}

export async function details(adminId) {
    const admin = await Admin.findById(adminId, { password: 0 });
    admin.avatar = LINK_STATIC_URL + admin.avatar;
    return admin;
}

export async function updateAdmin(admin, { name, email, phone, status }) {
    admin.name = name;
    admin.email = email;
    admin.phone = phone;
    admin.status = status;

    // if (avatar && admin.avatar) {
    //     FileUpload.remove(admin.avatar);
    // }

    // if (avatar) {
    //     admin.avatar = avatar.save("images");
    // }

    await admin.save();
    return admin;
}

export async function changeStatus(admin, status) {
    admin.status = status;
    await admin.save();
}

export async function resetPassword(admin, new_password) {
    admin.password = generatePassword(new_password);
    await admin.save();
    return admin;
}

export async function changePassword(admin, password) {
    admin.password = generatePassword(password);
    await admin.save();
}

export async function remove(admin) {
    await Admin.deleteOne({ _id: admin._id });
}

// export async function updateProfile(currentAdmin, {name, phone}) {
//     currentAdmin.name = name;
//     // currentAdmin.email = email;
//     currentAdmin.phone = phone;
//     // if (avatar) {
//     //     if (currentAdmin.avatar) {
//     //         FileUpload.remove(currentAdmin.avatar);
//     //     }
//     //     avatar = avatar.save("images");
//     //     currentAdmin.avatar = avatar;
//     // }

//     return await currentAdmin.save();
// }

export async function updateProfile(admin, {name, phone}) {
    admin.name = name;
    admin.phone = phone;

    return await admin.save();
}