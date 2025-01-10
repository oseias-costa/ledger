import { Injectable } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statement, StatementSchema } from 'src/schemas/statement.schema';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class StatementService {
  constructor(
    @InjectModel('Statement')
    private statementModel: Model<Statement>,
    private accountService: AccountService,
  ) {}

  async create(createStatementDto: CreateStatementDto) {
    const lastMoviment = await this.statementModel
      .findOne({ accountId: createStatementDto.accountId })
      .limit(1)
      .sort({ timestamp: -1 })
      .exec();

    await this.statementModel.create({
      accountId: createStatementDto.accountId,
      transaction: createStatementDto.transactionId,
      balance: !lastMoviment
        ? createStatementDto.input - createStatementDto.output
        : lastMoviment.balance +
          createStatementDto.input -
          createStatementDto.output,
      input: createStatementDto.input,
      output: createStatementDto.output,
      asset: createStatementDto.asset,
    });
  }

  async findAll(account: string) {
    const accountId = await this.accountService.findOne(account);

    return this.statementModel
      .find({
        accountId: account ? accountId._id : '',
      })
      .populate({ path: 'transaction', model: 'Transaction' });
  }

  findOne(id: number) {
    return `This action returns a #${id} statement`;
  }

  update(id: number, updateStatementDto: UpdateStatementDto) {
    return `This action updates a #${id} statement`;
  }

  remove(id: number) {
    return `This action removes a #${id} statement`;
  }
}
