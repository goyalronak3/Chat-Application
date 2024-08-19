const express = require("express")
const {sendMessage, getMessage} = require("../controller/message.controller")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/send/:id", getMessage)
router.post("/send/:id", sendMessage)

module.exports = router