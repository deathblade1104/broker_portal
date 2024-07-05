import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEdittableEntity } from '../../../database/postgres/abstract.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('users')
export class User extends AbstractEdittableEntity<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ nullable: false })
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
