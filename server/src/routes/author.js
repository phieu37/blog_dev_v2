import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload} from "../app/middleware/common";

import * as authorRequest from "../app/requests/author.request";
import * as authorMiddleware from "../app/middleware/author.middleware";
import * as authorController from "../app/controllers/author.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(authorRequest.readRoot)),
    asyncHandler(authorController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(authorMiddleware.checkAuthorId),
    asyncHandler(authorController.readItem)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(authorRequest.createItem)),
    asyncHandler(authorController.createItem)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(authorMiddleware.checkAuthorId),
    asyncHandler(validate(authorRequest.updateItem)),
    asyncHandler(authorController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(authorMiddleware.checkAuthorId),
    asyncHandler(authorController.removeItem)
);

export default router;
