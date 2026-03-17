import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BankAccount } from '../bank-account/bank-account';
import { Kyc } from '../kyc/kyc';
import { CryptoOrder } from '../crypto-order/crypto-order';
import { GiftCardOrder } from '../gift-card-order/gift-card-order';
import { Transaction } from '../transaction/transaction';
import { SupportTicket } from '../support-ticket/support-ticket';
import { Notification } from '../notification/notification';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: 'user' })
  role: string; // 'user', 'admin'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.user)
  bankAccounts: BankAccount[];

  @OneToMany(() => Kyc, kyc => kyc.user)
  kycSubmissions: Kyc[];

  @OneToMany(() => CryptoOrder, cryptoOrder => cryptoOrder.user)
  cryptoOrders: CryptoOrder[];

  @OneToMany(() => GiftCardOrder, giftCardOrder => giftCardOrder.user)
  giftCardOrders: GiftCardOrder[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => SupportTicket, supportTicket => supportTicket.user)
  supportTickets: SupportTicket[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}
