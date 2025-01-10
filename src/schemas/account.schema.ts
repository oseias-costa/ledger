import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id?: mongoose.Types.ObjectId;

  @Prop()
  account: string;

  @Prop({ required: false })
  balance?: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
