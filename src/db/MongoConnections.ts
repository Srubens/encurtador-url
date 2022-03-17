import mongoose from 'mongoose'
import { config } from '../Config/Constants'


export class MongoConnection {
  public async connect():Promise<void>{
    try{
      await mongoose.connect(config.MONGO_CONNECTION)
      console.log('Conectado ao Banco')
    }catch(err:any){
      console.log(err.mesage)
    }
  }
}
