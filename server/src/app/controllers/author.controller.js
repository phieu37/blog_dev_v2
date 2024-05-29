import {responseSuccess} from "@/utils/helpers";
import * as authorService from "../services/author.service";

export async function readRootTotalAuthors(req, res) {
    return responseSuccess(res, await authorService.getTotalAuthors(req.query));
}

export async function readRoot(req, res) {
    return responseSuccess(res, await authorService.filter(req.query));
}

export async function readItem(req, res) {
    // await responseSuccess(res, await authorService.details(req.params.id));
    await responseSuccess(res, await authorService.details(req.author));
}

export async function createItem(req, res) {
    await authorService.create(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateItem(req, res) {
    await authorService.update(req.author, req.body);
    return responseSuccess(res, null, 201);
}

export async function removeItem(req, res) {
    await authorService.remove(req.author);
    return responseSuccess(res);
}
