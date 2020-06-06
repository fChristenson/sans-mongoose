import { IUserDao } from "./UserDao";
import { IUser } from "./User";

export interface IUserService {
  getUserName(id: string): Promise<string>;
  getUser(id: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  saveUser(user: IUser): Promise<void>;
}

export class UserService implements IUserService {
  private userDao: IUserDao;

  constructor(dao: IUserDao) {
    this.userDao = dao;
  }

  async getUserName(id: string) {
    const user = await this.getUser(id);
    return user.name;
  }

  getUser(id: string) {
    return this.userDao.getUser(id);
  }

  getAllUsers() {
    return this.userDao.getAllUsers();
  }

  saveUser(user: IUser) {
    return this.userDao.saveUser(user);
  }
}
