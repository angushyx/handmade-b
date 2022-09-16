require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// const path = require('path')
const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
const commentRouter = require('./routes/comment-router')
const replyRouter = require('./routes/reply-router')
const productRouter = require('./routes/product-router')
const courseRouter = require('./routes/course-router')
const storeRouter = require('./routes/store-router')
const userRouter = require('./routes/user-router')
const authRouter = require('./routes/auth-router')

const PORT = process.env.PORT || 8080

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json())

const expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)

app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, 'sessions'),
    }),
    secret: process.env.SESSION_SECRE,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/reply', replyRouter)
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

// server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
