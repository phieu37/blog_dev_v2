import {responseSuccess} from "@/utils/helpers";
import * as postService from "../services/post.service";

export async function readRootTotalPosts(req, res) {
    return responseSuccess(res, await postService.getTotalPosts(req.query));
}

export async function readRoot(req, res) {
    return responseSuccess(res, await postService.filter(req.query));
}

export async function readItem(req, res) {
    // await responseSuccess(res, await postService.details(req.params.id));
    await responseSuccess(res, await postService.details(req.post));
}

export async function createItem(req, res) {
    await postService.create(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateItem(req, res) {
    await postService.update(req.post, req.body);
    return responseSuccess(res, null, 201);
}

export async function removeItem(req, res) {
    await postService.remove(req.post);
    return responseSuccess(res);
}
