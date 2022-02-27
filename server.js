const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors : {
        credentials: false,
        origin: '*',
        // function (origin, callback) {
        //   // allow requests with no origin
        //   // (like mobile apps or curl requests)
        //   if (!origin) return callback(null, true);
        //   if (allowedOrigins.indexOf(origin) === -1) {
        //     var msg =
        //       "The CORS policy for this site does not " +
        //       "allow access from the specified Origin.";
        //     return callback(new Error(msg), false);
        //   }
        //   return callback(null, true);
        // },
    }
})
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 9000

let rooms = []

io.on('connect', (socket) => {
    console.log("=================== connected")
    socket.on('new_player', (roomId, address) => {
        console.log("connected ", roomId, address)
        let isRoomExist = false

        rooms.forEach((value) => {
            if(roomId == value.roomId) {
                isRoomExist = true

                if(value.players.length == 2) {
                    if(!value.players.includes(address) && !value.viewers.includes(address)) value.viewers.push(address)
                }
                else {
                    if(!value.players.includes(address)) {
                        value.players.push(address)
                        console.log("=== joined ===")
                        socket.emit('joined', value.players[0])
                        socket.broadcast.emit('joined', address)
                    }
                }
            }
        })

        if(!isRoomExist) {
            let room = {
                roomId, players: [address], viewers: []
            }
            rooms.push(room)
        }
        console.log('rooms - ', rooms)
    })

    socket.on('picked', (playerStatus) => {
        console.log('picked - ', playerStatus)

        socket.broadcast.emit('picked', playerStatus)
    })

    socket.on('disconnect', (arg) => {
        console.log('disconnected - ', arg)
    })
})

// nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        // return nextHandler(req, res)
        return res.send('Hello World')
    })

    server.listen(port, (err) => {
        if(err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
// })