import { Router } from "express";
import { IUserService } from "./UserService";
import { IUserDao } from "./UserDao";
import { User } from "./User";

export const makeUserRouter = (
  userService: IUserService,
  userDao: IUserDao
) => {
  const userRouter = Router();

  userRouter.get("/users", async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
  });

  userRouter.post("/users", async (req, res) => {
    const newUser = User("foo", "foo@bar.se");
    // We can directly use the dao but we shouldn't.
    await userDao.saveUser(newUser);
    // By add a service layer around our dao we can isolate our database access from our logic.
    // This helps us keep our logic clean and it makes testing easier.
    const user = await userService.getUser(newUser.id);
    res.json(user);
  });

  return userRouter;
};
