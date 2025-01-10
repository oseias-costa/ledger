import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  account: string;

  type?: 'USER' | 'VENDOR';

  onlyCreate?: boolean;
}
