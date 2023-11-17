const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//Custom built middleware
app.use(logger);

//Third party middleware
app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded data
//'content-type: application/x-www-form=urlencoded'
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for json
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, "/public")));
//Routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
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
