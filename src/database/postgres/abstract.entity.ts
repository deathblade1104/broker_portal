import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseEntity } from '../../common/interfaces/baseEntity.interface';

export class AbstractEntity<T> implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}

export class AbstractEdittableEntity<T> extends AbstractEntity<T> {
  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity: Partial<T>) {
    super(entity);
  }
}
