const child_process = require('child_process') // To be used later for running FFmpeg
const { Server } = require('socket.io')
const { inputSettings, youtubeSettings, facebookSettings, customRtmpSettings } = require('../common/ffmpeg')
const { ffmpeg2 } = require('../common/ffmpeg')
const WS_PORT = process.env.WS_PORT || 3002

const io = new Server(WS_PORT, {
    /* options */
    cors: {
      origin: '*',
    },
})
  
  io.on('connection', (socket) => {
    console.log(`socket connected to ${socket.id}`)
  
    const socketQueryParams = socket.handshake.query
  
    const youtube = socketQueryParams.youtubeUrl
    const facebook = socketQueryParams.facebookUrl
    const customRTMP = socketQueryParams.customRTMP
  
    // client.connect()
  
    const ffmpegInput = inputSettings.concat(
      youtubeSettings(youtube),
      facebookSettings(facebook),
      customRtmpSettings(customRTMP)
    )
    
    // const ffmpeg = child_process.spawn(
    //   'ffmpeg',
    //   ffmpeg2(youtube, twitch, facebook)
    // ) 
    
    const ffmpeg = child_process.spawn('ffmpeg', ffmpegInput)
  
    // If FFmpeg stops for any reason, close the WebSocket connection.
    ffmpeg.on('close', (code, signal) => {
      console.log(
        'FFmpeg child process closed, code ' + code + ', signal ' + signal
      )
      // ws.terminate()
    })
  
    // Handle STDIN pipe errors by logging to the console.
    // These errors most commonly occur when FFmpeg closes and there is still
    // data to write.  If left unhandled, the server will crash.
    ffmpeg.stdin.on('error', (e) => {
      //console.log('FFmpeg STDIN Error', e)
      console.log('FFmpeg STDIN Error')
    })
  
    // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
    ffmpeg.stderr.on('data', (data) => {
      console.log('FFmpeg STDERR:', data.toString())
    })
  
    // When data comes in from the WebSocket, write it to FFmpeg's STDIN.
    socket.on('message', (msg) => {
     // console.log('DATA', msg)
      console.log('DATA')
      ffmpeg.stdin.write(msg)
    })
  
    // If the client disconnects, stop FFmpeg.
    socket.conn.on('close', (e) => {
      console.log('kill: SIGINT')
      ffmpeg.kill('SIGINT')
    })
  })