import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin/admin';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InitialData {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async seed() {
    // Check if admin user already exists
    const existingAdmin = await this.adminRepository.findOne({ where: { email: 'admin@mintbridge.com' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('adminpassword', 10);
      const admin = this.adminRepository.create({
        email: 'admin@mintbridge.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
      });
      await this.adminRepository.save(admin);
      console.log('Admin user seeded successfully.');
    }
  }
}
