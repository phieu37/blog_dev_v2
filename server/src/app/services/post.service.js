import { FileUpload } from "@/utils/types";
import { Post, Category, ObjectId } from "../models";
// import * as authorService from "./author.service";
// import * as categoryService from "./category.service";
import { LINK_STATIC_URL } from "@/configs";

export async function create({ title, content, thumbnail, author_id, category_ids }) {
    if (thumbnail) {
        thumbnail = thumbnail.save();
    }

    const post = new Post({
        title,
        content,
        thumbnail,
        author_id,
        category_ids,
    });
    const newPost = await post.save();

    // Thêm id của bài viết mới vào các danh mục liên quan
    if (category_ids) {
        await Category.updateMany({ _id: { $in: category_ids } }, { $push: { post_ids: newPost._id } });
    }
}

export async function filter({ q, page, per_page, field, sort_order, authorId, categoryId }) {
    q = q ? { $regex: q, $options: "i" } : null;

    const filter = {
        ...(q && { title: q }),
        ...(authorId && !categoryId && { author_id: new ObjectId(authorId) }),
        ...(categoryId && !authorId && { category_ids: new ObjectId(categoryId) }),
        ...(authorId &&
            categoryId && {
            $or: [{ category_ids: new ObjectId(categoryId) }, { author_id: new ObjectId(authorId) }],
        }),
    };

    const posts = await Post.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "authors", // Tên bảng chứa thông tin tác giả
                localField: "author_id", // Trường tham chiếu trong bảng Post
                foreignField: "_id", // Trường tham chiếu trong bảng Author
                as: "author", // Tên của mảng kết quả
            },
        },
        {
            $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "categories", // Tên bảng chứa thông tin danh mục
                localField: "category_ids", // Trường tham chiếu trong bảng Post
                foreignField: "_id", // Trường tham chiếu trong bảng Category
                as: "categories", // Tên của mảng kết quả
            },
        },
        {
            $project: {
                title: 1,
                content: 1,
                // thumbnail: {$concat: [LINK_STATIC_URL, "$thumbnail"]},
                thumbnail: {
                    $cond: {
                        if: { $ne: ["$thumbnail", ""] },
                        then: { $concat: [LINK_STATIC_URL, "$thumbnail"] },
                        else: ""
                    }
                },
                author: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    bio: 1,
                    birthday: 1,
                    // status: 1,
                    avatar: {
                        $cond: {
                            if: { $ne: ["$author.avatar", ""] },
                            then: {$concat: [LINK_STATIC_URL, "$author.avatar"]},
                            else: ""
                        }
                    },
                    // avatar: {$concat: [LINK_STATIC_URL, "$author.avatar"]},
                },
                categories: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    created_at: 1,
                    updated_at: 1,
                },
                created_at: 1,
                updated_at: 1,
            },
        },
        {
            $skip: (page - 1) * per_page, // số lượng bản ghi cần bỏ qua
        },
        {
            $limit: per_page, // Giới hạn số lượng bản ghi trả về
        },
        {
            $sort: { [field]: sort_order === "asc" ? 1 : -1 }, // Sắp xếp kết quả theo trường
        },
    ]);

    const total = await Post.countDocuments(filter);
    return { total, page, per_page, posts };
}

export async function details(currentPost) {
    const postDetails = await Post.aggregate([
        {
            $match: { _id: currentPost._id }, // Tìm bài viết cụ thể
        },
        {
            $lookup: {
                from: "authors", // Tên bảng chứa thông tin tác giả
                localField: "author_id", // Trường tham chiếu trong bảng Post
                foreignField: "_id", // Trường tham chiếu trong bảng Author
                as: "author", // Tên của mảng kết quả
            },
        },
        {
            $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "categories", // Tên bảng chứa thông tin danh mục
                localField: "category_ids", // Trường tham chiếu trong bảng Post
                foreignField: "_id", // Trường tham chiếu trong bảng Category
                as: "categories", // Tên của mảng kết quả
            },
        },
        {
            $project: {
                title: 1,
                content: 1,
                thumbnail: {
                    $cond: {
                        if: { $ne: ["$thumbnail", ""] },
                        then: { $concat: [LINK_STATIC_URL, "$thumbnail"] },
                        else: ""
                    }
                },
                author: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    bio: 1,
                    birthday: 1,
                    // status: 1,
                    avatar: {
                        $cond: {
                            if: { $ne: ["$author.avatar", ""] },
                            then: {$concat: [LINK_STATIC_URL, "$author.avatar"]},
                            else: ""
                        }
                    },
                },
                categories: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    created_at: 1,
                    updated_at: 1,
                },
                created_at: 1,
                updated_at: 1,
            },
        },
    ]);
    return postDetails?.[0];
}

export async function update(currentPost, { title, content, thumbnail, author_id, category_ids }) {
    if (thumbnail && currentPost.thumbnail) {
        FileUpload.remove(currentPost.thumbnail);
    }
    if (thumbnail) {
        currentPost.thumbnail = thumbnail.save("images");
    }

    currentPost.title = title;
    currentPost.content = content;
    currentPost.author_id = author_id;
    currentPost.category_ids = category_ids;
    await currentPost.save();

    // const currentCategoryIds = currentPost.category_ids;

    //  loại bỏ post_ids từ tất cả các danh mục,không quan tâm danh mục có thay đổi hay không
    // await Post.updateMany(
    //     {_id: {$in: currentPostIds}},
    //     {$pull: {post_ids: currentPost._id}}
    // );

    // chọn bài viết ko nằm trong mảng danh mục truyền lên, xóa nó khỏi mảng post_ids
    const a = await Category.updateMany(
        { post_ids: currentPost._id, _id: { $nin: category_ids } },
        { $pull: { post_ids: currentPost._id } },
    );
    console.log(a);

    // chọn mảng danh mục truyền lên, thêm bài viết vào
    const b = await Category.updateMany(
        { _id: { $in: category_ids } },
        { $addToSet: { post_ids: currentPost._id } },
    );
    console.log(b);
}

export async function remove(currentPost) {
    await Post.deleteOne({ _id: currentPost._id });

    const categories = await Category.aggregate([
        {
            $match: {
                post_ids: currentPost._id,
            },
        },
    ]);

    await Category.updateMany({ _id: { $in: categories } }, { $pull: { post_ids: currentPost._id } });
}
