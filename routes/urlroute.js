const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics,} = require("../controllers/urlcl.js")
const router= express.Router();
router.post('/',handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
