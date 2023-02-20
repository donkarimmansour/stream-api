const { ApiEndpoints } = require("../common/apiEndpoints")
const FacebookControlles = require("../controlles/facebook")
const router = require("express").Router()

// view Count
router.post(ApiEndpoints.FacebookEndpoints.viewCount , FacebookControlles.ViewCount)

// permalink
router.post(ApiEndpoints.FacebookEndpoints.permalink , FacebookControlles.Permalink)

// broadcast
router.post(ApiEndpoints.FacebookEndpoints.broadcast , FacebookControlles.Broadcast)

// end
router.post(ApiEndpoints.FacebookEndpoints.end , FacebookControlles.End)

// authorize
router.post(ApiEndpoints.FacebookEndpoints.authorize , FacebookControlles.Authorize)

// remove
router.post(ApiEndpoints.FacebookEndpoints.remove , FacebookControlles.Remove) 

module.exports = router 
