import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate} from "../app/middleware/common";

import * as categoryRequest from "../app/requests/category.request";
import * as categoryMiddleware from "../app/middleware/category.middleware";
import * as categoryController from "../app/controllers/category.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(categoryRequest.readRoot)),
    asyncHandler(categoryController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(categoryMiddleware.checkCategoryId),
    asyncHandler(categoryController.readItem)
);

router.post(
    "/",
    asyncHandler(validate(categoryRequest.createItem)),
    asyncHandler(categoryController.createItem)
);

router.put(
    "/:id",
    asyncHandler(categoryMiddleware.checkCategoryId),
    asyncHandler(validate(categoryRequest.updateItem)),
    asyncHandler(categoryController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(categoryMiddleware.checkCategoryId),
    asyncHandler(categoryController.removeItem)
);

export default router;
