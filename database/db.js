const mongoose = require("mongoose")

const DB_URL = "mongodb://127.0.0.1:27017/stream"
//const DB_URL = "mongodb+srv://admin:admin@cluster0.3av2c.mongodb.net/artflix"

function DB(){      
    return mongoose.connect(DB_URL, { useNewUrlParser: true } , (err) => { 
            if (err) throw Error(err) 
            else console.log("db start")  
    })
}

module.exports = DB       