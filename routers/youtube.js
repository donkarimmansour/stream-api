const { ApiEndpoints } = require("../common/apiEndpoints")
const YoutubeControlles = require("../controlles/youtube")
const router = require("express").Router()

// authorize
router.post(ApiEndpoints.YoutubeEndpoints.authorize  , YoutubeControlles.Authorize)

// refresh
router.post(ApiEndpoints.YoutubeEndpoints.refresh  , YoutubeControlles.Refresh)

// view Count
router.post(ApiEndpoints.YoutubeEndpoints.viewCount  , YoutubeControlles.ViewCount)

// broadcast
router.post(ApiEndpoints.YoutubeEndpoints.broadcast  , YoutubeControlles.Broadcast)

// live
router.post(ApiEndpoints.YoutubeEndpoints.live  , YoutubeControlles.Live)

// end
router.post(ApiEndpoints.YoutubeEndpoints.end  , YoutubeControlles.End)

// remove
router.post(ApiEndpoints.YoutubeEndpoints.remove  , YoutubeControlles.Remove)


// // update
// router.post(ApiEndpoints.YoutubeEndpoints.update  , YoutubeControlles.Update)
 

module.exports = router 