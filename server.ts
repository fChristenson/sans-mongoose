import { makeApp } from "./src/app";
import { connect } from "./src/libs/db/db";
import { userModule } from "./src/libs/users";

// Connect to mongodb
connect();

const port = process.env.PORT || 3000;

const app = makeApp(userModule);

app.listen(port, () => {
  console.log("Running on port: ", port);
  console.log("--------------------------");
});
