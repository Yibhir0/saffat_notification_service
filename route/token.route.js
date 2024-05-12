const express = require("express");

//This is the router of tokens
const { deleteToken, addToken, getTokens } = require("../api/api");
const router = express.Router();

router.get("/tokens", getTokens);
router.post("/token", addToken);
router.delete("/tokens/:id", deleteToken);

module.exports = router;