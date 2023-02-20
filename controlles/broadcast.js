const BroadcastModel = require("../services/broadcast")
const codes = require("../common/codes")


// Create
const Create = (req, res) => {
    const { youtubeTitle, youtubeDescription, youtubePrivacyPolicy, youtubeDestinationUrl,
    youtubeBroadcastId, youtubeStreamId, facebookTitle, facebookDescription, facebookLiveVideoId,
    facebookDestinationUrl, id, customRtmpServer, customRtmpStreamKey} = req.body ;

    BroadcastModel.Create( youtubeTitle, youtubeDescription, youtubePrivacyPolicy, youtubeDestinationUrl,
    youtubeBroadcastId, youtubeStreamId, facebookTitle, facebookDescription, facebookLiveVideoId,
    facebookDestinationUrl, id, customRtmpServer, customRtmpStreamKey).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}
 
// Get
const Get = (req, res) => {
    const { id} = req.params ;

    BroadcastModel.Get( id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}
 


module.exports = { Create , Get }