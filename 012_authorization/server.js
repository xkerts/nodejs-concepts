const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

//Custom built middleware
app.use(logger);
//Handle Options credential and fetch cookies credentials
app.use(credentials);

//Third party middleware
app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded data
//'content-type: application/x-www-form=urlencoded'
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for json
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Serve static files
app.use(express.static(path.join(__dirname, "/public")));
//Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

//Catch All
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
