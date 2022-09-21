const { Server } = require('socket.io')
const { getChatRoomTest } = require('../controllers/chat-controller')

const SocketServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
      credentials: true,
    },
  })

  let rooms = await getChatRoomTest()

  io.on('connection', (socket) => {
    socket.emit('rooms', rooms)
    socket.on('join', (data) => {
      socket.emit('welcome-user-msg', `${data.userData.account} 加入${data.currentChat.room_title}`)
    })
    socket.on('msgFromClient', (msg) => {
      io.emit('responseMsg', msg)
    })
  })

  // io.on('connection', (socket) => {
  //   socket.on('joinRoom', (room) => {
  //     console.log('joinroom', room)

  //     socket.join(room?.room_title)

  //     // socket.emit('join-room-message', `歡迎加入 ${room?.room_title} 聊天室`)
  //     socket.on('join-room-user', (user) => {
  //       socket.emit('welcome-user-msg', `${user.account} 加入 ${room?.room_title} `)
  //     })
  //   })

  //   socket.on('sendMsg', (msg) => {
  //     console.log(msg)

  //     io.emit('responseMsg', msg)
  //   })

  //   // socket.emit('message', 'welcome to chatCord')
  //   // socket.broadcast.emit('message', 'A user has join the chat')

  //   socket.on('disconnect', () => {
  //     io.emit('message', 'A USER HAS LEFT THE CHAT')
  //   })
  // })
}

module.exports = SocketServer
