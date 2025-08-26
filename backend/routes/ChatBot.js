const express = require("express");
const router = express.Router();
const {ChatBot} = require("../controllers/ChatBot")

router.post("/chat",ChatBot);

module.exports = router;