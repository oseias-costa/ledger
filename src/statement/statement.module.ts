import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatementSchema } from 'src/schemas/statement.schema';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Statement', schema: StatementSchema }]),
    AccountModule,
  ],
  controllers: [StatementController],
  providers: [StatementService],
  exports: [StatementService],
})
export class StatementModule {}
