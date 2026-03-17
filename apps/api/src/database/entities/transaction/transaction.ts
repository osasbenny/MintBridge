import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user';
import { CryptoOrder } from '../crypto-order/crypto-order';
import { GiftCardOrder } from '../gift-card-order/gift-card-order';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @Column()
  type: string; // 'crypto_sell', 'gift_card_liquidation'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string; // e.g., NGN, USD

  @Column({ default: 'pending' })
  status: string; // 'pending', 'processing', 'completed', 'rejected', 'disputed'

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  payoutDetails: string; // JSON string of bank details

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => CryptoOrder, cryptoOrder => cryptoOrder.transaction)
  cryptoOrder: CryptoOrder;

  @OneToOne(() => GiftCardOrder, giftCardOrder => giftCardOrder.transaction)
  giftCardOrder: GiftCardOrder;
}
