import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StatementDocument = HydratedDocument<Statement>;

@Schema()
export class Statement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  accountId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' })
  transaction: mongoose.Types.ObjectId;

  @Prop()
  input: number;

  @Prop()
  output: number;

  @Prop()
  balance: number;

  @Prop()
  asset: string;
}

export const StatementSchema = SchemaFactory.createForClass(Statement);
