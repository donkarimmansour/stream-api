const { ApiEndpoints } = require("../common/apiEndpoints")
const BroadcastControlles = require("../controlles/broadcast")
const router = require("express").Router()

// create
router.post(ApiEndpoints.BroadcastEndpoints.add , BroadcastControlles.Create)

// get
router.get(ApiEndpoints.BroadcastEndpoints.get , BroadcastControlles.Get)

module.exports = router 