const express = require("express");
const shortUrlRouter = require("./routes/shortUrl");
const localPort = 8080;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(shortUrlRouter);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT || localPort, () => {
  console.log("Listening on port " + localPort);
});
