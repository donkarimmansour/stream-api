const DestinationsRquest = require("../models/destinations")
const axios = require("axios")

// View Count 
const ViewCount = (facebookLiveVideoId, facebookAccessToken) => {
    return new Promise( (resolve, reject) => {

         axios.get(`https://graph.facebook.com/v13.0/${facebookLiveVideoId}?fields=live_views&access_token=${facebookAccessToken}`)
        .then((res) => {
            console.log(res.data.live_views)
            resolve({ views: res.data.live_views })
        })
        .catch((err) => { reject(err) })

    }) 
}

// permalink
const Permalink = (facebookLiveVideoId, longFacebookAccessToken) => {
    return new Promise( (resolve, reject) => {
        
         axios.post(`https://graph.facebook.com/${facebookLiveVideoId}?fields=permalink_url&access_token=${longFacebookAccessToken}`)
        .then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        
        })

    })
}

 
// broadcast
const Broadcast = (facebookUserId, facebookTitle, facebookDescription, longFacebookAccessToken) => {
    return new Promise( (resolve, reject) => {

         axios.post(`https://graph.facebook.com/${facebookUserId}/live_videos?status=LIVE_NOW&title=${facebookTitle}&description=${facebookDescription}&access_token=${longFacebookAccessToken}`)
            .then((res) => {
               resolve(res.data)
            }).catch((err) => reject(err))         

 
    })
}



// End
const End = (liveVideoId, longFacebookAccessToken) => {
    return new Promise( (resolve, reject) => {

        axios.post(`https://graph.facebook.com/v3.3/${liveVideoId}?end_live_video=true&access_token=${longFacebookAccessToken}`)
        .then((res) => {  resolve(res) })
        .catch((err) => { reject(err) })

    })
}

// remove 
const Remove = (id) => {
    return new Promise( (resolve, reject) => {      

        DestinationsRquest.findOne({}, (errFind, destination) => {
            if (errFind) 
                reject(errFind) 
            if (!destination) {
                reject("id not exist")
            } else {
                
                //update        
                DestinationsRquest.updateOne({}, {
                    facebook_access_token : null , facebook_long_access_token : null
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate)
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("facebook token and long access token removed")

                    } else {
                        reject("something went wrong")
                    }
        
                }).where("user_id").equals(id)
            }
    
        }).where("user_id").equals(id)


    
    })
}




// authorize
const Authorize = (id, facebookAccessToken, facebookid) => {
    return new Promise( (resolve, reject) => {
              
        axios.post(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${facebookAccessToken}`)
        .then((res) => { 

            const longFacebookAccessToken = res.data.access_token

                    //update        
                    DestinationsRquest.updateOne({}, {
                        user_id : id ,facebook_access_token : facebookAccessToken , facebook_long_access_token : longFacebookAccessToken , facebook_user_id : facebookid
                    }, { upsert : true } , (errUpdate, doc) => {

                        if (errUpdate){ 
                            reject(errUpdate)

                        }else if (doc.modifiedCount > 0 || doc.upsertedCount > 0) {
                            resolve({ longFacebookAccessToken: longFacebookAccessToken })

                        } else {
                            reject("something went wrong")
                        }
            
                    }).where("user_id").equals(id)
            
        
    }).catch((err) => { reject(err) })

    })
}




module.exports = { Broadcast , ViewCount , End , Permalink , Remove , Authorize }