import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from 'src/schemas/transaction.schema';
import mongoose, { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AccountService } from 'src/account/account.service';
import { StatementService } from 'src/statement/statement.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<Transaction>,
    private accountService: AccountService,
    private statementService: StatementService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const _id = new mongoose.Types.ObjectId();
    const postings = [];

    for (const send of createTransactionDto.send) {
      const account = await this.accountService.findOrCreate({
        account: send.account,
      });

      const source = await this.accountService.findOrCreate({
        account: send.source,
      });

      postings.push({
        accountId: account._id,
        sourceId: source._id,
        amount: send.amount,
        asset: send.asset,
      });

      postings.push({
        accountId: source._id,
        sourceId: account._id,
        amount: -send.amount,
        asset: send.asset,
      });

      await this.statementService.create({
        accountId: account._id.toString(),
        transactionId: _id.toString(),
        output: 0,
        input: send.amount,
        asset: send.asset,
      });

      await this.statementService.create({
        accountId: source._id.toString(),
        transactionId: _id.toString(),
        output: send.amount,
        input: 0,
        asset: send.asset,
      });
    }

    const createdTransaction = new this.transactionModel({
      ...createTransactionDto,
      postings,
      timestamp: new Date(),
      _id,
    });

    return createdTransaction.save();
  }

  async findAll(accountName: string) {
    const db = this.connection.db;
    const account = await this.accountService.findOne(accountName);

    return await this.transactionModel
      .find({
        'postings.accountId': account._id,
      })
      .populate({ path: 'postings.sourceId', model: 'Account' })
      .populate({ path: 'postings.accountId', model: 'Account' })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return this.transactionModel.deleteOne({ _id: id });
  }
}
