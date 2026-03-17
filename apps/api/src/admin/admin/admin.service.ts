import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../database/entities/admin/admin';
import { CreateAdminDto } from '../dto/create-admin.dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = this.adminRepository.create({ ...createAdminDto, password: hashedPassword });
    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return admin;
  }

  async findByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }
    Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(admin);
  }

  async remove(id: string): Promise<void> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    await this.adminRepository.remove(admin);
  }
}
