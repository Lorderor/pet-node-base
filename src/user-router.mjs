import { Router } from "../framework/router.mjs";
import { createUser, getUsers } from "./user-controller.mjs";

export const userRouter = new Router();

userRouter.get(`/users`, getUsers);

userRouter.post(`/user`, createUser);
