import { prop, Typegoose } from '@hasezoey/typegoose'

export class URL extends Typegoose{

  @prop({required:true})
  hash:string|any

  @prop({ required:true })
  originURL:string|any

  @prop({required:true})
  shortURL:string|any


}

export const URLModel = new URL().getModelForClass(URL)
