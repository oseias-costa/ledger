import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Account } from 'src/schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {}

  async findOrCreate(createAccountDto: CreateAccountDto): Promise<Account> {
    const _id = new mongoose.Types.ObjectId();

    if (createAccountDto.onlyCreate) {
      await new this.accountModel({ ...createAccountDto, _id }).save();
    }

    const account = await this.accountModel
      .findOne({ account: createAccountDto.account })
      .exec();

    if (account) {
      return account;
    }

    await new this.accountModel({
      ...createAccountDto,
      _id,
    }).save();

    const accountCreated = await this.accountModel
      .findOne({ account: createAccountDto.account })
      .exec();

    return accountCreated;
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(name: string): Promise<Account> {
    return this.accountModel.findOne({ account: name }).exec();
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  async remove(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.accountModel.deleteOne({ _id: objectId }).exec();
  }
}
