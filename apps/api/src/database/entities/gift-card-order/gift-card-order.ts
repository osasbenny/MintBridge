import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user';
import { Transaction } from '../transaction/transaction';

@Entity()
export class GiftCardOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.giftCardOrders)
  user: User;

  @Column()
  cardType: string; // e.g., Amazon, iTunes, Steam

  @Column()
  cardValue: string; // e.g., $50, $100

  @Column()
  cardCode: string;

  @Column()
  cardImageUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fiatAmount: number;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'processing', 'completed', 'rejected', 'disputed'

  @Column({ nullable: true })
  rejectionReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Transaction, transaction => transaction.giftCardOrder)
  @JoinColumn()
  transaction: Transaction;
}
