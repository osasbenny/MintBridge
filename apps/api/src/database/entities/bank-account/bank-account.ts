import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  accountName: string;

  @ManyToOne(() => User, user => user.bankAccounts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
