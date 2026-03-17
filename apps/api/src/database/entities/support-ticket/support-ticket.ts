import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user';

@Entity()
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.supportTickets)
  user: User;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({ default: 'open' })
  status: string; // 'open', 'in_progress', 'closed'

  @Column({ nullable: true })
  adminNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
