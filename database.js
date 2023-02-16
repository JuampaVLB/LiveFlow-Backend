import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const username = process.env.USERNAME_DB
const password = process.env.PASSWORD_DB
const name = process.env.NAME_DB

// const URI = "mongodb://0.0.0.0:27017/jwt"

const URI = `mongodb+srv://${username}:${password}@cluster0.ktoxf8e.mongodb.net/${name}?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)

mongoose
  .connect(URI)
  .then((db) => console.log('Database is Connected!'))
  .catch((err) => console.log(err))
