// import userRouter from "./user";
import adminRouter from "./admin";
import adminManagementRouter from "./admin-management";
import postRouter from "./post";
import categoryRouter from "./category";
import authorRouter from "./author";

export default function route(app) {
    // app.use("/", userRouter);
    app.use("/admin", adminRouter);
    app.use("/admin-management", adminManagementRouter);
    app.use("/posts", postRouter);
    app.use("/authors", authorRouter);
    app.use("/categories", categoryRouter);
}
