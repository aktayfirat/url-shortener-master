const express = require("express");
const router = express();
const ShortUrl = require("../controllers/shortUrls");

router.get("/", ShortUrl.getShortUrlasync);

// Generated shorturl details
router.get("/:shortUrl/stats", ShortUrl.getShortUrl);

// A number of controls for creating shorturl
router.post("/shortUrls", ShortUrl.postShortUrl);

// Updates when using created shortcuts
router.get("/:shortUrl", ShortUrl.putShortUrl);

module.exports = router;
