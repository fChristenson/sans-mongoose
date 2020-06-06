import * as request from "supertest";
import { mockUserModule } from "./MockUserModule.mocks";
import { makeApp } from "../../../app";
import { User } from "../User";

describe("UserRouter", () => {
  const { userService, userDao } = mockUserModule;
  const app = makeApp(mockUserModule);

  describe("GET /users", () => {
    it("should return all users", (done) => {
      userService.getAllUsers = jest.fn(() => Promise.resolve([]));
      request(app)
        .get("/users")
        .expect(200)
        .end(() => {
          expect(userService.getAllUsers).toBeCalledTimes(1);
          return done();
        });
    });
  });

  describe("POST /users", () => {
    it("should create a user", (done) => {
      userDao.saveUser = jest.fn(() => Promise.resolve());
      userService.getUser = jest.fn(() =>
        Promise.resolve(User("foo", "foo@bar.se"))
      );

      request(app)
        .post("/users")
        .expect(200)
        .end(() => {
          expect(userDao.saveUser).toBeCalledTimes(1);
          expect(userService.getUser).toBeCalledTimes(1);
          return done();
        });
    });
  });
});
