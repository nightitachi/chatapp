import express from 'express'
import cors from 'cors'
import MongodbConnect from './DB/MongodbConnect.js'
import auth from './routes/auth.js'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth' , auth)


app.listen(3001 , ()=>{
  MongodbConnect();
  console.log('server connected to port 3001');
})