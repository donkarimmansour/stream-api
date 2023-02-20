const messages = require("../common/messages")
const mailer = require("../common/mailer")
const UsersRquest = require("../models/users") 

// register
const Register = (email) => {

    return new Promise((resolve, reject) => { // check email
        
        UsersRquest.findOne({}, (errFind, user) => {

            if (errFind){ 
                reject(errFind)

            }else if (user) {
                reject("the email already exists")
            }else{

            const code = Math.floor(100000 + Math.random() * 900000)

            //inser a new user
            UsersRquest.create({
                user_email : email, user_code : code//, user_date_created : timeCreated
            }, (errInsert, res) => {

                if (errInsert){ 
                    reject(errInsert)
                }else{

                //get Email Msg
                 const html = messages.emailCodeTemplate(code)

                 // send code
                  mailer.sendAuthCode(res.user_email, "code Email", html)
                 .then((succ) => resolve(res))
                 .catch(error => reject(error))

                }
        
 
            })
        }

        }).where("user_email").equals(email) 
    })
}



// login
const Login = (email) => {

    return new Promise((resolve, reject) => { // check details
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind){ 
                reject(errFind)
            }else if (!user) {    
                reject("No email is associated with that account")
            }else {

                const code = Math.floor(100000 + Math.random() * 900000)
                
                    //update        
                    UsersRquest.updateOne({}, {
                        user_code : code
                    }, (errUpdate, doc) => {
                        if (errUpdate){ 
                            reject(errUpdate)

                        }else if (doc.modifiedCount > 0) {
                              //get Email Msg
                            const html = messages.emailCodeTemplate(code)

                            // send code
                             mailer.sendAuthCode(user.user_email, "code Email", html)
                            .then((succ) => resolve(user))
                            .catch(error => reject(error))

                        } else {
                            reject("something went wrong")
                        }
            
                    }).where("_id").equals(user._id)  
               
            }

        }).where("user_email").equals(email)

    })
}


// compare code
const compareCode = (id , code) => {

    return new Promise((resolve, reject) => { // check details
        resolve("match")
        // UsersRquest.findOne({}, (errFind, user) => {
        //     if (errFind){ 
        //         reject(errFind)
                
        //     }else if(user.user_code != code){
        //         reject("The code you entered does not match")
        //     }else {
                
        //             //update        
        //             UsersRquest.updateOne({}, {
        //                 user_last_login : Date.now()
        //             }, (errUpdate, doc) => {
        //                 if (errUpdate){ 
        //                     reject(errUpdate)
        //                 }else if (doc.modifiedCount > 0) {
        //                     resolve("match")
        //                 }else {
        //                     reject("something went wrong")
        //                 }
            
        //             }).where("_id").equals(id)  
               
        //     }

        // }).where("_id").equals(id)

    })
}

// update
const Update = (id , youtubeAuthBool , facebookAuthBool) => {
    

    return new Promise((resolve, reject) => { // check details 
        let data , message 
        
        if (facebookAuthBool) {
            data = { facebook_auth: true }
            message = 'Facebook authentication added'
        }else if (youtubeAuthBool) {
            data = { youtube_auth: true }
            message = 'Youtube authentication added'
        }

        //update        
            UsersRquest.updateOne({}, {
                ...data
            }, (errUpdate, doc) => {

                if (errUpdate){ 
                    reject(errUpdate)
                }else{ //if (doc.modifiedCount > 0) {
                    resolve(message)
                 } //else {
                //     reject("something went wrong")
                // }
    
            }).where("_id").equals(id)  
    
    })  
}



// broadcast-access
const broadcastAccess = (id) => {

    return new Promise((resolve, reject) => { // check details
        UsersRquest.findOne({}, (errFind, user) => {

            if (errFind) {
                reject(errFind)
            }else if (!user) {
                reject("there is no user") 
            }else{
                 resolve(user)
            }

        }).where("_id").equals(id)  
    })
}


// User Went Live
const UserWentLive = (email , destinations) => {

    return new Promise((resolve, reject) => { // check details
        UsersRquest.findOne({}, (errFind, user) => {

            if (errFind) {
                reject(errFind)
            }else if (!user) {
                reject("there is no user") 
            }else{


                const html = `<p>An ohmystream user ${email} clicked the GO LIVE button and is streaming to ${destinations}</p>`

               // send code
                mailer.sendAuthCode(email, "went live", html)
                .then((succ) => resolve(succ))
                .catch(error => reject(error))

            }

        }).where("email").equals(email)  
    })
}

module.exports = { Login , Register , broadcastAccess , Update , compareCode , UserWentLive }