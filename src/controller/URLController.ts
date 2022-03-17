import {Request, Response} from 'express'
import shortId from 'shortid'
import { config } from '../Config/Constants'
import { URLModel } from '../db/model/URL'

export class URLController {
  /**
  VERIFICAR SE A URL JA EXISTE
  CRIAR O HAST PARA A URL
  SALVAR A URL NO BANCO
  RETORNAR A URL QUE FOI SALVA
  */
  public async shorten(req:Request, res:Response):Promise<void>{
    const {originURL} = req.body
    const url = await URLModel.findOne({ originURL })
    if( url ){
      res.json(url)
      return
    }
    const hash = shortId.generate()
    const shortURL = `${config.API_URL}/${hash}`
    const newUrl = URLModel.create({ hash, shortURL, originURL })
    res.json({ originURL, hash, shortURL })

  }
  /**
  PEGAR A URL ORIGINAL
  ENCONTRAR A URL ORIGINAL PELO HASH
  REDIRECIONAR PARA A URL ORIGINAL A PARTIR DO QUE ENCONTRAMOS NO BANCO
  */
  public async redirect(req:Request, res:Response):Promise<void>{
    const { hash } = req.params
    const url = await URLModel.findOne({ hash })

    if(url){
      res.redirect(url.originURL)
      return
    }

    res.status(400).json({
      error:'URL não encontrada'
    })
    /*
    PARA TESTE
    const url = {
      originURL:"https://cloud.mongodb.com/v2/61e0519ede08fb498c9d6398#clusters",
      hash:"C9v2CaRV7",
      shortURL:"http://localhost:3000/C9v2CaRV7"
    }
    res.redirect(url.originURL)*/
  }
}
