const { ApiEndpoints } = require("../common/apiEndpoints")
const { app  } = require("../server")
const https = require("https")
const fs = require("fs")

const users = require("../routers/users")
const broadcast = require("../routers/broadcast")
const destination = require("../routers/destination")
const youtube = require("../routers/youtube") 
const facebook = require("../routers/facebook")


require("../socket/socket")

app.use(ApiEndpoints.UserEndpoints.route, users)
app.use(ApiEndpoints.BroadcastEndpoints.route, broadcast)
app.use(ApiEndpoints.DestinationEndpoints.route, destination)
app.use(ApiEndpoints.YoutubeEndpoints.route, youtube)
app.use(ApiEndpoints.FacebookEndpoints.route, facebook)


app.use((req, res, next) => {
    res.status(404).json("Api not found")  
})

  
const server = https.createServer(
    { key: fs.readFileSync("./cert/server.key"),
      cert: fs.readFileSync("./cert/server.cert")
}, app )
  
server.listen(process.env.PORT || 3001 , () => {
    console.log("server start")
})