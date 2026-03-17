import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cryptoCurrency: string; // e.g., BTC, ETH, USDT

  @Column()
  fiatCurrency: string; // e.g., NGN, USD

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  buyRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  sellRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
