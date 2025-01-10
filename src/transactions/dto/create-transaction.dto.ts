import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

class Send {
  @IsString()
  source: string;

  @IsString()
  account: string;

  @IsNumber()
  amount: number;

  @IsString()
  asset: string;
}

export class CreateTransactionDto {
  @IsString()
  reference: string;

  @IsArray()
  send: [Send];

  metadata?: Object;

  @IsBoolean()
  credit?: boolean;

  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  expirationDate?: Date;
}
