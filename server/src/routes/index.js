import authRouter from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import categoryRouter from "./category";
import authorRouter from "./author";

export default function route(app) {
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/authors", authorRouter);
    app.use("/categories", categoryRouter);
}
