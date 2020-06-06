import { IUser } from "./User";
import { db } from "../db/db";

const collectionName = "users";

export interface IUserDao {
  saveUser(user: IUser): Promise<void>;
  getUser(id: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
}

export class UserDao implements IUserDao {
  async saveUser(user: IUser) {
    await db.collection<IUser>(collectionName).insertOne(user);
    return;
  }

  async getUser(id: string) {
    const result = await db.collection<IUser>(collectionName).findOne({ id });
    return result;
  }

  async getAllUsers() {
    const cursor = await db.collection<IUser>(collectionName).find({});
    const results = await cursor.toArray();
    return results;
  }
}
