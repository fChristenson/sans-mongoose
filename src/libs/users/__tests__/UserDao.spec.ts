import { connect } from "../../db/db";
import { User } from "../User";
import { UserDao } from "../UserDao";

describe("UserDao", () => {
  let client;

  beforeAll(async () => {
    client = await connect("test-db");
  });

  afterAll(async () => {
    await client.close();
  });

  /**
   * We need to connect to a real database to test that our Dao is working.
   * We want to keep these test to a minimum since they take longer than
   * if we run our test in memory.
   */
  describe("UserDao.saveUser", () => {
    it("should save a user", async () => {
      const userToSave = User("foo", "foo@bar.se");
      const dao = new UserDao();
      await dao.saveUser(userToSave);
      const user = await dao.getUser(userToSave.id);
      expect(user.id).toEqual(userToSave.id);
    });
  });
});
