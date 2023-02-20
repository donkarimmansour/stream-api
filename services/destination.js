const DestinationRquest = require("../models/destinations")

// // update
// const Update = (userId , youtubeAccessToken) => {
    
//     return new Promise((resolve, reject) => { // check details 
//             //update        
//             DestinationRquest.updateOne({}, {
//                 youtube_access_token : youtubeAccessToken
//             }, (errUpdate, doc) => {
//                 if (errUpdate){ 
//                     reject(errUpdate)
//                 }else if (doc.modifiedCount > 0) {
//                     resolve(doc)
//                 } else {
//                     reject("something went wrong")
//                 }
    
//             }).where("user_id").equals(userId)  
    
//     })  
// }

//get
const Get = (id) => {
    
    return  new Promise((resolve, reject) => {

        DestinationRquest.findOne({}, (errFind, destination) => {

            if (errFind) {
                reject(errFind)
            }else if (!destination) {
                reject("there is no destination")
            }else {
                 resolve(destination)
            }

        }).where("user_id").equals(id)  


    })

}




module.exports = { Get}