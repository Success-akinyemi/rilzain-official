import express from 'express'
import { config } from 'dotenv'
config()
import errorHandler from './middleware/error.js'
import router from './routes/auth.js'
import privateRouter from './routes/route.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/**HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request')
})

//Import DB
import './connection/connection.js'


app.use('/api', router)
app.use('/api', privateRouter)


//Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 9000

const server =  app.listen(PORT, () => console.log (`server runing on port http://localhost:${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`LOGGED ERROR>>: ${err}`);
    server.close(() => process.exit(1));
})