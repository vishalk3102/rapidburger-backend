const app = require("./app");
const connectDatabase = require("./config/database");

connectDatabase();

app.get("/", (req, res, next) => {
  res.send("<h1> hello from backend </h1>");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server is working at ${process.env.PORT}, in ${process.env.NODE_ENV} mode`
  );
});
