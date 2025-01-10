import { IsNumber, IsString } from 'class-validator';

export class CreateStatementDto {
  @IsString()
  accountId: string;

  @IsString()
  transactionId: string;

  @IsNumber()
  input: number;

  @IsNumber()
  output: number;

  @IsString()
  asset: string;
}
