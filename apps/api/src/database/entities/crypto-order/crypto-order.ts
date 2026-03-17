import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user';
import { Transaction } from '../transaction/transaction';

@Entity()
export class CryptoOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.cryptoOrders)
  user: User;

  @Column()
  cryptoCurrency: string; // e.g., BTC, ETH, USDT

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  cryptoAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fiatAmount: number;

  @Column()
  walletAddress: string;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'processing', 'completed', 'rejected', 'disputed'

  @Column({ nullable: true })
  rejectionReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Transaction, transaction => transaction.cryptoOrder)
  @JoinColumn()
  transaction: Transaction;
}
