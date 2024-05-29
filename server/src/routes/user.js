import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload} from "../app/middleware/common";

import * as userRequest from "../app/requests/user.request";
import * as userMiddleware from "../app/middleware/user.middleware";
import * as userController from "../app/controllers/user.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/", 
    asyncHandler(validate(userRequest.readRoot)), 
    asyncHandler(userController.readRoot)
);

router.get(
    "/totalUsers", 
    asyncHandler(userController.readRootTotalUsers)
);

// router.get(
//     "/:id",
//     asyncHandler(userMiddleware.checkUserId),
//     asyncHandler(userController.readItem)
// );

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(userRequest.createItem)),
    asyncHandler(userController.createItem),
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(userMiddleware.checkUserId),
    asyncHandler(validate(userRequest.updateItem)),
    asyncHandler(userController.updateItem),
);

router.delete(
    "/:id", 
    asyncHandler(userMiddleware.checkUserId), 
    asyncHandler(userController.removeItem)
);

// router.patch(
//     "/change-password/",
//     "/change-password/:id",
//     asyncHandler(userMiddleware.checkUserId),
//     asyncHandler(validate(userRequest.resetPassword)),
//     asyncHandler(userController.resetPassword),
// );

export default router;
