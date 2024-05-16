import { FileUpload } from "@/utils/types";
import { Author, Certificate, Post } from "../models";
import { 
    // DEFAULT_AVATAR_PATH, 
    LINK_STATIC_URL } from "@/configs";

export async function create({ 
    name, email, bio, birthday, avatar, 
    // status, 
    certificate, date }) {
    // avatar = avatar ? avatar.save() : DEFAULT_AVATAR_PATH + avatar;
    if (avatar) {
        avatar = avatar.save();
    }

    const newAuthor = new Author({
        name,
        email,
        bio,
        birthday,
        avatar,
        // status,
    });
    const savedAuthor = await newAuthor.save();

    const newCertificate = new Certificate({
        name: certificate,
        date,
        author_id: savedAuthor._id,
    });

    await newCertificate.save();
}

export async function filter({ q, page, per_page, field, sort_order }) {
    q = q ? { $regex: q, $options: "i" } : null;

    const filter = {
        ...(q && { $or: [{ name: q }, { email: q }] }),
    };

    const authors = await Author.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "certificates",
                localField: "_id",
                foreignField: "author_id",
                as: "certificate",
            },
        },
        {
            $unwind: {
                path: "$certificate",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                bio: 1,
                birthday: 1,
                avatar: {
                    $cond: {
                        if: { $ne: ["$avatar", ""] }, // Nếu avatar không rỗng
                        then: { $concat: [LINK_STATIC_URL, "$avatar"] }, // Gắn LINK_STATIC_URL vào trước avatar
                        else: "" // Trả về chuỗi rỗng nếu không có avatar
                    }
                },
                // status: 1,
                // certificates: 1,
                certificate: {
                    _id: 1,
                    name: 1,
                    date: 1,
                },
                created_at: 1,
                updated_at: 1,
            },
        },
        {
            $skip: (page - 1) * per_page,
        },
        {
            $limit: per_page,
        },
        {
            $sort: { [field]: sort_order === "asc" ? 1 : -1 },
        },
    ]);

    const total = await Author.countDocuments(filter);
    return { total, page, per_page, authors };
}

export async function details(currentAuthor) {
    //     const author = await Author.findById(authorId);
    //     author.avatar ? LINK_STATIC_URL + author.avatar : "";

    const authorDetails = await Author.aggregate([
        {
            $match: { _id: currentAuthor._id },
        },
        {
            $lookup: {
                from: "certificates",
                localField: "_id",
                foreignField: "author_id",
                as: "certificates",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                bio: 1,
                birthday: 1,
                avatar: {
                    $cond: {
                        if: { $ne: ["$avatar", ""] }, // Nếu avatar không rỗng
                        then: { $concat: [LINK_STATIC_URL, "$avatar"] }, // Gắn LINK_STATIC_URL vào trước avatar
                        else: "" // Trả về chuỗi rỗng nếu không có avatar
                    }
                },
                // status: 1,
                certificates: 1,
                created_at: 1,
                updated_at: 1,
            },
        },
    ]);

    return authorDetails;
}

export async function update(currentAuthor, { 
    name, bio, birthday, email, 
    // status, 
    avatar, certificate, date 
}) {
    currentAuthor.name = name;
    currentAuthor.bio = bio;
    currentAuthor.birthday = birthday;
    currentAuthor.email = email;
    // currentAuthor.status = status;

    if (avatar && currentAuthor.avatar) {
        FileUpload.remove(currentAuthor.avatar);
    }

    if (avatar) {
        currentAuthor.avatar = avatar.save("images");
    }

    await Certificate.aggregate([
        {
            $match: { author_id: currentAuthor._id },
        },
        {
            $set: {
                name: certificate,
                date,
            },
        },
        {
            $merge: {
                into: "certificates",
                on: "_id",
                whenMatched: "replace",
            },
        },
    ]);

    await currentAuthor.save();
}

export async function remove(currentAuthor) {
    const deleteCertificates = Certificate.deleteOne({ author_id: currentAuthor._id });
    const updatePosts = Post.updateMany({ author_id: currentAuthor._id }, { $set: { author_id: null } });
    const deleteAuthor = Author.findByIdAndDelete({ _id: currentAuthor._id });

    await Promise.all([deleteCertificates, updatePosts, deleteAuthor]);
}
