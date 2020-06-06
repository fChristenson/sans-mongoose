import { UserDao, IUserDao } from "./UserDao";
import { IUserService, UserService } from "./UserService";

export interface IUserModule {
  userDao: IUserDao;
  userService: IUserService;
}

export const userDao = new UserDao();
export const userService = new UserService(userDao);

export const userModule = {
  userDao,
  userService,
};
