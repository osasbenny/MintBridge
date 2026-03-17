import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from '../dto/create-rate.dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto/update-rate.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  @Roles('admin')
  create(@Body(ValidationPipe) createRateDto: CreateRateDto) {
    return this.ratesService.create(createRateDto);
  }

  @Get()
  findAll() {
    return this.ratesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratesService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body(ValidationPipe) updateRateDto: UpdateRateDto) {
    return this.ratesService.update(id, updateRateDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(id);
  }
}
