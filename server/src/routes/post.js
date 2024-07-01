import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {
    // verifyToken, 
    validate, upload} from "../app/middleware/common";

import * as postRequest from "../app/requests/post.request";
import * as postMiddleware from "../app/middleware/post.middleware";
import * as postController from "../app/controllers/post.controller";

const router = Router();

// router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(postRequest.readRoot)),
    asyncHandler(postController.readRoot)
);

router.get(
    "/totalPosts", 
    asyncHandler(postController.readRootTotalPosts)
);

router.get(
    "/:id",
    asyncHandler(postMiddleware.checkPostId),
    asyncHandler(postController.readItem)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(postRequest.createItem)),
    asyncHandler(postController.createItem)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(postMiddleware.checkPostId),
    asyncHandler(validate(postRequest.updateItem)),
    asyncHandler(postController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(postMiddleware.checkPostId),
    asyncHandler(postController.removeItem)
);

export default router;