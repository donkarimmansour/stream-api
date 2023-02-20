const FacebookModel = require("../services/facebook")
const codes = require("../common/codes")


// ViewCount
const ViewCount = (req, res) => { 
    const { facebookLiveVideoId, facebookAccessToken } = req.body

    FacebookModel.ViewCount(facebookLiveVideoId, facebookAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// Permalink
const Permalink = (req, res) => { 
    const { facebookLiveVideoId, longFacebookAccessToken } = req.body

    FacebookModel.Permalink(facebookLiveVideoId, longFacebookAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}




// Broadcast
const Broadcast = (req, res) => { 
    const { facebookUserId, facebookTitle, facebookDescription, longFacebookAccessToken } = req.body

    FacebookModel.Broadcast(facebookUserId, facebookTitle, facebookDescription, longFacebookAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}
 



// End
const End = (req, res) => { 
    const { liveVideoId, longFacebookAccessToken } = req.body

    FacebookModel.End(liveVideoId, longFacebookAccessToken).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}



 
// Authorize
const Authorize = (req, res) => { 
    const { id, facebookAccessToken, facebookid } = req.body

    FacebookModel.Authorize(id, facebookAccessToken, facebookid).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// Remove
const Remove = (req, res) => { 
    const { id } = req.body

    FacebookModel.Remove(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


module.exports = { Broadcast , ViewCount , End , Permalink , Remove , Authorize }