import { IUserService } from "../UserService";
import { IUserDao } from "../UserDao";
import { IUserModule } from "..";

export const mockUserService: IUserService = {
  getUser: jest.fn(),
  getAllUsers: jest.fn(),
  getUserName: jest.fn(),
  saveUser: jest.fn(),
};

export const mockDao: IUserDao = {
  getUser: jest.fn(),
  getAllUsers: jest.fn(),
  saveUser: jest.fn(),
};

export const mockUserModule: IUserModule = {
  userDao: mockDao,
  userService: mockUserService,
};
