import * as request from "supertest";
import { mockUserModule } from "./MockUserModule.mocks";
import { makeApp } from "../../../app";
import { User } from "../User";

/**
 * Since we have a clear layered architecture we can now write a route test
 * without having to run our entire system.
 * We can mock the services that will handle our logic and just check that
 * the network responses are work correctly.
 *
 * This is very powerful. We can now simulate errors and other behaviour
 * that would be hard to create without mocks.
 */
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

    it("should return 500", (done) => {
      userDao.saveUser = jest.fn(() => Promise.reject(new Error("fail")));

      request(app)
        .post("/users")
        .expect(500)
        .end((_, res) => {
          expect(res.body.error).toEqual("fail");
          return done();
        });
    });
  });
});
