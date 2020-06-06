import { UserService } from "../UserService";
import { IUserDao } from "../UserDao";
import { User } from "../User";

describe("UserDao", () => {
  describe("UserDao.getUser", () => {
    let getAllUsers = jest.fn();
    let getUser = jest.fn();
    let saveUser = jest.fn();

    beforeEach(() => {
      getAllUsers.mockReset();
      getUser.mockReset();
      saveUser.mockReset();
    });

    /**
     * By splitting our logic from our dao we can mock our dao.
     * This lets us test our logic in memory without slowing down our
     * test by interacting with the database.
     */
    it("gets a user", async () => {
      const userToBeSaved = User("foo", "foo@bar.se");
      const dao: IUserDao = {
        getAllUsers,
        getUser: getUser.mockReturnValueOnce(Promise.resolve(userToBeSaved)),
        saveUser,
      };
      const userService = new UserService(dao);
      const user = await userService.getUser("id");
      expect(getUser).toBeCalledWith("id");
      expect(getUser).toBeCalledTimes(1);
      expect(user).toEqual(userToBeSaved);
    });
  });

  describe("UserDao.getUserName", () => {
    let getAllUsers = jest.fn();
    let getUser = jest.fn();
    let saveUser = jest.fn();

    beforeEach(() => {
      getAllUsers.mockReset();
      getUser.mockReset();
      saveUser.mockReset();
    });

    it("gets a username", async () => {
      const dao: IUserDao = {
        getAllUsers,
        getUser: getUser.mockReturnValueOnce(
          Promise.resolve(User("foo", "foo@bar.se"))
        ),
        saveUser,
      };
      const userService = new UserService(dao);
      const username = await userService.getUserName("id");
      expect(getUser).toBeCalledWith("id");
      expect(getUser).toBeCalledTimes(1);
      expect(username).toEqual("foo");
    });
  });
});
