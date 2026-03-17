import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycDto } from '../dto/create-kyc.dto/create-kyc.dto';
import { UpdateKycDto } from '../dto/update-kyc.dto/update-kyc.dto';
import { JwtAuthGuard } from '../../auth/jwt.strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post()
  create(@Request() req, @Body(ValidationPipe) createKycDto: CreateKycDto) {
    return this.kycService.create(req.user.id, createKycDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.kycService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.kycService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateKycDto: UpdateKycDto,
  ) {
    return this.kycService.update(id, updateKycDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kycService.remove(id);
  }
}
