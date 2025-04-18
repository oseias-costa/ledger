import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatementService } from './statement.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';

@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Post()
  create(@Body() createStatementDto: CreateStatementDto) {
    return this.statementService.create(createStatementDto);
  }

  @Get(':account')
  findAll(@Param('account') account?: string) {
    return this.statementService.findAll(account);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatementDto: UpdateStatementDto,
  ) {
    return this.statementService.update(+id, updateStatementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statementService.remove(+id);
  }
}
