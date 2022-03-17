import express, {Request, Response} from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './db/MongoConnections'

const api = express()
api.use(express.json())

const dataBase = new MongoConnection()
dataBase.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)

api.get('/', (req:Request, res:Response)=>{
  res.send({'mesage':'ola mundo'})
})

api.get('/:hash', urlController.redirect)



api.listen(3000, ()=> console.log('Servidor rodando!'))
