const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const {getUsersForSidebar} = require("../controller/user.controller")


const router = express.Router()

router.use(requireAuth)

router.get("/", getUsersForSidebar)

module.exports = router