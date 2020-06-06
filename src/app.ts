import * as express from "express";
import { makeUserRouter } from "./libs/users/UserRouter";
import { IUserModule } from "./libs/users";

export const makeApp = (userModule: IUserModule) => {
  const app = express();
  app.use(express.json());

  const userRouter = makeUserRouter(userModule.userService, userModule.userDao);
  app.use(userRouter);

  return app;
};
