import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//
// export type TransactionDocument = HydratedDocument<Transaction>;
//
// @Schema()
// class Postings {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
//   accountId: mongoose.Types.ObjectId;
//
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
//   sourceId: mongoose.Types.ObjectId;
//
//   @Prop()
//   amount: number;
//
//   @Prop()
//   asset: string;
// }
//
// export const PostingsSchema = SchemaFactory.createForClass(Postings);

@Schema()
export class Transaction {
  @Prop()
  reference: string;

  @Prop({
    type: [
      {
        accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
        sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
        amount: { type: Number },
        asset: { type: String },
      },
    ],
  })
  postings: {
    accountId: mongoose.Types.ObjectId;
    sourceId: mongoose.Types.ObjectId;
    amount: number;
    asset: string;
  }[];

  @Prop()
  timestamp: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  metadata?: Record<string, any>;

  @Prop({ default: false })
  credit: boolean;

  @Prop()
  expirationDate?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
