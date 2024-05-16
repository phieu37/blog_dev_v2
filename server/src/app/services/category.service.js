// import {LINK_STATIC_URL} from "@/configs";
import { LINK_STATIC_URL } from "@/configs";
import {Category, Post} from "../models";

export async function create({name, description, post_ids}) {
    const category = new Category({
        name,
        description,
        post_ids,
    });

    const newCategory = await category.save();
    return newCategory;
}

export async function filter({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && {$or: [{name: q}]}),
    };

    const categories = await Category.aggregate([
        {
            $match: filter,
        },
        {
            $skip: (page - 1) * per_page,
        },
        {
            $limit: per_page,
        },
        {
            $sort: {[field]: sort_order === "desc" ? -1 : 1},
        },
    ]);

    const total = await Category.countDocuments(filter);
    return {total, page, per_page, categories};
}

// export async function details(currentCategory) {
//     const categoryDetails = await Category.aggregate([
//         {
//             $match: { _id: currentCategory._id },
//         },
//         {
//             $lookup: {
//                 from: "posts",
//                 localField: "post_ids",
//                 foreignField: "_id",
//                 as: "posts",
//             },
//         },
//         {
//             $unwind: {
//                 path: "$posts",
//                 preserveNullAndEmptyArrays: true,
//             },
//         },
//         {
//             $lookup: {
//                 from: "authors",
//                 localField: "posts.author_id",
//                 foreignField: "_id",
//                 as: "author",
//             },
//         },
//         {
//             $unwind: {
//                 path: "$author",
//                 preserveNullAndEmptyArrays: true,
//             },
//         },
//         {
//             $project: {
//                 _id: 1,
//                 name: 1,
//                 description: 1,
//                 created_at: 1,
//                 updated_at: 1,
//                 post: {
//                     _id: "$posts._id",
//                     title: "$posts.title",
//                     content: "$posts.content",
//                     thumbnail: {
//                         $cond: {
//                             if: { $ne: ["$posts.thumbnail", ""] },
//                             then: { $concat: [LINK_STATIC_URL, "$posts.thumbnail"] },
//                             else: "",
//                         },
//                     },
//                     author: {
//                         $cond: {
//                             if: { $ne: ["$author", []] },
//                             then: {
//                                 _id: "$author._id",
//                                 name: "$author.name",
//                                 email: "$author.email",
//                                 bio: "$author.bio",
//                                 birthday: "$author.birthday",
//                                 avatar: {
//                                     $cond: {
//                                         if: { $ne: ["$author.avatar", ""] },
//                                         then: { $concat: [LINK_STATIC_URL, "$author.avatar"] },
//                                         else: "",
//                                     },
//                                 },
//                                 created_at: "$author.created_at",
//                                 updated_at: "$author.updated_at",
//                             },
//                             else: null,
//                         },
//                     },
//                     created_at: "$posts.created_at",
//                     updated_at: "$posts.updated_at",
//                 }
//             },
//         },
//         {
//             $match: {
//                 "post.thumbnail": { $ne: null },
//                 "post.author.avatar": { $ne: null }
//             }
//         },
//         {
//             $group: {
//                 _id: "$_id",
//                 name: { $first: "$name" },
//                 description: { $first: "$description" },
//                 created_at: { $first: "$created_at" },
//                 updated_at: { $first: "$updated_at" },
//                 posts: { $push: "$post" },
//             },
//         },
//         {
//             $project: {
//                 _id: 1,
//                 name: 1,
//                 description: 1,
//                 created_at: 1,
//                 updated_at: 1,
//                 posts: {
//                     $ifNull: ["$posts", []],
//                 },
//             },
//         },
//     ]);


//     return categoryDetails?.[0];
// }

export async function details(currentCategory) {
    const categoryDetails = await Category.aggregate([
        {
            $match: { _id: currentCategory._id },
        },
        {
            $lookup: {
                from: "posts",
                localField: "post_ids",
                foreignField: "_id",
                as: "posts",
            },
        },
        {
            $unwind: {
                path: "$posts",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "authors",
                localField: "posts.author_id",
                foreignField: "_id",
                as: "author",
            },
        },
        {
            $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                "posts.thumbnail": {
                    $cond: {
                        if: { $ne: ["$posts.thumbnail", ""] },
                        then: { $concat: [LINK_STATIC_URL, "$posts.thumbnail"] },
                        else: "",
                    },
                },
                "author.avatar": {
                    $cond: {
                        if: { $ne: ["$author.avatar", ""] },
                        then: { $concat: [LINK_STATIC_URL, "$author.avatar"] },
                        else: "",
                    },
                },
            },
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                description: { $first: "$description" },
                created_at: { $first: "$created_at" },
                updated_at: { $first: "$updated_at" },
                posts: {
                    $push: {
                        _id: "$posts._id",
                        title: "$posts.title",
                        content: "$posts.content",
                        thumbnail: "$posts.thumbnail",
                        author: {
                            _id: "$author._id",
                            name: "$author.name",
                            email: "$author.email",
                            bio: "$author.bio",
                            birthday: "$author.birthday",
                            avatar: "$author.avatar",
                            created_at: "$author.created_at",
                            updated_at: "$author.updated_at",
                        },
                        created_at: "$posts.created_at",
                        updated_at: "$posts.updated_at",
                    },
                },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                created_at: 1,
                updated_at: 1,
                posts: {
                    $filter: {
                        input: "$posts",
                        as: "post",
                        cond: { 
                            $and: [
                                { $ne: ["$$post.thumbnail", null] },
                                { $ne: ["$$post.author.avatar", null] }
                            ]
                        },
                    },
                },
            },
        },
    ]);

    return categoryDetails?.[0];
}


export async function update(category, {name, description, post_ids}) {
    category.name = name;
    category.description = description;
    category.post_ids = post_ids;
    await category.save();
    return category;
}

export async function remove(category) {
    await Category.deleteOne({_id: category._id});

    // Lấy danh sách bài viết trong danh mục
    const posts = await Post.aggregate([
        {
            $match: {
                category_ids: category._id,
            },
        },
    ]);

    await Post.updateMany(
        {_id: {$in: posts}},
        {$pull: {category_ids: category._id}}
    );
}
