const ShortUrls = require("../models/shortUrl");
const shortId = require("shortid");
const mongoose = require("mongoose");
const { isValid } = require("shortid");
const dbPath = "mongodb://localhost:27017/urlShortener";


// Connecting to MongoDB
mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then()
  .catch((err) => console.log("DB ERROR: " + err));

module.exports.getShortUrl = async (req, res) => {
    const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl });
    if (shortUrl == null)
      return res.send("The shortUrl not registered in database.");
    res.send(shortUrl);
  }

 module.exports. getShortUrlasync = async (req, res) => {
    const shortUrls = await ShortUrls.find();
    res.render("index", { shortUrls: shortUrls });
  }

  module.exports.postShortUrl= async (req, res) => {
    let tempSort = req.body.shortUrl;
  
    if (tempSort.length == 0) tempSort = shortId.generate().substring(0, 6);
  
    if (tempSort.length > 3) {
      const shortUrl = await ShortUrls.findOne({ short: tempSort });
      if (shortUrl == null) {
        await ShortUrls.create({
          full: req.body.fullUrl,
          short: tempSort,
        });
        res.redirect("/");
      } else
        return res.send("The short url must be a unique and with no spaces ");
    } else return res.send("The short url must be longer than 3 characters");
  }

  module.exports.putShortUrl = async (req, res) => {
    const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
  
    shortUrl.clicks++;
    shortUrl.lastclickdate = new Date().toLocaleString("en-US");
    shortUrl.save();
    res.redirect(shortUrl.full);
  }