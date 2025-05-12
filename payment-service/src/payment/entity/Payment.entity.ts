import { Column } from 'typeorm';

import { Entity } from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';
}
