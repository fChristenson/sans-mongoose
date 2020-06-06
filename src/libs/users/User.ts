import * as uuid from "node-uuid";

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export const User = (name: string, email: string) => {
  return {
    id: uuid.v4(),
    name,
    email,
    createdAt: new Date(),
  };
};
