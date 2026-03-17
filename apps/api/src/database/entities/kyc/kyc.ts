import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user';

@Entity()
export class Kyc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.kycSubmissions)
  user: User;

  @Column()
  documentType: string;

  @Column()
  documentNumber: string;

  @Column()
  documentFrontUrl: string;

  @Column({ nullable: true })
  documentBackUrl: string;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @Column({ nullable: true })
  rejectionReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
